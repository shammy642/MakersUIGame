import { render, screen } from '@testing-library/react';
import ExitGameButton from '../../src/components/ExitButton';

describe('ExitGameButton', () => {
  test('renders the button with the correct text', () => {
    render(<ExitGameButton />);

    // Check if the button is rendered with the correct text
    const buttonElement = screen.getByText(/Exit Game/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
