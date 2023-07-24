import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

test('component uses className prop as class name', async () => {
  // Arrange
  render(<Button className='login-button' text="Submit!" type="submit"/>);
  // Act
  const testButton = await screen.findByRole('button');
  // Assert
  expect(testButton).toHaveClass('login-button');
});

test('component uses type prop as type', () => {
  // Arrange
  
  // Act
  
  // Assert
});

test('component is disabled when disabled is true', () => {
  // Arrange
  
  // Act
  
  // Assert
});

test('displays text prop as label on button', () => {
  // Arrange
  
  // Act
  
  // Assert
});