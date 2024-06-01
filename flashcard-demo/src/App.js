import React from 'react';
import './App.css';
import FlashcardGenerator from './FlashcardGenerator';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {' '}
                <h1>Welcome to react-flashcards demo</h1>
            </header>
            <FlashcardGenerator />
        </div>
    );
}

export default App;
