import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const url = 'https://oversight-ws.herokuapp.com/api/login';

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
      window.location.reload();
      // localStorage.getItem('token')
      if(!data.success) {
        alert("There was a problem signing you in. " + data.message)
      } else {
        // alert("token =" + localStorage.getItem('token') + " : " + data.message);
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

    this.setState({
      email: '',
      password: '',
      current_username: this.state.email,
    });
  }

  handleOpen() {
    this.setState({ open: true });
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

  handleLogin() {

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
        <FontIcon className="material-icons nav-icon" onClick={this.handleOpen.bind(this)}>input</FontIcon>
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
              className="text-field"
              type="password"
            /><br />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SignIn;
