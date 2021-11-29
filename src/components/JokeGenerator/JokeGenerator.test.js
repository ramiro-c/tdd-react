import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { Simulate } from 'react-dom/test-utils';
import "@testing-library/jest-dom/extend-expect";

import axios from "axios";
import MockAxios from "axios-mock-adapter";

import JokeGenerator from ".";

import { URL_GITHUB_REPO, URL_TDD_COURSE_REPO } from '../../utils/constants';

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

beforeEach(() => {
  var meta = document.createElement('meta');
  document.head.appendChild(meta);
});

afterAll(() => mock.restore());

describe('<JokeGenerator />', () => {

  test("'JokeGenerator' page displays title", async () => {
    const { container } = render(<JokeGenerator />);

    expect(container).toBeDefined();
    await waitFor(() => expect(document.querySelector("title")).toHaveTextContent('TDD - JokeGenerator'));
  });

  test("'JokeGenerator' component displays h1", () => {
    const { container, getByText } = render(<JokeGenerator />);

    expect(container).toBeDefined();
    expect(getByText("Welcome to")).toBeInTheDocument();
    expect(getByText("JokeGenerator")).toBeInTheDocument();
  });

  test("'JokeGenerator' component fetches a random joke a renders it", async () => {
    // Mocking response for axios.get(RANDOM_JOKE_URL) request
    const jokeText = "Really funny joke!";
    mock.onGet().replyOnce(200, {
      value: {
        joke: jokeText
      }
    });

    const { container, getByText, queryByText } = render(<JokeGenerator />);
    expect(container).toBeDefined();

    /* Checking if a default text is being displayed when
     * no joke has been loaded yet. 
     */
    expect(queryByText("You haven't loaded any joke yet!")).toBeInTheDocument();

    // Simulating a button click in the browser
    Simulate.click(getByText("Load a random joke"));

    // Checking if the default text is no longer displayed.
    expect(queryByText("You haven't loaded any joke yet!")).not.toBeInTheDocument();

    // Checking if 'Loading...' is visible in the DOM.
    expect(getByText("Loading...")).toBeInTheDocument();

    // Waiting until Loading message disappear from DOM
    await waitFor(() => expect(queryByText("Loading...")).not.toBeInTheDocument());

    // Checking if joke is being displayed.
    expect(getByText(jokeText)).toBeInTheDocument();
  });

  // data driven test
  test.each`
    text                            | url 
    ${'TDD - Course'}               | ${URL_TDD_COURSE_REPO}
    ${'Project GitHub repository'}  | ${URL_GITHUB_REPO}
  `("Validate 'a' redirection path to $text is $url", ({ text, url }) => {
    const { container, getByText } = render(<JokeGenerator />);

    expect(container).toBeDefined();

    const link = getByText(text);

    expect(link).toHaveAttribute("href");
    expect(link.getAttribute("href")).toBe(url);
  });

});