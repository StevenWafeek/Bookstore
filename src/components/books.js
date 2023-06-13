import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBook } from '../redux/books/booksSlice';

function Book(props) {
  const {
    title, author, category, id,
  } = props;

  const dispatch = useDispatch();

  const handleDelete = () => {
    // console.log(`Deleting book with id ${id}`);
    dispatch(removeBook(id));
  };

  return (
    <div>
      <h3>{title || 'No Title'}</h3>
      <p>
        Author:
        {' '}
        {author || 'Unknown'}
      </p>
      <p>
        Category:
        {' '}
        {category || 'Unknown'}
      </p>
      <button type="button" onClick={handleDelete}>Delete</button>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string.isRequired,
};

Book.defaultProps = {
  title: '',
  author: '',
  category: '',
};

export default Book;
