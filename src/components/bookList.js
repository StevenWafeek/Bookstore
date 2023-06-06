import React from 'react';
import PropTypes from 'prop-types';
import Book from './books';

function BookList(props) {
  const { books, onDelete } = props;

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div>
      <h2>Book List</h2>
      {books.map((book) => (
        <Book
          key={book.id}
          title={book.title}
          author={book.author}
          onDelete={() => handleDelete(book.id)}
        />
      ))}
    </div>
  );
}

export default BookList;

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};