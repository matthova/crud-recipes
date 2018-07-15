import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RecipeCard extends PureComponent {
  render() {
    const { id, name } = this.props;

    return (
      <Link to={`/${id}`}>
        <div>
Recipe:
          {' '}
          {name}
        </div>
      </Link>
    );
  }
}
RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default RecipeCard;
