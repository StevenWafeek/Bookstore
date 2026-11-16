import { configureStore } from '@reduxjs/toolkit';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import booksReducer, { addBook, fetchBooks, removeBook } from './booksSlice';

describe('book storage', () => {
  let savedBooks;

  beforeEach(() => {
    savedBooks = null;
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => savedBooks),
      setItem: vi.fn((key, value) => {
        savedBooks = value;
      }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('persists added books and restores them on load', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(123456);
    const store = configureStore({ reducer: { books: booksReducer } });
    const book = { title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fiction' };
    const savedBook = { item_id: '123456', ...book };

    await store.dispatch(addBook(book)).unwrap();

    expect(JSON.parse(savedBooks)).toEqual([savedBook]);
    expect(store.getState().books.books).toEqual([savedBook]);

    const reloadedStore = configureStore({ reducer: { books: booksReducer } });
    await reloadedStore.dispatch(fetchBooks()).unwrap();
    expect(reloadedStore.getState().books.books).toEqual([savedBook]);
  });

  it('removes books from persisted storage', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(123456);
    const store = configureStore({ reducer: { books: booksReducer } });

    await store.dispatch(addBook({ title: 'The Hobbit' })).unwrap();
    await store.dispatch(removeBook('123456')).unwrap();

    expect(JSON.parse(savedBooks)).toEqual([]);
    expect(store.getState().books.books).toEqual([]);
  });
});
