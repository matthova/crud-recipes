import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Recipes from './Recipes';
import Recipe from './Recipe';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={Recipes} />
      <Route path="/:id" component={Recipe} />
    </Fragment>
  </BrowserRouter>
);

export default App;
