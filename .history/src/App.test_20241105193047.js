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

  // The initial sort order is ascending (Chicago at the top)
  const initialCities = screen.getAllByText(/Chicago|El Paso|San José/i);
  expect(initialCities[2]).toHaveTextContent("San José");
  expect(initialCities[1]).toHaveTextContent("El Paso");
  expect(initialCities[0]).toHaveTextContent("Chicago");

  // Click the sort button to switch to ascending order
  const sortButton = screen.getByText(/Sort Descending/i);
  fireEvent.click(sortButton);

  // Check for ascending order: "Chicago" should come first, followed by "El Paso" and "San José"
  const citiesAscending = screen.getAllByText(/San José|El Paso|Chicago/i);
  expect(citiesAscending[2]).toHaveTextContent("Chicago");
  expect(citiesAscending[1]).toHaveTextContent("El Paso");
  expect(citiesAscending[0]).toHaveTextContent("San José");

  // Click the sort button again to toggle back to ascending order
  fireEvent.click(sortButton);

  // Check for ascending order: "San José" should be first, followed by "El Paso" and "Chicago"
  const citiesDescending = screen.getAllByText(/Chicago|El Paso|San José/i);
  expect(citiesDescending[2]).toHaveTextContent("San José");
  expect(citiesDescending[1]).toHaveTextContent("El Paso");
  expect(citiesDescending[0]).toHaveTextContent("Chicago");
});