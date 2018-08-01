import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };
  }

  handleSubmit() {
    console.log('nnn');
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
          <FontIcon className="material-icons clear-icon" onClick={this.reload.bind(this)}>clear</FontIcon>
          <div className="col-md-6 col-md-offset-3 auth-box">
            <div className="col-md-6 col-md-offset-3">
              <a href="http://oversight.ng"><img src="http://oi64.tinypic.com/oa6kax.jpg"/></a>
            </div>
            <div className="col-md-12 auth-label">
              REGISTER
            </div>
            <div className="col-md-12">
              <form>
                <input
                  type="text"
                  placeholder="First Name"
                  value={this.state.email}
                  onChange={this.handleFirstname.bind(this)}
                  style={divStyle}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={this.state.email}
                  onChange={this.handleLastname.bind(this)}
                />
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
                <button className="button" type="submit">Register</button>
              </form>
              <p>Have an account? <a href="/login"><b>Login</b></a></p>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SignUp;
