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
  <Router basename="/oversight/">
    <Switch>
      <Route exact path="/oversight/" component={App} />
      <Route path="/oversight/admin" component={Admin} />
      <Route path="/oversight/all" component={AllPoliticians} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
