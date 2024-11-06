// App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { act } from 'react';

test('renders Show button initially', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Show/i);
  expect(buttonElement).toBeInTheDocument();
});

test('displays loading message and fetches cities when Show button is clicked', async () => {
  render(<App />);
  const buttonElement = screen.getByText(/Show/i);
  fireEvent.click(buttonElement);

  expect(screen.getByText(/Loading cities/i)).toBeInTheDocument();

  // Wait for cities to load after the fetch call
  await waitFor(() => {
    expect(screen.getByText(/List of Cities/i)).toBeInTheDocument();
  });
});

  console.error
    Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.

       6 |
       7 | test('renders Show button initially', () => {
    >  8 |   render(<App />);
         |         ^
       9 |   const buttonElement = screen.getByText(/Show/i);
      10 |   expect(buttonElement).toBeInTheDocument();
      11 | });

      at printWarning (node_modules/react-dom/cjs/react-dom-test-utils.development.js:71:30)
      at error (node_modules/react-dom/cjs/react-dom-test-utils.development.js:45:7)
      at actWithWarning (node_modules/react-dom/cjs/react-dom-test-utils.development.js:1736:7)
      at node_modules/@testing-library/react/dist/act-compat.js:63:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:159:26)
      at render (node_modules/@testing-library/react/dist/pure.js:246:10)
      at Object.<anonymous> (src/App.test.js:8:9)

 FAIL  src/App.test.js
  ✓ renders Show button initially (74 ms)
  ✓ displays loading message and fetches cities when Show button is clicked (711 ms)
  ✕ sorts cities by name or state in both ascending and descending order (4 ms)

  ● sorts cities by name or state in both ascending and descending order

    TestingLibraryElementError: Unable to find an element by: [data-testid="display-cities-button"]

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="app-container"
        >
          <div
            class="intro-container"
          >
            <h1
              class="intro-title"
            >
              List of Cities
            </h1>
            <button
              class="display-button"
            >
              Show
            </button>
          </div>
        </div>
      </div>
    </body>

      26 | test('sorts cities by name or state in both ascending and descending order', async () => {
      27 |   render(<App />);
    > 28 |   const buttonElement = screen.getByTestId('display-cities-button');
         |                                ^
      29 |   fireEvent.click(buttonElement);
      30 |
      31 |   await waitFor(() => {

      at Object.getElementError (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/config.js:37:19)
      at node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:76:38
      at node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:52:17
      at getByTestId (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:95:19)
      at Object.<anonymous> (src/App.test.js:28:32)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        2.441 s, estimated 3 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.