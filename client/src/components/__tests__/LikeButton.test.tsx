import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LikeButton from '../LikeButton';

test('is solid when isLiked prop has value true', async () => {
  // Arrange
  render(<LikeButton isLiked={true} clickHandler={() => {}}/>)
  // Act
  await screen.findByRole('switch');
  await screen.findByRole('img', {hidden: true});
  // Assert
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('product__icon like__icon solid');
});

test('is outline when isLiked prop has value false', async () => {
  // Arrange
  render(<LikeButton isLiked={false} clickHandler={() => {}}/>)
  // Act
  await screen.findByRole('switch');
  await screen.findByRole('img', {hidden: true});
  // Assert
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('product__icon like__icon outline');
});

test('displays text "Liked it!" when isLiked is true', async () => {
  // Arrange

  // Act

  // Assert
});

test('displays text "Liked it?" when isLiked is false', async () => {
  // Arrange

  // Act

  // Assert
});