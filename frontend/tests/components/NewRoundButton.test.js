import { render, screen } from '@testing-library/react';
import { describe, expect, test } from "vitest";
import NewRoundButton from '../../src/components/NewRoundButton';

describe('NewRoundButton', () => {
    test('renders the button with the correct text', () => {
        render(<NewRoundButton />);

        // Check if the button is rendered with the correct text
        const buttonElement = screen.getByText(/New Round/i);
        expect(buttonElement).toBeInTheDocument();
    });
});
