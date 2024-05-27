import React from 'react';

export interface StyleOptions {
    containerStyle?: React.CSSProperties;
    frontStyle?: React.CSSProperties;
    backStyle?: React.CSSProperties;
    frontContentStyle?: React.CSSProperties;
    backContentStyle?: React.CSSProperties;
    timerStyles?: React.CSSProperties;
}
interface FlashcardProps {
    showTimer?: boolean;
    timerDuration?: number;
    leftLabel?: string; // New: Left label text
    rightLabel?: string; // New: Right label text
    rightLabelValue?: string; // New: Value for right label
    showBookMark?: boolean;
    showLeftLabel?: boolean;
    showRightLabel?: boolean;
    showTextToSpeech?: boolean;
    frontStyle?: React.CSSProperties;
    backStyle?: React.CSSProperties;
    frontContentStyle?: React.CSSProperties;
    backContentStyle?: React.CSSProperties;
    timerStyles?: React.CSSProperties;
    frontHtml: string | JSX.Element;
    backHtml: string | JSX.Element;
    styleOptions?: any;
    bookmarkIcon?: React.ReactNode;
    rightLabelIcon?: React.ReactNode;
    textToSpeechIcon?: React.ReactNode;
    onCardFlip?: (state: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    isMarkdown?: Boolean;
    flipped: boolean;
    currentIndex:number
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
    onClickRightLabel?: () => void;
    onClickBookmark?: () => void;
    onClickTextToSpeech?: () => void;

    manualFlipRef?: React.MutableRefObject<() => void> | { current: null } | undefined; // Make sure manualFlipRef is optiona
}


export default FlashcardProps;
