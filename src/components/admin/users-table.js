import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

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
          <td>{p.password}</td>
          <td>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Subscriber" />
              <MenuItem value={2} primaryText="Contributor" />
              <MenuItem value={3} primaryText="Admin" />
            </DropDownMenu>
          </td>
          <td><a>X</a></td>
        </tr>
      );
    });
    return (
      <div className="col-md-9 admin-table">
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
              <th>Role</th>
              <th>Delete</th>
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
