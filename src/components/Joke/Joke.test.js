import { render } from '@testing-library/react';

import "@testing-library/jest-dom/extend-expect";

import Joke from '.';

test("'Joke' component receives props and then renders text", () => {
  const text = "The best joke ever";
  const { container } = render(<Joke text={text} />);

  expect(container).toBeDefined();
  expect(container).toHaveTextContent(text);
});