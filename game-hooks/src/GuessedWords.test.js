import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import GuessedWords from './GuessedWords';

import guessedWordsContext from './contexts/guessedWordsContext';

/**
* Factory function to create a ShallowWrapper for the GuessedWords component.
* @function setup
* @param {array} guessedWords - guessedWords value specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = (guessedWords=[]) => {
  const mockUseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />)
};

describe('if there are no words guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup([]);
  });
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessNum:1, guessedWord: 'train', letterMatchCount: 3 },
    { guessNum:2, guessedWord: 'agile', letterMatchCount: 1 },
    { guessNum:3, guessedWord: 'party', letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  test ('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });
  test('correct number of guessed words', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
  test('number of guess is correctly shown', () => {
    const guessedNum = findByTestAttr(wrapper, 'guessed-num');
    expect(guessedNum.length).toBe(3);
  })
});

describe("languagePicker", () => {
  test("correctly renders guess instructions string in English by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toContain('Number of letters of our secret word')
  });
  test("correctly renders guess instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUseContext;
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toContain('🤔🤫🔤');
  });
});
