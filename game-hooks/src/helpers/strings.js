const languageStrings = {
  en: {
   congrats: 'Congratulations! You guessed the word!',
   submit: 'Submit',
   guessPrompt: 'Number of letters of our secret word is: ',
   guessInputPlaceholder: 'enter guess',
   guessColumnHeader: 'Guessed Words',
   guessedWords: 'Guesses',
   matchingLettersColumnHeader: 'Matching Letters',
   newgame: '   New Game',
   guessAttemptNumber: 'Attempt'
  },
  emoji: {
   congrats: '🎯🎉',
   submit: '🚀',
   guessPrompt: '🤔🤫🔤',
   guessInputPlaceholder: '⌨️🤔',
   guessedWords: '🤷‍🔤',
   guessColumnHeader: '🤷‍',
   matchingLettersColumnHeader: '✅',
   newgame: '✅'
  }
}

function getStringByLanguage(languageCode, stringKey, strings=languageStrings) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);

    // fall back to english
    return strings.en[stringKey];
  }

  return strings[languageCode][stringKey];
}

// for future mocking
export default {
  getStringByLanguage,
}
