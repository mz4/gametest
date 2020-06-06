import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord, language: 'en' },
      jest.fn()
    ]);
  
  React.useReducer = mockUseReducer;

  return mount(<App />);
}


test('App renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
})

describe('getSecretWord calls', () => {

  test('getSecretWord gets called on App mount', () => {
    setup();

    expect(mockGetSecretWord).toHaveBeenCalled();
  })
  
  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // wrapper .update() doesn't trigger update
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  })

});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  })

  test("renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app")
    expect(appComponent.exists()).toBe(true)
  })

  test("does not render loader if secretword not loaded yet", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(false)
  })
})

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null)
  })

  test("does not render app when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app")
    expect(appComponent.exists()).toBe(false);
  })

  test("renders spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner")
    expect(spinnerComponent.exists()).toBe(true)
  })

})