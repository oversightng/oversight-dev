import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

const url = 'https://oversight-ws.herokuapp.com/api/reset-password';

class resetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newpassword: '',
      confirmpassword: '',
    };
  }

  submitPassword(e) {
    e.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword: this.state.newpassword,
        confirmPassword: this.state.confirmpassword,
        token: 'token',
      }),
    })
    .then(response => response.json())
    .then(function(data){
      if (!data.success){
        toast('New password was not reset, Please try again');
      } else {
        toast('Your password has been reset');
      }
    })
    .catch(function(error){
      toast('An error occured Please try again');
    });
    this.setState({
      email: '',
    });
  }

  reload() {
    this.props.history.push('/');
  }

  handleNewPassword(e) {
    this.setState({ newpassword: e.target.value });
  }

  handleConfirmPassword(e) {
    this.setState({ confirmpassword: e.target.value });
  }

  render() {
    const emailer = (
      <div>
        <form>
          <input
            type="password"
            placeholder="New Password"
            value={this.state.newpassword}
            onChange={this.handleNewPassword.bind(this)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirmpassword}
            onChange={this.handleConfirmPassword.bind(this)}
          />
          <button className="btn btn-default" type="submit" onClick={this.submitPassword.bind(this)}> Submit </button>
        </form>
      </div>
    );

    return (
      <MuiThemeProvider>
        <div id="full-profile">
          <ToastContainer />
          <FontIcon className="material-icons clear-icon" onClick={this.reload.bind(this)}>clear</FontIcon>
            <div className="col-md-6 col-md-offset-3 auth-box">
              <div className="col-md-6 col-md-offset-3">
                <a href="http://oversight.ng"><img src="http://oi64.tinypic.com/oa6kax.jpg"/></a>
              </div>
              <div className="col-md-12 auth-label">
                Reset Password? <p> Please type new password </p>
              </div>
              <div className="col-md-12">
                {emailer}
              </div>
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(resetPassword);
