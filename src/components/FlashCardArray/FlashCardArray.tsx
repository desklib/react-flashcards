import React, { useCallback, useEffect, useState,  } from 'react';
import FlashcardArrayProps from './FlashCardArrayProps';
import FlashCard from '../FlashCard/FlashCard';
import './FLashCardArray.css';


function FlashCardArray({
    cards,
    label,
    controls = true,
    showCount = true,
    onCardChange = () => {},
    onCardFlip = () => {},
    frontStyle = {},
    frontContentStyle = {},
    backStyle = {},
    backContentStyle = {},
    forwardRef,
    FlashcardArrayStyle = {},
    currentCardFlipRef,
    width = '100%',
    cycle = false,
    showTimer = true,
    timerDuration = 10,
    isMarkdown=false
}: FlashcardArrayProps) {
    const [cardNumber, setCardNumber] = useState(0);
    const [cardsInView, setCardsInView] = useState(!cycle ? [-1, 0, 1] : [cards.length - 1, 0, 1]);
    const [isOverFlow, setIsOverFlow] = useState('');
    const [isAutoplay, setIsAutoplay] = useState(false);
    const [flippedStates, setFlippedStates] = useState(cards.map(() => false));
    const [shuffledOrder, setShuffledOrder] = useState<number[]>([...Array(cards.length).keys()]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const placeholderCard = <FlashCard  label={''} currentIndex={0} className="emptyFlashcardContainer" width="100%" back="" front="" flipped={false} />;

    const shuffleCards = useCallback(() => {
        const shuffled = [...Array(cards.length).keys()].sort(() => Math.random() - 0.5);
        setCurrentIndex(0);
        setShuffledOrder(shuffled);
        setCardNumber(0);
        setFlippedStates(shuffled.map(() => false));
        setCardsInView(!cycle ? [-1, 0, 1] : [shuffled[shuffled.length - 1], shuffled[0], shuffled[1]]);
        onCardChange(cards[shuffled[0]].id, 1);
    }, [cards, cycle, onCardChange]);

    const cardsList = cards.map((card, index) => (
        <FlashCard
            key={index}
            label={card.label !== undefined ? card.label : label}
            front={card.front}
            back={card.back}
            manualFlipRef={cardNumber === index ? currentCardFlipRef : { current: null }}
            frontStyle={{ ...card.frontStyle, ...frontStyle }}
            frontContentStyle={{ ...card.frontContentStyle, ...frontContentStyle }}
            backStyle={{ ...card.backStyle, ...backStyle }}
            backContentStyle={{ ...card.backContentStyle, ...backContentStyle }}
            className={card.className}
            showTimer={card.showTimer !== undefined ? card.showTimer : showTimer}
            isMarkdown={isMarkdown ? isMarkdown : card.isMarkdown}
            currentIndex={currentIndex}
            timerDuration={card.timerDuration || timerDuration}

            showBookMark={card.showBookMark}
         
            showTextToSpeech={card.showTextToSpeech}
            height={card.height || '100%'}
            width={card.width || '100%'}
            style={card.style}
            onCardFlip={(state) => {
                const newFlippedStates = [...flippedStates];
                newFlippedStates[index] = state;
                setFlippedStates(newFlippedStates);
                onCardFlip(card.id, index, state);
                setIsOverFlow('hidden');
                setTimeout(() => {
                    setIsOverFlow('');
                }, 3);
            }}
            flipped={flippedStates[index]}
        />
    ));

    const resetArray = () => {
        setCardsInView(!cycle ? [-1, 0, 1] : [cards.length - 1, 0, 1]);
        setCardNumber(0);
        setFlippedStates(cards.map(() => false));
    };

    const nextCard = useCallback(() => {
        setCardNumber((prevCardNumber) => {
            const currentIndex = shuffledOrder.indexOf(prevCardNumber);
            const nextIndex = (currentIndex + 1) % shuffledOrder.length;
            const currentCardNumber = shuffledOrder[nextIndex];
            setCurrentIndex(currentCardNumber);
            const newFlippedStates = [...flippedStates];
            newFlippedStates[prevCardNumber] = false;
            setFlippedStates(newFlippedStates);

            if (currentIndex < cards.length) {
                setIsOverFlow('hidden');
                setTimeout(() => {
                    setIsOverFlow('');
                }, 90);
            }

            if (cycle) {
                setCardsInView([shuffledOrder[(nextIndex - 1 + shuffledOrder.length) % shuffledOrder.length], shuffledOrder[nextIndex], shuffledOrder[(nextIndex + 1) % shuffledOrder.length]]);
            } else {
                setCardsInView([
                    shuffledOrder[(nextIndex - 1 + shuffledOrder.length) % shuffledOrder.length],
                    shuffledOrder[nextIndex],
                    shuffledOrder[(nextIndex + 1) % shuffledOrder.length] !== undefined ? shuffledOrder[(nextIndex + 1) % shuffledOrder.length] : -1
                ]);
            }

            onCardChange(cards[currentCardNumber].id, nextIndex + 1);
            console.log(cards[currentCardNumber].id, nextIndex + 1, 'current', currentCardNumber);
            return currentCardNumber;
        });
    }, [shuffledOrder, cycle, cards, onCardChange, flippedStates]);

    const prevCard = useCallback(() => {
        setCardNumber((prevCardNumber) => {
            const currentIndex = shuffledOrder.indexOf(prevCardNumber);
            const prevIndex = (currentIndex - 1 + shuffledOrder.length) % shuffledOrder.length;
            const currentCardNumber = shuffledOrder[prevIndex];
            setCurrentIndex(currentCardNumber);
            const newFlippedStates = [...flippedStates];
            newFlippedStates[prevCardNumber] = false;
            setFlippedStates(newFlippedStates);

            if (currentIndex !== 0) {
                setIsOverFlow('hidden');
                setTimeout(() => {
                    setIsOverFlow('');
                }, 90);
            }

            if (cycle) {
                setCardsInView([shuffledOrder[(prevIndex - 1 + shuffledOrder.length) % shuffledOrder.length], shuffledOrder[prevIndex], shuffledOrder[(prevIndex + 1) % shuffledOrder.length]]);
            } else {
                setCardsInView([
                    shuffledOrder[(prevIndex - 1 + shuffledOrder.length) % shuffledOrder.length],
                    shuffledOrder[prevIndex],
                    shuffledOrder[(prevIndex + 1) % shuffledOrder.length] !== undefined ? shuffledOrder[(prevIndex + 1) % shuffledOrder.length] : -1
                ]);
            }

            onCardChange(cards[currentCardNumber].id, prevIndex + 1);
            return currentCardNumber;
        });
    }, [shuffledOrder, cycle, cards, onCardChange, flippedStates]);

    useEffect(() => {
        if (forwardRef && forwardRef.current) {
            forwardRef.current.nextCard = nextCard;
            forwardRef.current.prevCard = prevCard;
            forwardRef.current.resetArray = resetArray;
        }
    }, [forwardRef, nextCard, prevCard]);

    useEffect(() => {
        let autoplayTimer: NodeJS.Timeout;

        if (isAutoplay) {
            autoplayTimer = setTimeout(() => {
                nextCard();
            }, timerDuration * 1500);
        }

        return () => {
            clearTimeout(autoplayTimer);
        };
    }, [isAutoplay, timerDuration, cardNumber, nextCard]);

    return (
        <div className="FlashcardArrayContainer" style={{ ...FlashcardArrayStyle, width }}>
            <div className="FlashcardArrayContainer__CardFrame" style={{ overflow: isOverFlow }}>
                {cardsInView[0] !== -1 ? cardsList[cardsInView[0]] : placeholderCard}
                {cardsList[cardsInView[1]]}
                {cardsInView[2] !== -1 ? cardsList[cardsInView[2]] : placeholderCard}
            </div>

            {(controls || showCount) && (
                <div className="FlashcardArrayContainerControl">
                    {controls && (
                        <button onClick={() => shuffleCards()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                                <path
                                    fill-rule="evenodd"
                                    d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
                                />
                                <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
                            </svg>
                        </button>
                    )}

                    {controls && (
                        <>
                            <button onClick={() => prevCard()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ height: '24px', width: '24px' }}>
                                    <path
                                        d="M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z"
                                        style={{ fill: '#1c1b1e', height: '30px', width: '30px' }}
                                        data-name="Left"
                                    />
                                </svg>
                            </button>
                            {showCount && (
                                <span className="FlashcardArrayContainerControl_Counts">
                                    {cardNumber + 1}/{cardsList.length}
                                </span>
                            )}
                            <button onClick={() => nextCard()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ height: '24px', width: '24px' }}>
                                    <path
                                        d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z"
                                        style={{ fill: '#1c1b1e', height: '30px', width: '30px' }}
                                        data-name="Right"
                                    />
                                </svg>
                            </button>
                        </>
                    )}

                    {controls && (
                        <button onClick={() => setIsAutoplay(!isAutoplay)}>
                            {isAutoplay ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
                                    <path d="M6 6h12v12h-12z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
                                    <path d="M6 4l15 8-15 8z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default FlashCardArray;
