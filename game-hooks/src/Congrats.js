import React from 'react';
import PropTypes from 'prop-types';

import successContext from './contexts/successContext';
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';
import guessedWordsContext from './contexts/guessedWordsContext';
import hookActions from './actions/hookActions';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const Congrats = (props) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  const startNewGame = (setSecretWord) => {
    hookActions.getSecretWord(setSecretWord);
    setGuessedWords([]);
    setSuccess(false);
  }

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
          <button
            onClick={() => startNewGame(props.setSecretWord)}
            className="btn btn-primary mb-2">
              {stringsModule.getStringByLanguage(language, 'newgame')}
          </button>
        </span>
      </div>
    );
  } else {
    return (
      <div data-test="component-congrats" />
    );
  }
};

Congrats.propTypes = {
  setSecretWord: PropTypes.func.isRequired
}

export default Congrats;
