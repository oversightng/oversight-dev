import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';

const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/politicians';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

class PoliticiansTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: '',
      open: false,
      name: '',
      avatar: '',
      post: '',
      state: '',
      dob: '',
      party: '',
      date: new Date(),
    };
  }

componentDidMount() {
  return fetch(REQUEST_URL)
    .then(response => response.json())
      .then((json) => {
        this.setState({
          data: json,
          showDialog: false,
        });
      });
}

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleName(e) {
    this.setState({ name: e.target.value });
  }
  handleAvatar(e) {
    this.setState({ avatar: e.target.value });
  }
  handlePost(e) {
    this.setState({ post: e.target.value });
  }
  handleState(e) {
    this.setState({ state: e.target.value });
  }
  handleDob(e) {
    this.setState({ dob: e.target.value });
  }
  handleParty(e) {
    this.setState({ party: e.target.value });
  }
  handleUserInput(s) {
    this.setState({
      input: s,
    });
  }
  handleChange = (event, index, value) => this.setState({value});

  handleSubmit() {
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: this.state.name,
        avatar: this.state.avatar,
        current_post: { title: this.state.post },
        state: this.state.state,
        dob: this.state.date,
        current_party: { name: this.state.party },
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      console.log('JSON response:', data);
      console.log(REQUEST_URL);
      if(!data.success) {
        alert("There was a problem adding politician. " + data.message)
      }
      else {
        alert("Politician Added Successfully");
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

    console.log(this.state.name);
    console.log(this.state.avatar);
    console.log(this.state.post);
    console.log(this.state.state);
    console.log(this.state.dob);
    console.log(this.state.party);

    this.setState({
      name: '',
      avatar: '',
      post: '',
      state: '',
      dob: '',
      party: '',
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
      return p.name.toLowerCase();
    });
    const filtered = this.state.data.filter((p) => {
      return (p.name.toLowerCase().indexOf(this.state.input) > -1);
    });
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ];

    const tablerow = filtered.map(p => {
      return (
        <tr key={p._id}>
          <td>{p.name}</td>
          <td>{p.state}</td>
          <td>{p.current_post.title || 'none'}</td>
          <td>{p.rating}</td>
        </tr>
      );
    });

    return (
      <div className="col-md-9 admin-table">
        <AutoComplete
          className="search-input"
          style={searchStyle}
          floatingLabelText="Search Politician"
          filter={AutoComplete.fuzzyFilter}
          dataSource={mapped_data}
          maxSearchResults={5}
          onUpdateInput={this.handleUserInput.bind(this)}
          onChange={this.handleChange.bind(this)}
          underlineStyle={searchStyle}
        />
        <Dialog
          title="Add Politician"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div className="col-md-6 col-md-offset-3">
            <div className="col-md-6">
              <br />
              <TextField
                hintText="Name"
                value={this.state.name}
                onChange={this.handleName.bind(this)}
                className="text-field"
              /><br />
              <TextField
                hintText="Avatar"
                value={this.state.avatar}
                onChange={this.handleAvatar.bind(this)}
                className="text-field"
              /><br />
              <TextField
                hintText="Post"
                value={this.state.post}
                onChange={this.handlePost.bind(this)}
                className="text-field"
              /><br />
              <TextField
                hintText="State"
                value={this.state.state}
                onChange={this.handleState.bind(this)}
                className="text-field"
              /><br />
              <DatePicker
                hintText="Open to Year"
                openToYearSelection={true}
                onChange={this.handleDob.bind(this)}
              /><br />
              {/* <TextField
                hintText="Date of Birth"
                value={this.state.dob}
                onChange={this.handleDob.bind(this)}
                className="text-field"
              /><br /> */}
              <TextField
                hintText="Party"
                value={this.state.party}
                onChange={this.handleParty.bind(this)}
                className="text-field"
              /><br />
            </div>
          </div>
        </Dialog>
        <button className="btn btn-success" onClick={this.handleOpen.bind(this)} > Add Politician + </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>Position</th>
              <th>Rating</th>
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
export default PoliticiansTable;
