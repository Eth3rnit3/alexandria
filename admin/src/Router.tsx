import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import Authors from './pages/Authors';
import AuthorForm from './pages/AuthorForm';

interface Props {
  
}

export default function Router({}: Props): ReactElement {
  return (
    <div>
      <h1>Admin</h1>
      <Switch>
        <Route exact path="/" component={Authors} />
        <Route exact path="/authors" component={Authors} />
        <Route exact path="/authors/new" component={AuthorForm} />
        <Route exact path="/authors/:id" component={AuthorForm} />
      </Switch>
    </div>
  )
}
