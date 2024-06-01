import React, { useCallback, useEffect, useState } from 'react';
import FlashcardArrayProps from './FlashCardArrayProps';
import FlashCard from '../FlashCard/FlashCard';
import './FlashCardArray.css';


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
    styleOptions = {},
    timerDuration = 10,
    autoPlay = false,
    isMarkdown = false,
    flipped = false
}: FlashcardArrayProps) {
    const { FlashcardArrayContainerControl = {}, progressBarContainerStyle = {}, progressFillStyle = {} } = styleOptions;
    const [cardNumber, setCardNumber] = useState(0);
    const [cardsInView, setCardsInView] = useState(!cycle ? [-1, 0, 1] : [cards.length - 1, 0, 1]);
    const [isOverFlow, setIsOverFlow] = useState('');
    const [isAutoplay, setIsAutoplay] = useState(autoPlay);
    const [flippedStates, setFlippedStates] = useState(cards.map(() => false));
    const [shuffledOrder, setShuffledOrder] = useState<number[]>([...Array(cards.length).keys()]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false); // New state to track shuffle status

    const placeholderCard = <FlashCard label={''} currentIndex={0} className="emptyFlashcardContainer" width="100%" back="" front="" flipped={false} />;

    const cardsList = cards.map((card, index) => (
        <FlashCard
            key={index}
            label={card.label !== undefined ? card.label : label}
            front={card.front}
            back={card.back}
            flipped={isAutoplay ? true : false}
            manualFlipRef={cardNumber === index ? currentCardFlipRef : { current: null }}
            frontStyle={{ ...card.frontStyle, ...frontStyle }}
            frontContentStyle={{ ...card.frontContentStyle, ...frontContentStyle }}
            backStyle={{ ...card.backStyle, ...backStyle }}
            backContentStyle={{ ...card.backContentStyle, ...backContentStyle }}
            className={card.className}
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
        />
    ));

  const resetArray = () => {
      const originalOrder = [...Array(cards.length).keys()];
      setShuffledOrder(originalOrder);
      setCardsInView(!cycle ? [-1, 0, 1] : [cards.length - 1, 0, 1]);
      setCardNumber(0);
      setCurrentIndex(0);
      setFlippedStates(cards.map(() => false));
      setIsShuffled(false); // Reset shuffle state
      onCardChange(cards[0].id, 1);
  };
    const nextCard = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % cards.length;
            const currentCardNumber = shuffledOrder[nextIndex];
            setCardNumber(currentCardNumber);

            const newFlippedStates = [...flippedStates];
            newFlippedStates[cardNumber] = false;
            newFlippedStates[currentCardNumber] = true;
            setFlippedStates(newFlippedStates);

            const prevCardIndex = (nextIndex - 1 + cards.length) % cards.length;
            const nextCardIndex = (nextIndex + 1) % cards.length;

            setCardsInView([shuffledOrder[prevCardIndex], shuffledOrder[nextIndex], shuffledOrder[nextCardIndex]]);

            onCardChange(cards[currentCardNumber].id, nextIndex + 1);
            return nextIndex;
        });
    }, [cards, shuffledOrder, flippedStates, cardNumber, onCardChange]);

    const prevCard = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            const prevIndexUpdated = (prevIndex - 1 + cards.length) % cards.length;
            const currentCardNumber = shuffledOrder[prevIndexUpdated];
            setCardNumber(currentCardNumber);

            const newFlippedStates = [...flippedStates];
            newFlippedStates[cardNumber] = false;
            newFlippedStates[currentCardNumber] = true;
            setFlippedStates(newFlippedStates);

            const prevPrevCardIndex = (prevIndexUpdated - 1 + cards.length) % cards.length;
            const nextCardIndex = (prevIndexUpdated + 1) % cards.length;

            setCardsInView([shuffledOrder[prevPrevCardIndex], shuffledOrder[prevIndexUpdated], shuffledOrder[nextCardIndex]]);

            onCardChange(cards[currentCardNumber].id, prevIndexUpdated + 1);
            return prevIndexUpdated;
        });
    }, [cards, shuffledOrder, flippedStates, cardNumber, onCardChange]);

 


    useEffect(() => {
        let autoplayTimer;

        if (isAutoplay) {
            const totalDuration = timerDuration;
            autoplayTimer = setTimeout(() => {
                nextCard();
            }, totalDuration * 1000);
        }

        return () => {
            clearTimeout(autoplayTimer);
        };
    }, [isAutoplay, timerDuration, nextCard]);

    useEffect(() => {
        setAnimationKey((prevKey) => prevKey + 1);
    }, [currentIndex]);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffleCards = useCallback(() => {
        setIsShuffled(true); // Set shuffle state
        const newShuffledOrder = shuffle([...Array(cards.length).keys()]);
        setShuffledOrder(newShuffledOrder);

        setCardNumber(newShuffledOrder[0]);
        setCurrentIndex(0);
        setCardsInView([newShuffledOrder[cards.length - 1], newShuffledOrder[0], newShuffledOrder[1]]);
        setFlippedStates(cards.map(() => false));
        onCardChange(cards[newShuffledOrder[0]].id, 1);
    }, [cards, onCardChange]);

       useEffect(() => {
           if (forwardRef && forwardRef.current) {
               forwardRef.current.nextCard = nextCard;
               forwardRef.current.prevCard = prevCard;
               forwardRef.current.resetArray = resetArray;
           }
       }, [forwardRef, nextCard, prevCard, shuffleCards]);

    return (
        <div className="FlashcardArrayContainer" style={{ ...FlashcardArrayStyle, width }}>
            <div className="FlashcardArrayContainer__CardFrame" style={{ overflow: isOverFlow }}>
                {cardsInView[0] !== -1 ? cardsList[cardsInView[0]] : placeholderCard}
                {cardsList[cardsInView[1]]}
                {cardsInView[2] !== -1 ? cardsList[cardsInView[2]] : placeholderCard}
            </div>

            {isAutoplay && (
                <div className="progressBarContainerStyle" style={progressBarContainerStyle}>
                    <div key={animationKey} className="progressFillStyle" style={{ animationDuration: `${timerDuration}s`, ...progressFillStyle }} />
                </div>
            )}


            {(controls || showCount) && (
                <div className="FlashcardArrayContainerControl" style={FlashcardArrayContainerControl}>
                    <div className="controlsContainer">
                        {controls && (
                            <>
                            
                                <button
                                    onClick={() => {

                                        isShuffled ? resetArray() : 
                                      shuffleCards();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isShuffled ? 'green' : 'black'} className="bi bi-shuffle" viewBox="0 0 16 16">
                                        <path
                                            fillRule="evenodd"
                                            d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
                                        />
                                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
                                    </svg>
                                </button>
                            </>
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
                                        {currentIndex + 1}/{cardsList.length}
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
                </div>
            )}
        </div>
    );
}

export default FlashCardArray;
