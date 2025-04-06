//import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import PopupApp from './PopupApp';

describe('PopupApp Component', () => {
  it('should render the main title and placeholder elements', () => {
    render(<PopupApp />);

    // Check for the main heading
    expect(screen.getByRole('heading', { name: /extension popup/i })).toBeInTheDocument();

    // Check for placeholder sections/buttons using data-testid
    expect(screen.getByTestId('visited-sites-list')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-button')).toBeInTheDocument();
    expect(screen.getByTestId('options-button')).toBeInTheDocument();
    expect(screen.getByTestId('help-button')).toBeInTheDocument();

    // Check for specific placeholder text (optional, but good practice)
    expect(screen.getByText('(List will appear here)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear visits/i })).toBeInTheDocument();

  });

  // Add more tests here as functionality is developed
  // e.g., testing button clicks, state changes, data fetching/display
});
