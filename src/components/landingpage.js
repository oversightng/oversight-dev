'use strict';

import React from 'react';
import Loader from 'react-loader';
import { ToastContainer, toast } from 'react-toastify';
import TopNav from './topnav';
import Profile from './profile';
import SearchBar from './searchbar';
import Politicians from './politicians';

const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/politicians';

class LandingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      input: '',
      loggedin: false,
      loaded: false,
      current_user: '',
      token_valid: false,
    }
  }

  authenticate() {
    this.setState({ token_valid: true });
  }

  componentDidMount(){
    const token_auth = 'https://oversight-ws.herokuapp.com/api/authenticate';

    fetch(REQUEST_URL)
      .then((response) => response.json() )
        .then((json) => {
          this.setState({
            data: json,
            showDialog: false,
            loaded: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });

    fetch(token_auth, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(response => response.json())
      .then(function (data) {
        if (!data.success) {
          toast("Please Sign in for full Oversight user experience");
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        } else {
          console.log('token is valid');
        }
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });

  }

  handleUserInput(s) {
    this.setState({
      input: s,
    })
  }

  login() {
    console.log('just changed loggedin state');
    this.setState({
      loggedin: true,
    });
  }

  render() {
    const filtered = this.state.data.filter((p) => {
      return (p.name.toLowerCase().indexOf(this.state.input) > -1);
    });

// login front end rendering of TopNav
    let topnav = null;
    if (localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === null) {
      topnav = <TopNav login={this.login.bind(this)} />;
    } else {
      topnav = <Profile />;
    }
// ...........

    return (
      <div className='col-md-12 page-container'>
        <ToastContainer />
        {topnav}
        <div className="col-md-6 col-md-offset-4">
          <img src="http://oi63.tinypic.com/j15112.jpg" className="landing-logo img-responsive mx-auto float-left" />
        </div>
        <SearchBar
          data={filtered}
          value={this.state.searchText}
          onUserInput={this.handleUserInput.bind(this)}
          onClick={this.someEvent}
        />
        <Loader loaded={this.state.loaded} className="loader" lines={15} length={5} width={3} radius={30}
          corners={1} rotate={0} direction={1} color="green" speed={3}
          trail={60} shadow={false} hwaccel={false} className="spinner"
          zIndex={2e9}>
          <Politicians politicians={filtered} loggedin={this.state.loggedin} />
        </Loader>
      </div>
    );
  }
}

export default LandingPage;
