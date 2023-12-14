import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

const mockOnLogout = jest.fn();

describe('LoginForm', () => {
  test('renders the login form', () => {
    render(
        <LoginForm error={null} loading={false} onSubmit={mockOnLogout} />
    );

    expect(screen.getByPlaceholderText('Digite seu nome de usuário')).toBeTruthy();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeTruthy();
    expect(screen.getByText('Entrar')).toBeTruthy();
  });

  test('allows users to enter username and password', () => {
    render(
        <LoginForm error={null} loading={false} onSubmit={mockOnLogout} />
    );

    fireEvent.change(screen.getByPlaceholderText('Digite seu nome de usuário'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), { target: { value: 'password' } });

    expect(screen.getByDisplayValue('testuser')).toBeTruthy();
    expect(screen.getByDisplayValue('password')).toBeTruthy();
  });

  test('calls login function when form is submitted', () => {
    render(
      <LoginForm error={null} loading={false} onSubmit={mockOnLogout} />
    );

    fireEvent.click(screen.getByText('Entrar'));

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
