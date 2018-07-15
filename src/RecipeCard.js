import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, name }) => (
  <Link to={`/${id}`}>
    <div>
Recipe:
      {' '}
      {name}
    </div>
  </Link>
);
RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default RecipeCard;
