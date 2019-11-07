import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from './App';

import all from './data';
import min10 from './min10';

export default function Routes() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/min10">
            <App data={min10} />
          </Route>
          <Route path="/">
            <App data={all} />
          </Route>
        </Switch>
    </Router>
  );
}
