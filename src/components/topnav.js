import React from 'react';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import Register from './register';
import SignIn from './signin';
import styles from './styles';

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="col-md-12 topnav-container">
        <span><img alt="logo thumbnail" src="https://i.imgur.com/smX5Xaw.png" className="logo-thumb" /></span>
        <div style={styles.topnavIcons}>
          <div className="float-left">
            <FontIcon className="material-icons nav-icon" onClick={this.handleOpen.bind(this)}>help</FontIcon>
            <p className="about_img_description">About us</p>
          </div>
          <Register login={this.props.login.bind(this)} />
          <SignIn login={this.props.login.bind(this)} />
        </div>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div>
            <img className="about-img-size" src="http://oi67.tinypic.com/tybl.jpg" />
          </div>
        </Dialog>
      </div>
    );
  }
}
export default TopNav;
