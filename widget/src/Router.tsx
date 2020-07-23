import React, { ReactElement } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Pages1 from './pages/Pages1';
import Pages2 from './pages/Pages2';
import Pages3 from './pages/Pages3';

interface Props {
  
}

export default function Router({}: Props): ReactElement {
  return (
    <div>
      <Link to="/page1">Page 1</Link>
      <Link to="/page2">Page 2</Link>
      <Link to="/page3">Page 3</Link>
      <Switch>
        <Route exact path="/page1" component={Pages1} />
        <Route exact path="/page2" component={Pages2} />
        <Route exact path="/page3" component={Pages3} />
      </Switch>
    </div>
  )
}
