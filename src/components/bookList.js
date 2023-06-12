import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from './books';
import { removeBook } from '../redux/books/booksSlice';

function BookList(props) {
  const { books, removeBook } = props;

  const handleDelete = (id) => {
    removeBook(id);
  };

  return (
    <div>
      <h2>Book List</h2>
      {books.map((book) => (
        <Book
          key={book.item_id}
          title={book.title}
          author={book.author}
          category={book.category}
          item_id={book.item_id}
          onDelete={() => handleDelete(book.item_id)}
        />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      item_id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books.books,
});

const mapDispatchToProps = {
  removeBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
