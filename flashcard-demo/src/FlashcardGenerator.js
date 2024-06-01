import React, { useState, useEffect } from 'react';
import { FlashCardArray, FlashCard } from 'react-flashcards';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FlashcardGenerator = () => {
    const initialProps = {
        frontStyle: '',
        frontContentStyle: '',
        backStyle: '',
        backContentStyle: '',
        className: '',
        height: '',
        width: '',
        autoPlay: false,
        style: '',
        controls: true,
        showCount: true,
        timerDuration: 10,
        label: ''
    };

    const [formProps, setFormProps] = useState(initialProps);
    const [flashCardWidth, setFlashCardWidth] = useState('600px');

    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth < 580 ? '300px' : '600px';
            setFlashCardWidth(width);
        };

        updateWidth(); // Set initial width
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const flashcards = [
        {
            id: 1,
            front: 'What is the powerhouse of the cell?',
            back: 'Mitochondria'
        },
        {
            id: 2,
            front: 'What is the process by which plants make their own food?',
            back: 'Photosynthesis'
        },
        {
            id: 3,
            front: 'What method in JavaScript is used to stop further propagation of an event during its execution?',
            back: 'event.stopPropagation()'
        },
        {
            id: 4,
            front: 'What does the acronym DOM stand for in web development?',
            back: 'Document Object Model'
        },
        {
            id: 5,
            front: 'Who developed the theory of evolution by natural selection?',
            back: 'Charles Darwin'
        },
        {
            id: 6,
            front: 'What is the term for a word that is similar in meaning to another word?',
            back: 'Synonym'
        },
        {
            id: 7,
            front: 'Which part of speech describes a noun or pronoun?',
            back: 'Adjective'
        }
    ];

    const flashCardArraywithAutoplay = `
  import { FlashCardArray} from "react-flashcards";
  
  const flashcards = [
    { id: 1, front: "What is the powerhouse of the cell?", back: "Mitochondria" },
    { id: 2, front: "What is the process by which plants make their own food?", back: "Photosynthesis" },
    { id: 3, front: "What method in JavaScript is used to stop further propagation of an event during its execution?", back: "event.stopPropagation()" },
    { id: 4, front: "What does the acronym DOM stand for in web development?", back: "Document Object Model" },
    { id: 5, front: "Who developed the theory of evolution by natural selection?", back: "Charles Darwin" },
    { id: 6, front: "What is the term for a word that is similar in meaning to another word?", back: "Synonym" },

    { id: 7, front: "Which part of speech describes a noun or pronoun?", back: "Adjective" },
  ]

  <FlashCardArray cards={flashcards} autoPlay={true} width="600px" label={   <div className="labelContainer">
            <div>
                <p style={{ margin: 0 }}>Level: Easy</p>
            </div>
            <div>
            <p style={{ margin: 0 }}>Sub:Bio</p>
            </div>
        </div>}
        // Other props.. />
`;

    const flashCardArraySnippet = `
  import { FlashCardArray} from "react-flashcards";

  const flashcards = [
    { id: 1, front: "What is the powerhouse of the cell?", back: "Mitochondria" },
    { id: 2, front: "What is the process by which plants make their own food?", back: "Photosynthesis" },
    { id: 3, front: "What method in JavaScript is used to stop further propagation of an event during its execution?", back: "event.stopPropagation()" },
    { id: 4, front: "What does the acronym DOM stand for in web development?", back: "Document Object Model" },
    { id: 5, front: "Who developed the theory of evolution by natural selection?", back: "Charles Darwin" },
    { id: 6, front: "What is the term for a word that is similar in meaning to another word?", back: "Synonym" },

    { id: 7, front: "Which part of speech describes a noun or pronoun?", back: "Adjective" },
  ]

<FlashCardArray
  cards={flashcards}
  width="600px"
  // Other props..
/>
`;

    const flashCardSnippet = `

  import {FlashCard } from "react-flashcards";

<FlashCard
  front={"What is the process by which plants make their own food?"}
  back={"Photosynthesis"}
  width="600px"
  // Other props..
/>
`;

    const copyCodeToClipboard = (snippet) => {
        navigator.clipboard.writeText(snippet);
    };

    return (
        <section className="flashcard-generator">
            <div className="intro">
                <h3 style={{ fontStyle: 'normal', fontWeight: '300' }}>
                    react-flashcards is a comprehensive, customizable flashcard component for React applications, designed to enhance learning experiences with rich multimedia support and interactive
                    features.
                </h3>
            </div>

            <div className="arrayContaine">
                <h4>FlashCardArray Component</h4>
                <FlashCardArray cards={flashcards} className="flashcard" width={flashCardWidth} />
            </div>
            <div className="codeSnippetContainer">
                <h4>FlashCardArray Component Code Snippet</h4>
                <div className="codeSnippet">
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
                        {flashCardArraySnippet.trim()}
                    </SyntaxHighlighter>
                    <button className="copyButton" onClick={() => copyCodeToClipboard(flashCardArraySnippet)}>
                        Copy
                    </button>
                </div>
            </div>
            <div className="arrayContaine">
                <h4>FlashCardArray Component with autoplay and label </h4>

                <FlashCardArray
                    cards={flashcards}
                    autoPlay={true}
                    width={flashCardWidth}
                    label={
                        <div className="labelContainer">
                            <div>
                                <p style={{ margin: 0 }}>Level: Easy</p>
                            </div>
                            <div>
                                <p style={{ margin: 0 }}>Sub:Bio</p>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="codeSnippetContainer">
                <h4>FlashCardArray Component with autoplay code Snippet</h4>
                <div className="codeSnippet">
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
                        {flashCardArraywithAutoplay.trim()}
                    </SyntaxHighlighter>
                    <button className="copyButton" onClick={() => copyCodeToClipboard(flashCardArraySnippet)}>
                        Copy
                    </button>
                </div>
            </div>
            <div className="arrayContaine">
                <h4>Standalone FlashCard Component</h4>
                <FlashCard front={'What is the process by which plants make their own food?'} back={'Photosynthesis'} width={flashCardWidth} />
            </div>
            <div className="codeSnippetContainer">
                <h4>Standalone FlashCard Component Code Snippet</h4>
                <div className="codeSnippet">
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
                        {flashCardSnippet.trim()}
                    </SyntaxHighlighter>
                    <button className="copyButton" onClick={() => copyCodeToClipboard(flashCardSnippet)}>
                        Copy
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FlashcardGenerator;
