import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SocialLogin from 'react-social-login';
import { ToastContainer, toast } from 'react-toastify';
import SocialButton from './SocialButton';

const url = 'https://oversight-ws.herokuapp.com/api/login';


const handleSocialLogin = (user) => {
  console.log(user)
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.state = {
      open: false,
      email: '',
      password: '',
      current_user: '',
    };
  }

  handleSubmit() {
    localStorage.setItem('email', this.state.email);
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.user.id);
      localStorage.setItem('name', data.user.firstName);
      localStorage.setItem('email', data.user.email);

      if (!data.success) {
        toast('Wrong login details');
      } else {
        toast('Successfully logged in');
        return;
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

    this.setState({
      email: '',
      password: '',
    });
  }

  handleOpen() {
    document.location.href="/oversight-dev/login";
    // this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

    return (
      <div className="float-left">
        <div className="login-icon-cont">
          <FontIcon className="material-icons nav-icon" onClick={this.handleOpen.bind(this)}>input</FontIcon>
          <p className="login_img_description">Login</p>
        </div>
        <Dialog
          title='Sign In'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div className="col-md-6 col-md-offset-3">
            <br />
            <TextField
              hintText="Email Address"
              value={this.state.email}
              onChange={this.handleEmail.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Password"
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
              className="text-field bottom-text-field"
              type="password"
            /><br />
            <p><a href="/oversight-dev/forgot-password"> Forgot Password </a> </p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SignIn;
