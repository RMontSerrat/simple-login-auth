import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './index';

describe('UserCard', () => {
  const mockUser = {
    image: 'test-image.jpg',
    name: 'John Doe',
    companyName: 'Test Company',
    age: 30,
    phone: '123-456-7890',
    gender: 'Male',
    email: 'john@example.com',
  };

  const mockOnLogout = jest.fn();

  test('renders user information correctly', () => {
    render(<UserCard user={mockUser} onLogout={mockOnLogout} />);

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Male')).toBeTruthy();
    expect(screen.getByText('30')).toBeTruthy();
    expect(screen.getByText('john@example.com')).toBeTruthy();
    expect(screen.getByText('123-456-7890')).toBeTruthy();
    expect(screen.getByText('Test Company')).toBeTruthy();
  });

  test('calls onLogout when the logout button is clicked', () => {
    render(<UserCard user={mockUser} onLogout={mockOnLogout} />);

    fireEvent.click(screen.getByText('Logout'));
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
