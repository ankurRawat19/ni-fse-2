import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Form from './Form';

describe('Form Component', () => {
    test('displays validation error message for missing fields', async () => {
        render(<Form />);

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.getByText('All fields are required.')).toBeInTheDocument();
        });
    });

    test('submits the form when all fields are filled', async () => {
        render(<Form />);

        // Fill in all the required fields
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234567890' } });

        fireEvent.click(screen.getByText('Submit'));

        // Wait for the form submission
        await waitFor(() => {
            // Add assertions based on your expected behavior after form submission
        });
    });

    test('displays loading state during form submission', async () => {
        render(<Form />);

        fireEvent.click(screen.getByText('Submit'));

        // Wait for the loading state
        await waitFor(() => {
            expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        });
    });
});
