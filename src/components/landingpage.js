import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from 'react-loader';

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
    }
  };

  componentDidMount(){
    return fetch(REQUEST_URL)
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

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
    this.state({
      loggedin: false,
      current_user: '',
    });
  }

  render() {
    const filtered = this.state.data.filter((p) => {
      return (p.name.toLowerCase().indexOf(this.state.input) > -1);
    });

// login front end rendering of TopNav
    let topnav = null;
    if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ) {
      topnav = <TopNav login={this.login.bind(this)} />;
    } else {
      topnav = <Profile whenClicked={this.logout.bind(this)} current_user={this.state.current_user}/>;
    }
// ...........

    return (
      <div className='col-md-12 page-container'>
        {topnav}
        <div className="col-md-6 col-md-offset-4">
          <img src="http://i.imgur.com/LHkPdtS.png" className="landing-logo img-responsive mx-auto" />
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
