import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ToastContainer, toast } from 'react-toastify';
import PoliticiansTable from './admin/politicians-table';
import UsersTable from './admin/users-table';
import Dashboard from './admin/dashboard';
import Settings from './admin/settings';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'dashboard',
    };
  }

  showPoliticians() {
    this.setState({
      show: 'politicians',
    })
  }

  showUsers() {
    this.setState({
      show: 'users',
    })
  }

  showDashboard() {
    this.setState({
      show: 'dashboard',
    })
  }

  showSettings() {
    this.setState({
      show: 'settings',
    })
  }

  render() {
    let tableDisplay = null;
    if (this.state.show === 'politicians') {
      tableDisplay = <PoliticiansTable />;
    } else if (this.state.show === 'users') {
      tableDisplay = <UsersTable />;
    } else if (this.state.show === 'dashboard') {
      tableDisplay = <Dashboard />;
    } else if (this.state.show === 'settings') {
      tableDisplay = <Settings />;
    }

    return (
      <MuiThemeProvider>
        <div className="admin-cont col-md-12">
          <div className="sidebar row col-md-3">
            <ToastContainer />
            <ul className="sidebar-cont">
              <li><a href="/oversight-rate"><img src="http://oi64.tinypic.com/oa6kax.jpg"/></a></li>
              <li onClick={this.showDashboard.bind(this)} >Dashboard</li>
              <li onClick={this.showPoliticians.bind(this)} >Politicians</li>
              <li onClick={this.showUsers.bind(this)} >Users</li>
              <li onClick={this.showSettings.bind(this)} >Settings</li>
            </ul>
          </div>

          {tableDisplay}

        </div>
      </MuiThemeProvider>
    );
  }
}
export default Admin;
