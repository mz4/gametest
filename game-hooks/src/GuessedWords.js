import React from 'react';

import guessedWordsContext from './contexts/guessedWordsContext';
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const GuessedWords = ({ secretWord }) => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);
  const secretWordLength = (typeof secretWord !== "undefined") ? secretWord.length : 0;
  let contents
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')} {secretWordLength}
      </span>
    )
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td data-test="guessed-num">{word.guessNum}</td>
        <td data-test="guessed-inputword">{word.guessedWord}</td>
        <td data-test="guessed-count">{word.letterMatchCount}</td>
      </tr>
    ));
  contents = (
    <>
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')} {secretWordLength}
      </span>
      <div data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>{stringsModule.getStringByLanguage(language, 'guessAttemptNumber')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
            </tr>
          </thead>
          <tbody>
            { guessedWordsRows }
          </tbody>
        </table>
      </div>
    </>
  )}

  let total = (
    <>
      <div>Total Guess: {guessedWords.length}</div>
    </>
  )
  return (
    <div data-test="component-guessed-words">
      { contents }
      { total }
    </div>
  )
};

export default GuessedWords;