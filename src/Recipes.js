import React, { PureComponent } from 'react';
import firebase from './Firebase';

import RecipeCard from './RecipeCard';

class Recipes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
    };

    this.addRecipe = this.addRecipe.bind(this);
    this.addFirebase = this.addFirebase.bind(this);

    this.Recipe = firebase.database().ref('Recipe');
    this.Recipe.on('child_added', this.addFirebase);
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
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  render() {
    const { recipes } = this.state;

    return (
      <div>
        <p>
Recipes
        </p>
        <form onSubmit={this.addRecipe}>
          <input name="name" type="text" />
          <input type="submit" value="Submit" />
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
