import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';

test('registers a user with a generated username and allows sign-in', () => {
  const { container, getByLabelText, getByText } = render(<LoginPage />);

  fireEvent.click(getByText('Create an account'));
  fireEvent.change(getByLabelText('Email'), { target: { value: 'alex@example.com' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: 'secure-pass' } });
  fireEvent.click(getByText('Register'));

  const generatedUsername = container.querySelector('.generatedUsername').textContent;
  expect(generatedUsername).toMatch(/^alex\d{4}$/);

  fireEvent.click(getByText('Continue to login'));
  fireEvent.change(getByLabelText('Password'), { target: { value: 'secure-pass' } });
  fireEvent.click(getByText('Submit'));

  expect(getByText('Who wrote Sanskrit grammar?')).toBeInTheDocument();
});
