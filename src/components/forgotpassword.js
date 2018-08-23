import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

const url = 'https://oversight-ws.herokuapp.com/api/forgot-password';

class forgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  submitEmail(e) {
    e.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
    .then(response => response.json())
    .then(function(data){
      if (!data.success){
        toast('email not recognized in our database');
      } else {
        toast('Reset password link sent to your mail');
      }
    })
    .catch(function(error){
      toast('An error occured pls try again');
    });
    this.setState({
      email: '',
    });
  }

  reload() {
    this.props.history.push('/oversight-dev');
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    const emailer = (
      <div>
        <form>
          <input
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleEmail.bind(this)}
          />
          <button className="btn btn-default" type="submit" onClick={this.submitEmail.bind(this)}> Submit </button>
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
                Forgot Password? <p> Please provide your email </p>
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

export default withRouter(forgotPassword);
