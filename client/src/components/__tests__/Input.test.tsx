import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Input';

test('component class name matches className prop', async () => {
  // Arrange
  render(<Input className="email-input" placeholder="Your email here" type="email" value="email@email.com" onChange={() => {}}/>);
  // Act
  const testInput = await screen.getByDisplayValue("email@email.com");
  // Assert
  expect(testInput).toHaveClass("email-input");
});

test('component placeholder text matches placeholder prop', async () => {
  // Arrange
  render(<Input className="email-input" placeholder="Your email here" type="email" value="email@email.com" onChange={() => {}}/>);
  // Act
  const testInput = await screen.getByDisplayValue("email@email.com");
  // Assert
  expect(testInput).toHaveAttribute('placeholder', "Your email here");
});

test('component has type matching type prop', async () => {
  // Arrange
  render(<Input className="email-input" placeholder="Your email here" type="email" value="email@email.com" onChange={() => {}}/>);
  // Act
  const testInput = await screen.getByDisplayValue("email@email.com");
  // Assert
  expect(testInput).toHaveAttribute('type', 'email');
});

test('component has auto-complete type matching autoComplete prop', () => {
  // Arrange

  // Act
  
  // Assert

});

test('component has value matching value prop', async () => {
  // Arrange
  render(<Input className="email-input" placeholder="Your email here" type="email" value="email@email.com" onChange={() => {}}/>);
  // Act
  const testInput = await screen.getByDisplayValue("email@email.com");
  // Assert
  expect(testInput).toHaveAttribute('value', "email@email.com");

});

test('component value must not be empty when required prop is true', () => {
  // Arrange

  // Act
  
  // Assert

});

test('if type is "file", component only accepts images', () => {
  // Arrange

  // Act
  
  // Assert

});

test('if type is "file", component only accepts one file selection', () => {
  // Arrange

  // Act
  
  // Assert

});