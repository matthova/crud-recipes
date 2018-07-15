import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';

import RecipeCard from './RecipeCard';

class Recipes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      recipeRoute: null,
    };

    this.addRecipe = this.addRecipe.bind(this);
    this.addFirebase = this.addFirebase.bind(this);

    this.Recipe = firebase.database().ref('Recipe');
  }

  componentDidMount() {
    this.Recipe.on('child_added', this.addFirebase);
  }

  componentWillUnmount() {
    this.Recipe.off('child_added');
  }

  addFirebase(snap) {
    const recipe = snap.val();
    if (!recipe) return;
    const newRecipe = { id: snap.key, ...recipe };
    this.setState(prevState => ({ recipes: [...prevState.recipes, newRecipe] }));
  }

  addRecipe(e) {
    e.preventDefault();

    const newRecipeObject = {
      name: e.target.name.value,
    };
    this.Recipe.push(newRecipeObject)
      .then((data) => {
        this.setState({ recipeRoute: data.key });
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  render() {
    const { recipes, recipeRoute } = this.state;

    if (recipeRoute) return <Redirect to={`/${recipeRoute}`} />;

    return (
      <div>
        <p>
Recipes
        </p>
        <form onSubmit={this.addRecipe}>
          <input name="name" type="text" />
          <input type="submit" value="Create Recipe" />
        </form>
        <div>
          <h1>
Recipe Cards
          </h1>
          {recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
        </div>
      </div>
    );
  }
}

export default Recipes;
