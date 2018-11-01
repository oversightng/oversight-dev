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
import GenderPoliticiansQuery from './components/analytics/gender';
import PartyPoliticiansQuery from './components/analytics/party';
import MyProfile from './components/analytics/profile';
import StatePoliticiansQuery from './components/analytics/state';
import HighestRatedPoliticians from './components/analytics/highest-rated';

ReactDOM.render(
  <Router basename="/">
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
      <Route path="/search-genders" component={GenderPoliticiansQuery} />
      <Route path="/search-parties" component={PartyPoliticiansQuery} />
      <Route path="/search-states" component={StatePoliticiansQuery} />
      <Route path="/highest-rated" component={HighestRatedPoliticians} />
      <Route path="/myprofile" component={MyProfile} />
      <Route exact path="/" component={App} />

    </Switch>
  </Router>,
  document.getElementById('root'),
);
