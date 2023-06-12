import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  const {
    title, author, category, onDelete,
  } = props;

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>
        Author:
        {' '}
        {author}
      </p>
      <p>
        Category:
        {' '}
        {category}
      </p>
      <button type="button" onClick={handleDelete}>Delete</button>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Book;
