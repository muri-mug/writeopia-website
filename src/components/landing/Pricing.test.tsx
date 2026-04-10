import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import Pricing from './Pricing';

describe('Pricing', () => {
  it('renders all three pricing plans', () => {
    renderWithProviders(<Pricing />);
    expect(screen.getByText('Individual')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('marks individual plan as popular', () => {
    renderWithProviders(<Pricing />);
    expect(screen.getByText('Open Beta')).toBeInTheDocument();
  });

  it('renders pricing section heading', () => {
    renderWithProviders(<Pricing />);
    expect(screen.getByText('Writeopia Beta')).toBeInTheDocument();
  });
});
