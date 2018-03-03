import React from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles';

class Profile extends React.Component{

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.reload();
  }

  render() {
    return (
      <div className="col-md-12">
        <span><img alt="logo thumbnail" src="https://i.imgur.com/smX5Xaw.png" className="logo-thumb" /></span>
        <div style={styles.topnavIcons} className="float-left">
          <SplitButton id="23" title={localStorage.getItem('email')}>
            <MenuItem eventKey="1" href="/oversight-dev/admin">Admin Page</MenuItem>
            <MenuItem eventKey="2" href="/oversight-dev/all">All Politicians</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4" onClick={this.logout.bind(this)}>Logout</MenuItem>
          </SplitButton>
        </div>
      </div>
    );
  }
}
export default Profile;
