# Welcome to React-Flashcards

`react-flashcards` is a comprehensive, customizable flashcard component for React applications, designed to enhance learning experiences with rich multimedia support and interactive features.

![React-Flashcards Demo](https://github.com/vdi1402/demo/assets/80397956/7bdcdb38-ae2d-498b-b25c-d37a160dd022.gif)


## Features

-   **Image Support:** Integrate images directly into your flashcards.
-   **Hint System:** Offer hints to help users when they're stuck.
-   **Bookmark/Favorite:** Allows users to save and revisit key flashcards.
-   **Sound:** Incorporate audio clips for language learning or auditory feedback.

-   **Shuffle:** Randomize the order of flashcards to ensure varied learning sessions.

## Structure of a Flashcard

Each flashcard can contain the following elements:

-   **Prompt/Question/Problem/Word:** The challenge or question to present to the user.
-   **Answer/Explanation:** The solution or explanation for the prompt.
-   **Hint:** Optional clues or assistance for solving the prompt.
-   **Image:** Visual media related to the prompt.
-   **Category:** Classification of the flashcard to organize by subject or difficulty.

## Installation

```sh
yarn add react-flashcards
```

```sh
npm i react-flashcards
```

## Usage Examples

```jsx
import React from 'react';
import { FlashCardArray } from 'react-flashcards';

const MyFlashcardComponent = () => {
    const flashcards = [
        {
            id: 1,
            front: <h1>Front of Card One</h1>,
            back: <p>Back of Card Two</p>
            // Other properties...
        },
        {
            id: 2,

            front: <h1>Front of Card One</h1>,
            back: <p>Back of Card Two</p>
            // Other properties...
        },
        {
            id: 3,

            front: <h1>Front of Card One</h1>,
            back: <p>Back of Card Two</p>
            // Other properties...
        }
        // Add more flashcards as needed
    ];

    return (
        <FlashCardArray
            cards={flashcards}
            controls={true}
            showCount={true}
            autoPlay={true}
            onCardChange={(id, index) => console.log(`Card change detected: ID ${id}, Index: ${index}`)}
            onCardFlip={(id, index, state) => console.log(`Card flipped: ID ${id}, Index: ${index}, Flipped: ${state}`)}

            // Other props...
        />
    );
};

export default MyFlashcardComponent;
```

## Possible keys for each object in `cards` array

| Key               | Type                  | Description                                            |
| ----------------- | --------------------- | ------------------------------------------------------ |
| \*id              | number                | Unique identifier for the flashcard                    |
| \*front           | string \| JSX.Element | HTML or JSX for the front of the card                  |
| \*back            | string \| JSX.Element | HTML or JSX for the back of the card                   |
| frontStyle        | React.CSSProperties   | Custom styles for the front of the card                |
| frontContentStyle | React.CSSProperties   | Custom styles for the content on the front of the card |
| backStyle         | React.CSSProperties   | Custom styles for the back of the card                 |
| backContentStyle  | React.CSSProperties   | Custom styles for the content on the back of the card  |
| className         | string                | Custom class name for the card                         |
| height            | string                | Height of the card                                     |
| width             | string                | Width of the card                                      |
| borderRadius      | string                | Border radius of the card                              |
| style             | React.CSSProperties   | Additional custom styles for the card                  |
| label             | string \| JSX.Element | HTML or JSX for the labels of card                     |
| showBookMark      | boolean               | Show bookmark icon on the card                         |

| showTextToSpeech | boolean | Show text-to-speech icon on the card |

| timerDuration | number | Duration for the timer | | bookmarkIcon |React.ReactNode | Custom bookmark icon |

| textToSpeechIcon | React.ReactNode | Custom text-to-speech icon |

## Examples

### Standalone Flashcard component

<details>
<summary>Click to expand</summary>

#### Basic Flashcard

```javascript
import React from 'react';
import { FlashCard } from 'react-flashcards';

function App() {
    return (
        <FlashCard
            front={
                <div>
                    Who is Prime Minister of <u>India?</u>?
                </div>
            }
            back={<div>Narendar Modi</div>}
        />
    );
}
```

### Custom Styles for front and back content

```javascript
import React from 'react';
import { FlashCard } from 'react-flashcards';

function App() {
    return (
        <FlashCard
            front={
                <>
                    <h1>A cold-blooded vertebrate animal that is born in water and breathes with gills is called :</h1>
                </>
            }
            back={<h1>Amphibian</h1>}
            backContentStyle={{
                backgroundColor: 'tea;',
                color: 'purple',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            frontContentStyle={{
                backgroundColor: 'purple',
                color: 'white',
                display: 'grid',
                fontSize: '2rem'
            }}
            label={
                <div>
                    {' '}
                    <span>Subject </span> : <span>bio</span>
                </div>
            }
        />
    );
}
```

### Card Flip Callback

```javascript
import React from 'react';
import { FlashCard } from 'react-flashcards';

function App() {
    return (
        <FlashCard
            front={<h1>Front</h1>}
            back={<h1>Back</h1>}
            onCardFlip={(state) => {
                if (state) console.log('Card is flipped');
                else console.log('Card is not flipped');
            }}
        />
    );
}
```

### Custom Card Size

```javascript
import { FlashCard } from 'react-flashcards';

function App() {
    return <FlashCard front={<h1>Front</h1>} back={<h1>Back</h1>} style={{ width: '500px', height: '350px' }} />;
}
```

## Possible Prop for FlashCard Component

| Key               | Type                  | Default | Description                                                             |
| ----------------- | --------------------- | ------- | ----------------------------------------------------------------------- |
| \*id              | number                |         | Unique identifier for the flashcard                                     |
| \*front           | string \| JSX.Element | none    | HTML or JSX for the front of the card                                   |
| \*back            | string \| JSX.Element | none    | HTML or JSX for the back of the card                                    |
| isMarkdown        | boolean               | false   | If true, renders the frontHtml /backHtml as Markdown; defaults to false |
| frontStyle        | React.CSSProperties   | {}      | Custom styles for the front of the card                                 |
| frontContentStyle | React.CSSProperties   | {}      | Custom styles for the content on the front of the card                  |
| backStyle         | React.CSSProperties   | {}      | Custom styles for the back of the card                                  |
| backContentStyle  | React.CSSProperties   | {}      | Custom styles for the content on the back of the card                   |
| className         | string                | ""      | Custom class name for the card                                          |
| height            | string                | ""      | Height of the card                                                      |
| width             | string                | ""      | Width of the card                                                       |
| borderRadius      | string                | ""      | Border radius of the card                                               |
| style             | React.CSSProperties   | {}      | Additional custom styles for the card                                   |
| showBookMark      | boolean               | true    | Show bookmark icon on the card                                          |
| showTextToSpeech  | boolean               | true    | Show text-to-speech icon on the card                                    |
| timerDuration     | number                |         | Duration for autoPlay Timer                                             |
| bookmarkIcon      | React.ReactNode       | icon    | Custom bookmark icon                                                    |
| textToSpeechIcon  | React.ReactNode       | icon    | Custom text-to-speech icon                                              |
| label             | string \| JSX.Element | none    | HTML or JSX for the labels of card                                      |

</details>
      <details>
<summary>FlashCardArray Component</summary>

### Basic FlashcardArray:

## Possible Prop for FlashCardArray Component

| Key               | Type                  | Default | Description                                                                                                   |
| ----------------- | --------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| \*front           | string \| JSX.Element | none    | HTML or JSX for the front of the card                                                                         |
| \*back            | string \| JSX.Element | none    | HTML or JSX for the back of the card                                                                          |
| isMarkdown        | boolean               | false   | If true, renders the frontHtml /backHtml as Markdown; defaults to false                                       |
| frontStyle        | React.CSSProperties   | {}      | Custom styles for the front of the card                                                                       |
| frontContentStyle | React.CSSProperties   | {}      | Custom styles for the content on the front of the card                                                        |
| backStyle         | React.CSSProperties   | {}      | Custom styles for the back of the card                                                                        |
| backContentStyle  | React.CSSProperties   | {}      | Custom styles for the content on the back of the card                                                         |
| className         | string                | ""      | Custom class name for the card                                                                                |
| height            | string                | ""      | Height of the card                                                                                            |
| width             | string                | ""      | Width of the card                                                                                             |
| autoPlay          | boolean               | false   | (Optional) If true, the flashcards will automatically flip after the timer duration and move to the next card |
| style             | React.CSSProperties   | {}      | Additional custom styles for the card                                                                         |
| controls          | boolean               | true    | If true, navigation controls will be displayed to move between flashcards                                     |
| showCount         | boolean               | true    | If true, a progress bar will be displayed indicating the current position in the array                        |
| timerDuration     | number                | 10s     | Duration for autoPlay Timer                                                                                   |
| bookmarkIcon      | React.ReactNode       | icon    | Custom bookmark icon                                                                                          |
| textToSpeechIcon  | React.ReactNode       | icon    | Custom text-to-speech icon                                                                                    |
| label             | string \| JSX.Element | none    | HTML or JSX for the labels of the card                                                                        |

```javascript
import { FlashCardArray } from 'react-flashcards';

function App() {
    const cards = [
        {
            id: 1,
            front: 'Front Content 1',
            back: 'Back Content 1'
        },
        {
            id: 2,
            front: 'Front Content 2',
            back: 'Back Content 2'
        },
        {
            id: 3,
            front: 'Front Content 3',
            back: 'Back Content 3'
        }
    ];
    return <FlashCardArray cards={cards} />;
}
```

### Custom styles for all cards in the array:

```javascript
import { FlashCardArray } from 'react-flashcards';

function App() {
    const cards = [
        {
            id: 1,
            front: 'Front Content 1',
            back: 'Back Content 1'
        },
        {
            id: 2,
            front: 'Front Content 2',
            back: 'Back Content 2'
        },
        {
            id: 3,
            front: 'Front Content 3',
            back: 'Back Content 3'
        }
    ];
    return (
        <FlashCardArray
            cards={cards}
            width="500px"
            frontContentStyle={{
                backgroundColor: 'blue',
                color: 'black'
            }}
            backContentStyle={{
                backgroundColor: 'teal'
            }}
        />
    );
}
```

### Custom style for each card:

You can set the style for each card directly within the card object by referring to the card's prop list. Alternatively, you can pass a custom React component with its own styles into the cards array.

```javascript
import { FlashCardArray } from 'react-flashcards';

function App() {
    const cards = [
        {
            id: 1,
            front: 'Front Content 1',
            back: 'Back Content 1',

            label: (
                <div>
                    <p style={{ margin: 0 }}>Level: Easy</p>
                </div>
            ),
            showBookMark: true,
            showTextToSpeech: true,
            frontContentStyle: {
                backgroundColor: 'red'
            }
        },
        {
            id: 2,
            front: 'Front Content 2',
            back: 'Back Content 2',

            label: (
                <div>
                    <p style={{ margin: 0 }}>Sub: math</p>
                </div>
            ),
            showBookMark: true,
            showTextToSpeech: true,
            frontContentStyle: {
                backgroundColor: 'blue'
            }
        }
    ];
    return <FlashCardArray cards={cards} />;
}
```

</details>

## Compatibility Information

(TBD)

## Contribution Guidelines

(TBD)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
