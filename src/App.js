import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import Recipes from './Recipes';
import Recipe from './Recipe';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/recipes" component={Recipes} />
      <Route path="/recipes/:id" component={Recipe} />
    </Fragment>
  </BrowserRouter>
);

export default App;
