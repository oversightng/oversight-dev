import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const url = 'https://oversight-ws.herokuapp.com/api/users';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      number: '',
      dob: '',
      state: '',
    }
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

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
  handleNumber(e) {
    this.setState({ number: e.target.value });
  }
  handleDob(e) {
    this.setState({ dob: e.target.value });
  }
  handleState(e) {
    this.setState({ state: e.target.value });
  }

  handleSubmit() {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password,
        phone: this.state.number,
        email: this.state.email,
        dob: this.state.dob,
        state: this.state.state,
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      localStorage.setItem('token', data.token);
      window.location.reload();
      // localStorage.getItem('token')
      if(!data.success) {
        alert("There was a problem registering you in. " + data.message)
      }
      else {
        alert("token =" + localStorage.getItem('token') + " : " + data.message);
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      number: '',
      dob: '',
      state: '',
    });
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
        <FontIcon className="material-icons nav-icon" onClick={this.handleOpen.bind(this)}>face</FontIcon>
        <Dialog
          title='Register'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div className='col-md-6 col-md-offset-3'>
            <br />
            <TextField
              hintText="First Name"
              value={this.state.firstname}
              onChange={this.handleFirstname.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Last Name"
              value={this.state.lastname}
              onChange={this.handleLastname.bind(this)}
              className="text-field"
            /><br />
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
            <TextField
              hintText="Phone Number"
              value={this.state.number}
              onChange={this.handleNumber.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Date of Birth"
              value={this.state.dob}
              onChange={this.handleDob.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="State"
              value={this.state.state}
              onChange={this.handleState.bind(this)}
              className="text-field"
            /><br />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default Register;