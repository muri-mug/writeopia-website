import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import Footer from './Footer';

vi.mock('@/assets/logo-completo.svg', () => ({ default: 'logo.svg' }));

describe('Footer', () => {
  it('renders LinkedIn social link', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('renders GitHub social link', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  });

  it('LinkedIn link points to correct URL', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/writeopia/'
    );
  });

  it('GitHub link points to correct URL', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/Writeopia/Writeopia'
    );
  });
});
