# Welcome to React-Flashcards

`react-flashcards` is a comprehensive, customizable flashcard component for React applications, designed to enhance learning experiences with rich multimedia support and interactive features.

## Features

- **Image Support:** Integrate images directly into your flashcards.
- **Hint System:** Offer hints to help users when they're stuck.
- **Bookmark/Favorite:** Allows users to save and revisit key flashcards.
- **Sound:** Incorporate audio clips for language learning or auditory feedback.
- **Timer:** Set a timer for each flashcard to challenge users under time pressure.
- **Shuffle:** Randomize the order of flashcards to ensure varied learning sessions.

## Structure of a Flashcard

Each flashcard can contain the following elements:
- **Prompt/Question/Problem/Word:** The challenge or question to present to the user.
- **Answer/Explanation:** The solution or explanation for the prompt.
- **Hint:** Optional clues or assistance for solving the prompt.
- **Image:** Visual media related to the prompt.
- **Category:** Classification of the flashcard to organize by subject or difficulty.

## Installation

```sh
yarn add react-flashcards
```

```sh
npm i react-flashcards
```

(TBD)

## Usage Examples


```jsx
import React from 'react';
import FlashCardArray from 'react-flashcards';

const MyFlashcardComponent  = () => {
    const flashcards = [
        {
            id: 1,
            showTimer: true,
            timerDuration: 10,
            frontHtml: '<h1>Front of Card One</h1>',
            backHtml: '<p>Back of Card Two</p>',
            // Other properties...
        },
        {
            id: 2,
            showTimer: false,
            frontHtml: '<h1>Front of Card One</h1>',
            backHtml: '<p>Back of Card Two</p>',
            // Other properties...
        },
        // Add more flashcards as needed
    ];

    return (
        <FlashCardArray
            cards={flashcards}
            controls={true}
            showCount={true}
            onCardChange={(id, index) => console.log(`Active card changed: ID ${id}, Index ${index}`)}
            onCardFlip={(id, index, state) => console.log(`Card flipped: ID ${id}, Index ${index}, Flipped ${state}`)}
            // Other props...
        />
    );
};

export default MyFlashcardComponent;
``` 

## Possible keys for each object in `cards` array

| Key                 | Type                  | Description                        |
| ------------------- | --------------------- | ---------------------------------- |
| \*id                | number                | Unique identifier for the flashcard |
| \*frontHtml         | string \| JSX.Element | HTML or JSX for the front of the card |
| \*backHtml          | string \| JSX.Element | HTML or JSX for the back of the card |
| frontStyle          | React.CSSProperties   | Custom styles for the front of the card |
| frontContentStyle   | React.CSSProperties   | Custom styles for the content on the front of the card |
| backStyle           | React.CSSProperties   | Custom styles for the back of the card |
| backContentStyle    | React.CSSProperties   | Custom styles for the content on the back of the card |
| timerStyles         | React.CSSProperties   | Custom styles for the timer        |
| className           | string                | Custom class name for the card     |
| height              | string                | Height of the card                 |
| width               | string                | Width of the card                  |
| borderRadius        | string                | Border radius of the card          |
| style               | React.CSSProperties   | Additional custom styles for the card |
| leftLabel           | string                | Left label text                    |
| leftLabelValue      | string                | Value for left label               |
| rightLabel          | string                | Right label text                   |
| rightLabelValue     | string                | Value for right label              |
| showBookMark        | boolean               | Show bookmark icon on the card     |
| showLeftLabel       | boolean               | Show left label on the card        |
| showRightLabel      | boolean               | Show right label on the card       |
| showTextToSpeech    | boolean               | Show text-to-speech icon on the card |
| showTimer           | boolean               | Show timer on the card             |
| timerDuration       | number                | Duration for the timer             |
| bookmarkIcon        | React.ReactNode       | Custom bookmark icon               |
| rightLabelIcon      | React.ReactNode       | Custom right label icon            |
| textToSpeechIcon    | React.ReactNode       | Custom text-to-speech icon         |


## Examples

### Standalone Flashcard component

<details>
<summary>Click to expand</summary>

#### Basic Flashcard

```javascript
import React from 'react';
import { FlashCard } from 'react-quizlet-flashcard';

function App() {
  return (
    <div className="storyContainer">
      <FlashCard 
        frontHtml={<div>Who is Prime Minister of <u>India?</u>?</div>} 
        backHtml={<div>Narendar Modi</div>} 
      />
    </div>
  );
}

```
### Custom Styles for front and back content

```javascript
import React from 'react';
import { FlashCard } from 'react-quizlet-flashcard';

function App() {
  return (
 <FlashCard
          frontHtml={
            <>
          <h1>A cold-blooded vertebrate animal that is born in water and breathes with gills is called :</h1>
            </>
          }
          backHtml={<h1>Amphibian</h1>}
          backContentStyle={{
            backgroundColor: "tea;",
            color: "purple",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          frontContentStyle={{
            backgroundColor: "purple",
            color: "white",
            display: "grid",
            fontSize: "2rem",
          }}
          leftLabel="Subject"
          leftLabelValue="Eng"
          rightLabel="Hint"
          rightLabelValue="A_N"
    
        />
  );
}


    ```

### Card Flip Callback
```javascript
import React from 'react';
import { FlashCard } from 'react-quizlet-flashcard';

function App() {
  return (
   <FlashCard
        frontHtml={<h1>Logged in Console</h1>}
        backHtml={<h1>Back</h1>}
        onCardFlip={(state) => {
          if (state) console.log('Card is flipped');
          else console.log('Card is not flipped');
        }}
      />
  );
}


    ```


        
## API Documentation

(TBD)

## Configuration Options

(TBD)

## Compatibility Information

(TBD)

## Contribution Guidelines

(TBD)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
