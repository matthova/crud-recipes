import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import firebase from './Firebase';

class Recipes extends PureComponent {
  constructor(props) {
    super(props);

    this.Recipe = firebase.database().ref('Recipe').child(props.match.params.id);

    this.state = {
      recipe: null,
    };
  }

  componentDidMount() {
    this.Recipe.on('value', (recipe) => {
      this.setState({ recipe: { id: recipe.key, ...recipe.val() } });
    });
  }

  componentWillUnmount() {
    this.Recipe.off('value');
  }

  render() {
    if (!this.state.recipe) {
      return (
        <div>
Loading...
        </div>
      );
    }

    return (
      <div>
        <p>
          Name:
          {' '}
          {this.state.recipe.name}
        </p>
      </div>
    );
  }
}
Recipes.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default Recipes;
