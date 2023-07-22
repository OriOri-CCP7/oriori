import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../Header';

test('renders mainText prop correctly', () => {
  // Arrange
  render(<BrowserRouter><Header mainText="Home" /></BrowserRouter>);
  // Act
  const testText = screen.getByText('Home');
  const headerElement = screen.getByRole('heading', { level: 1 });
  // Assert
  expect(testText).toBeInTheDocument();
  expect(headerElement).toBeInTheDocument();
});

test('renders secondaryText prop if provided', () => {
  // Arrange
  render(<BrowserRouter><Header mainText="Home" secondaryText='Hello World'/></BrowserRouter>);
  // Act
  const testText = screen.getByText('Hello World');
  const headerElement = screen.getByRole('heading', { level: 2 });
  // Assert
  expect(testText).toBeInTheDocument();
  expect(headerElement).toBeInTheDocument();
});

test('does not render secondaryText prop if not provided', () => {
  // Arrange
  render(<BrowserRouter><Header mainText="Home"/></BrowserRouter>);
  // Act
  const testText = screen.queryByText('Hello World');
  const headerElement = screen.queryByRole('heading', { level: 2 });
  // Assert
  expect(testText).toBeNull();
  expect(headerElement).toBeNull();
});