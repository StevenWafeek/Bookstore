// booksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const baseURL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/zGedxLSXTMMU6gsuNVlY';

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const response = await axios.get(`${baseURL}/books`);
  console.log(response.data);
  return response.data;
});

export const addBook = createAsyncThunk('books/add', async (book) => {
  const response = await axios.post(`${baseURL}/books`, book);
  return response.data;
});

export const removeBook = createAsyncThunk('books/remove', async (id) => {
  await axios.delete(`${baseURL}/books/${id}`);
  console.log(id);

  return id;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => action.payload || {})
      .addCase(addBook.fulfilled, (state, action) => {
        const newState = { ...state };
        newState[action.payload.item_id] = action.payload;
        return newState;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
      });
  },
});

export default booksSlice.reducer;
