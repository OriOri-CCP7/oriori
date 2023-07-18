import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareButton from '../ShareButton';

test('displays "Link Copied" text if shared', async () => {
  // ARRANGE
  render(<ShareButton hasShared={true} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('button');
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('button')).toHaveTextContent('Link Copied');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('share__icon');
});

test('does not display "Link Copied" text if not shared', async () => {
  // ARRANGE
  render(<ShareButton hasShared={false} clickHandler={() => {}}/>);
  // ACT
  await screen.findByRole('button');
  await screen.findByRole('img', {hidden: true});
  // ASSERT
  expect(screen.getByRole('button')).not.toHaveTextContent('Link Copied');
  expect(screen.getByRole('img', {hidden: true})).toHaveClass('share__icon');
});