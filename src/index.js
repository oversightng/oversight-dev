import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import FullProfile from './components/fullpage';
import App from './components/app';
import Admin from './components/admin';
import AllPoliticians from './components/allpoliticians';

ReactDOM.render(
  <Router basename="/oversight-dev">
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/admin" component={Admin} />
      <Route path="/all" component={AllPoliticians} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
