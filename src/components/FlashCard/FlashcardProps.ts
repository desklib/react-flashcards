import React from 'react';

export interface StyleOptions {
    containerStyle?: React.CSSProperties;
    
}
interface FlashcardProps {

    timerDuration?: number;
    label: string | JSX.Element;

    showBookMark?: boolean;

    showTextToSpeech?: boolean;
    frontStyle?: React.CSSProperties;
    backStyle?: React.CSSProperties;
    frontContentStyle?: React.CSSProperties;
    backContentStyle?: React.CSSProperties;
  
    front: string | JSX.Element;
    back: string | JSX.Element;
    styleOptions?: any;
    bookmarkIcon?: React.ReactNode;

    textToSpeechIcon?: React.ReactNode;
    onCardFlip?: (state: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    isMarkdown?: Boolean;
    flipped: boolean;
    currentIndex: number;
    /**
     * CSS height of the wrapper div
     */
    height?: string;
    /**
     * CSS border-radius of the wrapper div
     */
    borderRadius?: string;
    /**
     * CSS width of the wrapper div
     */
    width?: string;

    onClickBookmark?: () => void;
    onClickTextToSpeech?: () => void;

    manualFlipRef?: React.MutableRefObject<() => void> | { current: null } | undefined; // Make sure manualFlipRef is optiona
}

export default FlashcardProps;
