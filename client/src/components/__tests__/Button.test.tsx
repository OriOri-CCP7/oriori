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

test('component uses type prop as type', async () => {
  // Arrange
  render(<Button className='login-button' text="Submit!" type="submit"/>);
  // Act
  const testButton = await screen.findByRole('button');
  // Assert
  expect(testButton).toHaveAttribute('type', 'submit');
});

test('component is disabled when disabled is true', async () => {
  // Arrange
  render(<Button className='login-button' text="Submit!" type="submit" disabled={true}/>);
  // Act
  const testButton = await screen.findByRole('button');
  // Assert
  expect(testButton).toBeDisabled();
});

test('displays text prop as label on button', () => {
  // Arrange
  
  // Act
  
  // Assert
});