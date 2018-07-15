import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

class Recipes extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <div>
Recipe
        {' '}
        {match.params.id}
      </div>
    );
  }
}
Recipes.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default Recipes;
