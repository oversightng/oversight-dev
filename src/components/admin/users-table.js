import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import { ToastContainer, toast } from 'react-toastify';

const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/users';

const styles = {
  customWidth: {
    width: 200,
  },
};

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: '',
      value: 1,
    };
  }

  componentDidMount() {
    return fetch(REQUEST_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json,
        });
      });
  }

  updateUser() {
    return fetch(REQUEST_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(response => response.json())
      .then((json) => {
        this.setState({
          data: json,
          showDialog: false,
        });
      });
  }

  handleUserInput(s) {
    this.setState({
      input: s,
    })
  }

  handleChange = (event, index, value) => this.setState({value});

  makeAdmin(id) {
    const make_admin_url = `https://oversight-ws.herokuapp.com/api/users/${id}?role=admin`;
    return fetch(make_admin_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(response => response.json())
      .then((json) => {
        this.setState({
          data: json,
          showDialog: false,
        });
      });
  }

  deleteUser(id) {
    const url = `https://oversight-ws.herokuapp.com/api/users/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then((res) => {
      if (res.success) {
        toast('User not deleted');
      } else {
        // window.location.reload();
        toast('User deleted');
      }
    });
  }

  render() {
    const searchStyle = {
      color: '#3c763d',
      // display: 'none',
      floatingLabelFocusStyle: {
        color: '#3c763d',
      },
    };
    const mapped_data = this.state.data.map((p) => {
      return p.email.toLowerCase();
    });
    const tablerow = this.state.data.map(p => {
      return (
        <tr key={p._id}>
          <td>{p.email}</td>
          <td><a onClick={this.makeAdmin.bind(this, p._id)}>Make Admin</a></td>
          <td><a onClick={this.deleteUser.bind(this, p._id)}>X</a></td>
        </tr>
      );
    });
    return (
      <div className="col-md-9 admin-table">
        <ToastContainer />
        <AutoComplete
          className="search-input"
          style={searchStyle}
          floatingLabelText="Search User"
          filter={AutoComplete.fuzzyFilter}
          dataSource={mapped_data}
          maxSearchResults={5}
          onUpdateInput={this.handleUserInput.bind(this)}
          onChange={this.handleChange.bind(this)}
          underlineStyle={searchStyle}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tablerow}
          </tbody>
        </table>
      </div>
    );
  }
}
export default UsersTable;
