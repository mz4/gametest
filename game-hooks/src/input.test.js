import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';
import languageContext from './contexts/languageContext'
import successContext from './contexts/successContext'
import guessedWordsContext from './contexts/guessedWordsContext'

/**
 * Create ReactWrapper for Input component for testing
 * @param {object} testValues - Context and props for this test
 * @returns {ReactWrapper} - Wrapper for Inout component and provider
 */
const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <languageContext.provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.provider>
  )
}

test('Input renders without error', () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
})

test('it renders with expected props', () => {
  checkProps(Input, { secretWord: "party" });
})

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  })
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  })
  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  })
})

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('Submit');
  })
  test('renders congrats in emoji', () => {
    const wrapper = setup({ language: "emoji" })
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.text()).toBe('🚀')
  })
  test('input component does not show when success is true', () => {
    const wrapper = setup({ secretWord: "party", success: true })
    expect(wrapper.isEmptyRender()).toBe(true);
  })
})