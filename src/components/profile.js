import React from 'react';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import styles from './styles';


class Profile extends React.Component {

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
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Admin Page" href="/oversight-dev/admin" />
            <MenuItem primaryText="All Politicians" href="/oversight-dev/all" />
            <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)} />
          </IconMenu>
        </div>
      </div>
    );
  }
}
export default Profile;
