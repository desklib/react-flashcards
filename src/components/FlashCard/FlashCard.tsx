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

    height,
    borderRadius = '1rem',
    width,
    styleOptions,
    label = (
        <div className="labelContainer">
            <div>
                <p style={{ margin: 0 }}>Level: Easy</p>
            </div>
            <div>
                <button className="rightLabelButton">{<LightBulbIcon width={20} height={20} />}Hint</button>
            </div>
        </div>
    ),
    style,
    bookmarkIcon,
    textToSpeechIcon,

    onClickBookmark,
    onClickTextToSpeech,

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
    const [timeLeft, setTimeLeft] = useState(timerDuration / 2);
    const [showHint, setShowHint] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const [hasFlipped, setHasFlipped] = useState(false);
    // console.log(flipped, 'flipped value');
    //  useEffect(() => {
    //      const totalDuration = timerDuration;
    //      const halfDuration = totalDuration / 2;
    //      const frontDuration =  halfDuration;
    //      const backDuration =halfDuration;

    //      // Reset the timer and flip state whenever the card index or timerDuration changes
    //      setTimeLeft(frontDuration);
    //      setIsFlipped(false); // Reset flip state to initial state
    //      setHasFlipped(false);
    //      setAnimationKey((prevKey) => prevKey + 1);

    //      const frontTimeout = setTimeout(() => {
    //          setIsFlipped(true);
    //          setTimeLeft(backDuration);
    //          setHasFlipped(true);
    //          setAnimationKey((prevKey) => prevKey + 1);
    //      }, frontDuration * 1000);

    //      const backTimeout = setTimeout(() => {}, totalDuration * 1000);

    //      return () => {
    //          clearTimeout(frontTimeout);
    //          clearTimeout(backTimeout);
    //      };
    //  }, [currentIndex, timerDuration]);

    useEffect(() => {
        if (flipped) {
            const totalDuration = timerDuration;
            const halfDuration = totalDuration / 2;
            const frontDuration = halfDuration;
            const backDuration = halfDuration;

            // Reset the timer and flip state whenever the card index or timerDuration changes
            setTimeLeft(frontDuration);
            setIsFlipped(false); // Reset flip state to initial state

            // setAnimationKey((prevKey) => prevKey + 1);
            const frontTimeout = setTimeout(() => {
                setIsFlipped(true);

                setTimeLeft(backDuration);
                setHasFlipped(true);
                flipped = true;
            }, frontDuration * 1000);

            const backTimeout = setTimeout(() => {}, totalDuration * 1000);

            return () => {
                clearTimeout(frontTimeout);
                clearTimeout(backTimeout);
            };
        } else {
            console.log('not flipped');
        }
    }, [currentIndex, timerDuration, flipped]);

    // useEffect(() => {
    //     // Timer countdown logic
    //     if (showTimer) {
    //         if (timeLeft > 0) {
    //             const timerId = setTimeout(() => {
    //                 setTimeLeft(timeLeft - 1);
    //             }, 1000);
    //             return () => clearTimeout(timerId);
    //         }
    //     }
    // }, [timeLeft, ]);

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
    
            setIsFlipped((prevIsFlipped) => !prevIsFlipped); // Update state based on previous value
            onCardFlip(!isFlipped);
    
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
                    // if (showTimer && timeLeft > 0) return; // Prevent flip if timer is running
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
                </div>
                <div
                    className="FlashcardWrapper__item--back"
                    style={{
                        ...backStyle,
                        cursor: manualFlipRef.current ? 'default' : 'pointer'
                    }}
                >
                    {typeof back !== 'string' ? (
                        <div className="FlashcardWrapper__item--content" style={backContentStyle}>
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
