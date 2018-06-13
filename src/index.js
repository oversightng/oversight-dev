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
import FullPage from './components/fullPage';

ReactDOM.render(
  <Router basename="/oversight-dev">
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/admin" component={Admin} />
      <Route path="/all" component={AllPoliticians} />
      <Route path="/profile/:id" component={FullPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
