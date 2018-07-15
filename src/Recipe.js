import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import firebase from './Firebase';

class Recipes extends PureComponent {
  constructor(props) {
    super(props);

    this.Recipe = firebase.database().ref('Recipe').child(props.match.params.id);
    this.Ingredient = firebase.database().ref('Ingredient');

    this.state = {
      recipe: null,
      ingredients: [],
    };

    this.addIngredient = this.addIngredient.bind(this);
  }

  componentDidMount() {
    this.Recipe.on('value', (recipe) => {
      this.setState({ recipe: { id: recipe.key, ...recipe.val() } }, () => {
        this.Ingredient.on('child_added', (snap) => {
          const { recipe: theRecipe } = this.state;
          const ingredient = snap.val();
          if (!ingredient) return;
          if (ingredient.recipeId !== theRecipe.id) return;
          const newIngredient = { id: snap.key, ...ingredient };
          this.setState(prevState => ({ ingredients: [...prevState.ingredients, newIngredient] }));
        });
      });
    });
  }

  componentWillUnmount() {
    this.Ingredient.off('child_added');
    this.Recipe.off('value');
  }

  addIngredient(e) {
    e.preventDefault();

    const newIngredientObject = {
      name: e.target.name.value,
      recipeId: e.target['recipe-id'].value,
    };
    this.Ingredient.push(newIngredientObject)
      .then(() => {
        this.form.name.value = '';
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }


  render() {
    const { recipe, ingredients } = this.state;
    if (!recipe) {
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
        <form ref={(ref) => { this.form = ref; }} onSubmit={this.addIngredient}>
          <input name="name" type="text" />
          <input name="recipe-id" type="hidden" value={recipe.id} />
          <input type="submit" value="Add Ingredient" />
        </form>
        {ingredients.map(ingredient => (
          <div key={ingredient.id}>
            {ingredient.name}
          </div>
        ))}


      </div>
    );
  }
}
Recipes.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default Recipes;
