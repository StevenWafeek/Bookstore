// @vitest-environment jsdom

import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import booksReducer from '../redux/books/booksSlice';
import BookForm from './bookform';

describe('BookForm', () => {
  it('keeps the form values and shows an error when saving fails', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    const store = configureStore({ reducer: { books: booksReducer } });

    render(
      <Provider store={store}>
        <BookForm />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Book title'), {
      target: { value: 'The Hobbit' },
    });
    fireEvent.change(screen.getByPlaceholderText('Author'), {
      target: { value: 'J.R.R. Tolkien' },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'ADD BOOK' }).closest('form'));

    await waitFor(() => {
      expect(screen.getByRole('alert').textContent).toContain('Storage unavailable');
    });
    expect(screen.getByPlaceholderText('Book title').value).toBe('The Hobbit');
    expect(screen.getByPlaceholderText('Author').value).toBe('J.R.R. Tolkien');
  });
});
