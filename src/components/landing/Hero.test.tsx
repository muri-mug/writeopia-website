import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the main headline', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText(/Because they aren't\./i)).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText(/Write your ideas\. Keep your docs safe and private\./i)
    ).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText('Become a Beta Tester')).toBeInTheDocument();
  });

  it('renders platform availability section', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText('Windows')).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
    expect(screen.getByText('Mac')).toBeInTheDocument();
  });

  it('CTA button links to download page', () => {
    renderWithProviders(<Hero />);
    const link = screen.getByText('Become a Beta Tester').closest('a');
    expect(link).toHaveAttribute('href', '/download');
  });
});
