import React from 'react';
import Loader from 'react-loader';
import { ToastContainer, toast } from 'react-toastify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';


const url = 'https://oversight-ws.herokuapp.com/api/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loaded: true,
    };
  }

  handleSubmit(e) {
    this.setState({
      loaded: true,
    });
    e.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      localStorage.setItem('user', data.ratings)
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.user.id);
      localStorage.setItem('name', data.user.firstName);
      localStorage.setItem('email', data.user.email);

      if (!data.success) {
        toast('Wrong login details');
      } else {
        toast('Successfully logged in', {
          onOpen: ({ foo }) => console.log('open'),
          onClose: ({ foo }) => console.log('close')
        });
      }
    })
    .catch(function (error) {
      toast('Request failed');
      console.log('Request failed', error);
    });

    this.setState({
      email: '',
      password: '',
    });
  }

  reload() {
    this.props.history.push('/');
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    let login;
    if (localStorage.getItem('email')) {
      login = <p>You are logged in <p><a href="/oversight-rate">Back to Oversight</a></p></p>
    } else {
      login = (
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleEmail.bind(this)}
            />
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
            />
            <button className="button" type="submit">Log in</button>
          </form>
          <p>Don't have an account? <a href="/oversight-rate/register"><b>Register</b></a></p>
          <p><a href="/oversight-rate/forgot-password"> Forgot Password </a> </p>
        </div>
      );
    }

    const headingStyle = {
      margintop: '20px',
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
                LOGIN
              </div>
              <div className="col-md-12">
                {login}
              </div>
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(Login);
