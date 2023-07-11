import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BkmarkButton from '../BkmarkButton';

test('is solid when bookmarked', async () => {
  // ARRANGE
  render(<BkmarkButton isBookmark={true} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('switch');
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('bookmark__icon solid');
});

test('is outline when not bookmarked', async () => {
  // ARRANGE
  render(<BkmarkButton isBookmark={false} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('switch');
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('bookmark__icon outline');
});