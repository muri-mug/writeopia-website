import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import Download from './Download';

const { mockInsert, mockToast } = vi.hoisted(() => ({
  mockInsert: vi.fn(),
  mockToast: vi.fn(),
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: () => ({
      insert: mockInsert,
    }),
  },
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

const fillForm = (name: string, email: string) => {
  fireEvent.change(screen.getByPlaceholderText('Your name'), {
    target: { value: name },
  });
  fireEvent.change(screen.getByPlaceholderText('Your email'), {
    target: { value: email },
  });
};

const submitForm = () => {
  const form = screen.getByPlaceholderText('Your name').closest('form')!;
  fireEvent.submit(form);
};

describe('Download - formulário de registro beta', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza os campos de nome e email', () => {
    renderWithProviders(<Download />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByText(/join beta/i)).toBeInTheDocument();
  });

  it('envia nome e email corretos para o Supabase', async () => {
    mockInsert.mockResolvedValue({ error: null });

    renderWithProviders(<Download />);
    fillForm('Murilo Muniz', 'murilo@example.com');

    await act(async () => {
      submitForm();
    });

    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledWith({
        name: 'Murilo Muniz',
        email: 'murilo@example.com',
      });
    });
  });

  it('exibe links de download após registro bem-sucedido', async () => {
    mockInsert.mockResolvedValue({ error: null });

    renderWithProviders(<Download />);
    fillForm('Murilo Muniz', 'murilo@example.com');

    await act(async () => {
      submitForm();
    });

    await waitFor(() => {
      expect(screen.getByText("You're registered!")).toBeInTheDocument();
    });
  });

  it('exibe toast de boas-vindas após registro bem-sucedido', async () => {
    mockInsert.mockResolvedValue({ error: null });

    renderWithProviders(<Download />);
    fillForm('Murilo Muniz', 'murilo@example.com');

    await act(async () => {
      submitForm();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Welcome to the Beta!' })
      );
    });
  });

  it('mostra erro de validação quando os campos estão vazios', async () => {
    renderWithProviders(<Download />);

    await act(async () => {
      submitForm();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Please fill in all fields correctly',
          variant: 'destructive',
        })
      );
    });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('mostra erro de validação para email inválido', async () => {
    renderWithProviders(<Download />);
    fillForm('Murilo', 'email-invalido');

    await act(async () => {
      submitForm();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: 'destructive' })
      );
    });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('exibe toast de "já cadastrado" para email duplicado (erro 23505)', async () => {
    mockInsert.mockResolvedValue({ error: { code: '23505' } });

    renderWithProviders(<Download />);
    fillForm('Murilo Muniz', 'murilo@example.com');

    await act(async () => {
      submitForm();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Already registered!' })
      );
    });

    // Mesmo duplicado, exibe os links de download
    await waitFor(() => {
      expect(screen.getByText("You're registered!")).toBeInTheDocument();
    });
  });

  it('exibe toast de erro genérico em falha do Supabase', async () => {
    mockInsert.mockResolvedValue({ error: { code: 'PGRST000' } });

    renderWithProviders(<Download />);
    fillForm('Murilo Muniz', 'murilo@example.com');

    await act(async () => {
      submitForm();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Error', variant: 'destructive' })
      );
    });

    // Formulário permanece visível após erro genérico
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });
});
