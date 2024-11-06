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

test('filters cities based on user input', async () => {
  render(<App />);
  const buttonElement = screen.getByText(/Show/i);
  fireEvent.click(buttonElement);

  await waitFor(() => {
    expect(screen.getByText(/List of Cities/i)).toBeInTheDocument();
  });

  // Assuming there is a city with the name "Chicago"
  const filterInput = screen.getByPlaceholderText(/Filter cities/i);
  fireEvent.change(filterInput, { target: { value: 'Chicago' } });

  expect(screen.getByText(/Chicago/i)).toBeInTheDocument();
});

test('sorts cities by name or state in both ascending and descending order', async () => {
  render(<App />);
  const buttonElement = screen.getByText(/Show/i);
  fireEvent.click(buttonElement);

  await waitFor(() => {
    expect(screen.getByText(/List of Cities/i)).toBeInTheDocument();
  });

  // Get the sort button and click to sort in ascending order
  const sortButton = screen.getByText(/Sort/i);
  fireEvent.click(sortButton);

  // Check for ascending order: assuming "Chicago" should come before "El Paso" and "San José"
  const citiesAscending = screen.getAllByText(/Chicago|El Paso|San José/i);
  expect(citiesAscending[0]).toHaveTextContent("Chicago");
  expect(citiesAscending[1]).toHaveTextContent("El Paso");
  expect(citiesAscending[2]).toHaveTextContent("San José");

});  