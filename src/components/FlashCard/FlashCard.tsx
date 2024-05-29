import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FlashcardProps from './FlashcardProps';
import './Flashcard.css';

import BookmarkIcon from '../icons/BookmarkIcon';
import LightBulbIcon from '../icons/LightBulbIcon';
import SpeakerWaveIcon from '../icons/SpeakerWaveIcon';

function FlashCard({
    front,
    back,
    className = '',
    frontStyle,
    backStyle,
    backContentStyle,
    frontContentStyle,
    timerStyles,

    height,
    borderRadius = '1rem',
    width,
    styleOptions,
    label = (
        <div className="labelContainer">
            <div >
                <p style={{ margin: 0 }}>Level:Easy</p>
            </div>
            <div >
                <button className="rightLabelButton">{<LightBulbIcon width={20} height={20} />}Hint</button>
            </div>
            
        </div>
    ),
    style,
    bookmarkIcon,

    textToSpeechIcon,
    onClickRightLabel,
    onClickBookmark,
    onClickTextToSpeech,
    showTimer = true,
    timerDuration = 10,

    currentIndex,

    flipped = false,
    showBookMark = true,

    showTextToSpeech = true,
    onCardFlip = (state = false) => {},
    manualFlipRef = { current: null },
    isMarkdown = false
}: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timerDuration);

    const [showHint, setShowHint] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey((prevKey) => prevKey + 1);
    }, [currentIndex]);

    useEffect(() => {
        // Reset the timer and flip state whenever the card index changes
        
        setTimeLeft(timerDuration);
        setIsFlipped(false); // Reset flip state to initial state
        setAnimationKey((prevKey) => prevKey + 1);
    }, [currentIndex, timerDuration]);

    useEffect(() => {
        // Timer countdown logic
        if (showTimer) {
            if (timeLeft > 0) {
                const timerId = setTimeout(() => {
                    setTimeLeft(timeLeft - 1);
                }, 1000);
                return () => clearTimeout(timerId);
            } else {
                setIsFlipped(true); // Flip the card when timeLeft reaches 0
            }
        }
    }, [timeLeft, showTimer]);

    function markdownToHtml(markdown: string): string {
        // Convert headers
        markdown = markdown.replace(/^#\s(.+)$/gm, '<h1>$1</h1>');
        markdown = markdown.replace(/^##\s(.+)$/gm, '<h2>$1</h2>');
        markdown = markdown.replace(/^###\s(.+)$/gm, '<h3>$1</h3>');
        markdown = markdown.replace(/^####\s(.+)$/gm, '<h4>$1</h4>');
        markdown = markdown.replace(/^#####\s(.+)$/gm, '<h5>$1</h5>');
        markdown = markdown.replace(/^######\s(.+)$/gm, '<h6>$1</h6>');

        // Convert bold and italic text
        markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Convert inline code
        markdown = markdown.replace(/`(.+?)`/g, '<code>$1</code>');

        // Convert blockquotes
        markdown = markdown.replace(/^>\s(.+)$/gm, '<blockquote>$1</blockquote>');

        // Convert horizontal rules
        markdown = markdown.replace(/^---$/gm, '<hr>');

        // Convert paragraphs
        markdown = markdown.replace(/^(.+)$/gm, '<p>$1</p>');

        // Convert unordered lists
        markdown = markdown.replace(/^\*\s(.+)$/gm, '<ul><li>$1</li></ul>');
        markdown = markdown.replace(/<\/ul>\n<ul>/g, '');

        // Convert ordered lists
        markdown = markdown.replace(/^\d+\.\s(.+)$/gm, '<ol><li>$1</li></ol>');
        markdown = markdown.replace(/<\/ol>\n<ol>/g, '');

        // Convert links
        markdown = markdown.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

        // Convert images
        markdown = markdown.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');

        return markdown;
    }

    const onManualFlip = () => {
        // Allow manual flip only if timer is not running or has reached zero
        if (!showTimer || timeLeft === 0) {
            setIsFlipped((prevIsFlipped) => !prevIsFlipped); // Update state based on previous value
            onCardFlip(!isFlipped);
        }
    };

    const handleShowHint = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setShowHint(!showHint);
        if (onClickRightLabel) onClickRightLabel();
    };

    const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        if (onClickBookmark) onClickBookmark();
    };

    const handleAudioClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        const textToRead = isFlipped ? extractText(back) : extractText(front);
        speakText(textToRead);
        if (onClickTextToSpeech) onClickTextToSpeech();
    };

    const extractText = (content: string | JSX.Element): string => {
        if (typeof content === 'string') {
            return content;
        }
        const tempDiv = document.createElement('div');
        ReactDOM.render(content, tempDiv);
        return tempDiv.textContent || '';
    };

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';
            speech.rate = 1.0;
            speech.pitch = 1.0;
            speech.volume = 1.0;

            let voices = synth.getVoices();
            if (voices.length === 0) {
                synth.onvoiceschanged = () => {
                    voices = synth.getVoices();
                    speak(text, voices);
                };
            } else {
                speak(text, voices);
            }
        } else {
            console.error('Speech synthesis not supported');
        }
    };

    const speak = (text: string, voices: SpeechSynthesisVoice[]) => {
        const synth = window.speechSynthesis;
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-GB';
        speech.rate = 1.0;
        speech.pitch = 1.0;
        speech.volume = 1.0;

        const preferredVoice = voices.find((voice) => {
            return voice.lang === 'en-IN' && voice.name.includes('Google');
        });

        if (preferredVoice) {
            speech.voice = preferredVoice;
        } else {
            speech.voice = voices.find((voice) => voice.lang === 'en-GB') || voices[0];
        }

        synth.speak(speech);
    };

    if (manualFlipRef.current !== null) {
        manualFlipRef.current = onManualFlip;
    }

    return (
        <div
            className={`FlashcardWrapper ${className}`}
            style={{
                height: height,
                width: width,
                ...style
            }}
        >
            <div
                className={`FlashcardWrapper__item ${isFlipped ? 'FlashcardWrapper__item--flip' : ''}`}
                style={{
                    borderRadius: borderRadius
                }}
                onClick={() => {
                    if (showTimer && timeLeft > 0) return; // Prevent flip if timer is running
                    if (manualFlipRef.current) return;
                    setIsFlipped(!isFlipped);
                    onCardFlip(!isFlipped);
                }}
            >
                <div
                    className="FlashcardWrapper__item--front"
                    style={{
                        ...frontStyle,
                        cursor: manualFlipRef.current ? 'default' : 'pointer'
                    }}
                >
                    {typeof front !== 'string' ? (
                        <div className="FlashcardWrapper__item--content" style={frontContentStyle}>
                            {front}
                        </div>
                    ) : (
                        <div className="FlashcardWrapper__item--content" style={frontContentStyle}>
                            {isMarkdown ? <div dangerouslySetInnerHTML={{ __html: markdownToHtml(front) }} /> : front}
                        </div>
                    )}

                    {label}

                    <div className="audio" onClick={handleAudioClick}>
                        {showBookMark && (
                            <button onClick={handleBookmarkClick} style={{ outline: 'none', border: 'none', background: 'none', cursor: 'pointer' }}>
                                {bookmarkIcon || <BookmarkIcon width={15} height={15} />}
                            </button>
                        )}
                        {showTextToSpeech && (textToSpeechIcon || <SpeakerWaveIcon width={20} height={20} />)}
                    </div>
                    {showTimer && (
                        <div className="timerStyles">
                            <div key={animationKey} className="timer-line" style={{ animationDuration: `${timerDuration}s` }} />
                        </div>
                    )}
                </div>
                <div
                    className="FlashcardWrapper__item--back"
                    style={{
                        ...backStyle,
                        cursor: manualFlipRef.current ? 'default' : 'pointer'
                    }}
                >
                    {typeof back !== 'string' ? (
                        <div className="FlashcardWrapper__item--content" style={frontContentStyle}>
                            {back}
                        </div>
                    ) : (
                        <div className="FlashcardWrapper__item--content" style={backContentStyle}>
                            {isMarkdown ? <div dangerouslySetInnerHTML={{ __html: markdownToHtml(back) }} /> : back}
                        </div>
                    )}

                    <div className="audio" onClick={handleAudioClick}>
                        <button onClick={handleBookmarkClick} style={{ outline: 'none', border: 'none', background: 'none', cursor: 'pointer' }}>
                            {bookmarkIcon || <BookmarkIcon width={15} height={15} />}
                        </button>
                        {textToSpeechIcon || <SpeakerWaveIcon width={20} height={20} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlashCard;
