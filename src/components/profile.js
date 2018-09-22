import React from 'react';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import styles from './styles';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
    };
  }

  componentDidMount() {
    const url = 'https://oversight-ws.herokuapp.com/api/admin';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(response => response.json())
    .then(function (data) {
      if (!data.success) {
        console.log('user isnt an admin');
      } else {
        console.log('user is an admin');
        this.setState({
          admin: true,
        });
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    window.location.reload();
  }

  render() {
    return (
      <div className="col-md-12 topnav-container">
        <span><a href="http://oversight.ng"> <img alt="logo thumbnail" src="https://i.imgur.com/smX5Xaw.png" className="logo-thumb" /></a></span>
        <div style={styles.topnavIcons} className="float-left icon-menu">
          <div className="welcome-span"> Welcome {localStorage.getItem('name')}</div>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            {
              this.state.admin ? (
                <MenuItem primaryText="Admin Page" href="/oversight-rate/admin" />
              ) : (
                <MenuItem primaryText="Edit Profile" href="/oversight-rate/edit-profile" />
              )
            }
            <MenuItem primaryText="All Politicians" href="/oversight-rate/all" />
            <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)} />
          </IconMenu>
        </div>
      </div>
    );
  }
}
export default Profile;
