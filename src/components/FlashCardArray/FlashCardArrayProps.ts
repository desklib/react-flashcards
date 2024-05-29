export default interface FlashcardArrayProps {
    cards: Array<{
        id: number;
        showTimer: boolean;
        timerDuration: number;
        front: string | JSX.Element;
        flipped: boolean;
        back: string | JSX.Element;
        isMarkdown?: boolean;
        frontStyle?: React.CSSProperties;
        label: string | JSX.Element;
        frontContentStyle?: React.CSSProperties;
        currentIndex: number;
        backStyle?: React.CSSProperties;
   
        backContentStyle?: React.CSSProperties;

        className?: string;

        height?: string;

        borderRadius?: string;

        style?: React.CSSProperties;
        width?: string;

        showBookMark?: boolean;

        showTextToSpeech?: boolean;
    }>;

    controls?: boolean;
    isMarkdown?: boolean;
    forwardRef?: React.MutableRefObject<{
        nextCard: () => void;
        prevCard: () => void;
        resetArray: () => void;
    }> | null;
    showCount?: boolean;
    label: string | JSX.Element;
    frontStyle?: React.CSSProperties;

    frontContentStyle?: React.CSSProperties;

    backStyle?: React.CSSProperties;

    backContentStyle?: React.CSSProperties;
    showTimer: boolean;
    FlashcardArrayStyle?: React.CSSProperties;

    onCardChange?: (id: number, index: number) => void;
    onCardFlip?: (id: any, index: number, state: boolean) => void;

    timerDuration: number;
    currentCardFlipRef?: React.MutableRefObject<() => void>;
    width?: string;
    cycle?: boolean;
}
