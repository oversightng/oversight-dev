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
import FullPage from './components/fullpage';
import Login from './components/login';
import SignUp from './components/signup';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import EditProfile from './components/editprofile';

ReactDOM.render(
  <Router basename="/oversight-rate">
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/admin" component={Admin} />
      <Route path="/all" component={AllPoliticians} />
      <Route path="/profile/:id" component={FullPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={SignUp} />
      <Route path="/edit-profile" component={EditProfile} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route exact path="/" component={App} />
      <Route exact path="/" component={App} />

    </Switch>
  </Router>,
  document.getElementById('root'),
);
