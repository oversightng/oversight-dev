import React from 'react';
import Loader from 'react-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

const url = `https://oversight-ws.herokuapp.com/api/users/${localStorage.getItem('id')}`;

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      loaded: true,
    };
  }

  componentDidMount(){
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.json() )
        .then((json) => {
          this.setState({
            firstname: json.firstName,
            lastname: json.lastName,
            email: json.email,
            password: json.password,
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loaded: false,
    });
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        password: this.state.password,
        email: this.state.email,
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      if(!data.success) {
        toast('Profile edit was unsuccessful '+ data.message);
      }
      else {
        toast('Profile edit successful');
        document.location.href='/edit-profile';
      }
    })
    .catch(function (error) {
      toast('Really Sorry your Request Failed, Please try again');
      console.log('Request failed', error);
    });

    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
  }

  reload() {
    this.props.history.push('/');
  }
  handleFirstname(e) {
    this.setState({ firstname: e.target.value });
  }
  handleLastname(e) {
    this.setState({ lastname: e.target.value });
  }
  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const divStyle = {
      marginBottom: '10px',
    };

    return (
      <MuiThemeProvider>
        <div id="full-profile">
          <Loader loaded={this.state.loaded} className="loader" lines={15} length={5} width={3} radius={30}
            corners={1} rotate={0} direction={1} color="green" speed={3}
            trail={60} shadow={false} hwaccel={false} className="spinner"
            zIndex={2e9}>
            <ToastContainer />
          </Loader>
          <FontIcon className="material-icons clear-icon" onClick={this.reload.bind(this)}>clear</FontIcon>
          <div className="col-md-6 col-md-offset-3 auth-box">
            <div className="col-md-6 col-md-offset-3">
              <a href="http://oversight.ng"><img src="http://oi64.tinypic.com/oa6kax.jpg"/></a>
            </div>
            <div className="col-md-12 auth-label">
              EDIT PROFILE
            </div>
            <div className="col-md-12">
              <form>
                <input
                  type="text"
                  placeholder={this.state.firstname}
                  value={this.state.firstname}
                  onChange={this.handleFirstname.bind(this)}
                  style={divStyle}
                />
                <input
                  type="text"
                  placeholder={this.state.lastname}
                  value={this.state.lastname}
                  onChange={this.handleLastname.bind(this)}
                />
                <input
                  type="email"
                  placeholder={this.state.email}
                  value={this.state.email}
                  onChange={this.handleEmail.bind(this)}
                />
                <input
                  type="password"
                  placeholder="Change Password"
                  value={this.state.password}
                  onChange={this.handlePassword.bind(this)}
                />
                <button className="button" type="submit" onClick={this.handleSubmit.bind(this)}>Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(EditProfile);
