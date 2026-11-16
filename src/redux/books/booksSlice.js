import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const STORAGE_KEY = 'books';

const normalizeBook = (book = {}, fallbackId = '') => ({
  item_id: String(book.item_id ?? fallbackId),
  title: book.title || '',
  author: book.author || '',
  category: book.category || '',
});

const loadBooks = () => {
  const savedBooks = localStorage.getItem(STORAGE_KEY);
  if (savedBooks === null) return [];

  const parsedBooks = JSON.parse(savedBooks);
  if (!Array.isArray(parsedBooks)) {
    throw new Error('Saved books are invalid.');
  }
  return parsedBooks;
};

const saveBooks = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  return loadBooks();
});

export const addBook = createAsyncThunk('books/add', async (book = {}, { getState }) => {
  const itemId = Date.now().toString();
  const normalizedBook = normalizeBook({ ...book, item_id: itemId }, itemId);
  saveBooks([normalizedBook, ...getState().books.books]);

  return normalizedBook;
});

export const removeBook = createAsyncThunk('books/remove', async (id, { getState }) => {
  const books = getState().books.books.filter(
    (book) => String(book.item_id) !== String(id),
  );
  saveBooks(books);
  return String(id);
});

const booksSlice = createSlice({
  name: 'books',
  initialState: { books: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        const booksObj = action.payload || {};
        state.books = Object.entries(booksObj).map(([bookId, bookData]) => {
          const apiBook = Array.isArray(bookData) ? bookData[0] || {} : bookData || {};
          return normalizeBook(apiBook, String(bookId));
        });
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books = [normalizeBook(action.payload), ...state.books];
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => String(book.item_id) !== String(action.payload),
        );
      });
  },
});

export default booksSlice.reducer;
