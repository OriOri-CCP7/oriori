import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BkmarkButton from '../BkmarkButton';

test('renders as solid when bookmarked', async () => {
  // ARRANGE
  render(<BkmarkButton isBookmark={true} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('img', {hidden: true})).toHaveAttribute('class', 'bookmark__icon solid');
});

test('renders as outline when not bookmarked', async () => {
  // ARRANGE
  render(<BkmarkButton isBookmark={false} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('img', {hidden: true})).toHaveAttribute('class', 'bookmark__icon outline');
});