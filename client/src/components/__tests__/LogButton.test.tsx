import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogButton from '../LogButton';

test('is solid when isLogged prop has value true', async () => {
  // ARRANGE
  render(<LogButton isLogged={true} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('switch');
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('product__icon log__icon solid');
});

test('is outline when isLogged prop has value false', async () => {
  // ARRANGE
  render(<LogButton isLogged={false} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('switch');
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('product__icon log__icon outline');
});

test('displays text "Tried it!" when isLogged is true', async () => {
  // ARRANGE
  render(<LogButton isLogged={true} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('switch');
  // ASSERT
  expect(screen.getByRole('switch')).toHaveTextContent('Tried it!');
});

test('displays text "Tried it?" when isLogged is false', async () => {
  // ARRANGE
  render(<LogButton isLogged={false} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('switch');
  // ASSERT
  expect(screen.getByRole('switch')).toHaveTextContent('Tried it?');
});