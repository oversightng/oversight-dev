import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import App from './components/app';
import Admin from './components/admin';
import AllPoliticians from './components/allpoliticians';

ReactDOM.render(
  <Router basename="/oversight-dev">
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/oversight-dev/admin" component={Admin} />
      <Route path="/oversight-dev/all" component={AllPoliticians} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
