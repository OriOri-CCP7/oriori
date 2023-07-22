import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../Header';

test('renders mainText prop correctly', () => {
  // Arrange
  render(<BrowserRouter><Header mainText="Home" /></BrowserRouter>);
  // Act
  const testText = screen.getByText('Home');
  // Assert
  expect(testText).toBeInTheDocument();
});
