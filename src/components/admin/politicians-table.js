import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import UpdatePolitician from './update-politician';


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
      avatar: [],
      name: '',
      state: '',
      dob: new Date(),
      sex: 1,
      lga: '',
      current_post: { title: '', from: '' },
      portfolio: { title: '', from: '', to: '' },
      current_party: { name: '', from: '' },
      party_history: { name: '', from: '', to: '' },
      wiki: '',
      currently_serving: 1,
      date: new Date(),
      imagePreviewUrl: '',
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
  }

  handleClose() {
    this.setState({ open: false });
  }
/* Politician form handlers */
  handleName(e) {
    this.setState({ name: e.target.value });
  }
  handleAvatar(e) {
    console.log('upload avatar function');
    console.log(e.target.files);
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = function(ee) {
      this.setState({avatar: ee.target.files[0]});
      console.log(ee);
    }.bind(this);

    // this.setState({
    //   avatar: e.target.files[0],
    // });
    console.log(this.state.avatar);
  }
  handleState(e) {
    this.setState({ state: e.target.value });
  }
  handleDob(nil, e) {
    this.setState({ dob: e });
    // this.setState({ dob: e.target.value });
    // console.log(this.state.dob);
    console.log(this.state.dob);
  }
  handleSex(e, i, v) {
    this.setState({ sex: v });
  }
  handleLga(e) {
    this.setState({ lga: e.target.value });
  }
  handleCurrentPostTitle(e) {
    const currentPost = Object.assign({}, this.state.current_post);
    this.setState({ current_post: { title: e.target.value, from: this.state.current_post.from } });
    console.log(currentPost);
  }
  handlePortfolioTitle(e) {
    const portfolio = Object.assign({}, this.state.portfolio);
    this.setState({ portfolio: { title: e.target.value, from: '', to: '' } });
    console.log(portfolio);
  }
  handleCurrentPartyName(e) {
    const currentParty = Object.assign({}, this.state.current_party);
    this.setState({ current_party: { name: e.target.value, from: '' } });
    console.log(currentParty);
  }
  handlePartyHistoryName(e) {
    const partyHistory = Object.assign({}, this.state.party_history);
    this.setState({ current_party: { name: e.target.value, from: '', to: '' } });
    console.log(partyHistory);
  }
  handleWiki(e) {
    this.setState({ wiki: e.target.value });
  }
  handleCurrentlyServing(e, i, v) {
    this.setState({ currently_serving: v });
  }

  handleUserInput(s) {
    this.setState({
      input: s,
    });
  }
  handleChange = (event, index, value) => this.setState({ value });

  handleSubmit() {
    console.log(this.state.avatar);
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: this.state.name,
        avatar: this.state.avatar,
        state: this.state.state,
        dob: this.state.dob,
        sex: this.state.sex,
        lga: this.state.lga,
        current_post: { title: this.state.current_post.title },
        portfolio: { title: this.state.portfolio.title },
        current_party: { name: this.state.current_party.name },
        party_history: { name: this.state.party_history.name },
        wiki: this.state.wiki,
        currently_serving: this.state.currently_serving
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      console.log('JSON response:', data);
      console.log(REQUEST_URL);
      if(!data.success) {
        toast('Adding Politician was unsuccessful pls try again and fill all forms');
      }
      else {
        toast("Politician Added Successfully");
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

    this.setState({
      name: '',
      avatar: '',
      state: '',
      dob: new Date(),
      sex: '',
      lga: '',
      current_post: { title: '', from: '' },
      current_party: { name: '', from: '' },
      wiki: '',
      currently_serving: '',
    });
  }

  deletePolitician(id) {
    const url = `https://oversight-ws.herokuapp.com/api/politicians/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then((res) => {
      if (res.success) {
        toast('Politician not deleted');
      } else {
        window.location.reload();
        toast('Politician deleted');
      }
    });
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="Politicain Avatar" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

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

    const tablerows = filtered.map((p, key) => {
      return (
        <tr key={p._id}>
          <td>{p.name || 'No data'}</td>
          <td>{p.state || 'No data'}</td>
          <td>{p.current_post.title || 'No data'}</td>
          <td>{p.rating.average || 'No data'}</td>
          <UpdatePolitician
            _id={p._id}
            name={p.name}
            state={p.state}
            dob={p.dob}
            sex={p.sex}
            lga={p.lga}
            current_post={p.current_post.title}
            portfolio={p.portfolio.title}
            current_party={p.current_party.name}
            party_history={p.party_history.name}
            wiki={p.wiki}
            currently_serving={p.currently_serving}
            avatar={p.avatar}
          />
          <td></td>
          <td><a onClick={this.deletePolitician.bind(this, p._id)}>delete</a></td>
        </tr>
      );
    });

    return (
      <div className="col-md-9 admin-table">
        <ToastContainer />
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
          <div className="col-md-4">
            <TextField
              hintText="Name"
              value={this.state.name}
              onChange={this.handleName.bind(this)}
              className="text-field"
              required
            /><br />
            <TextField
              hintText="State"
              value={this.state.state}
              onChange={this.handleState.bind(this)}
              className="text-field"
            /><br />
            <DatePicker
              hintText="Date of Birth"
              openToYearSelection={true}
              onChange={this.handleDob.bind(this)}
            /><br />
            <DropDownMenu value={this.state.sex} onChange={this.handleSex.bind(this)}>
              <MenuItem label="Sex" value={1} primaryText="Male" />
              <MenuItem value={2} primaryText="Female" />
            </DropDownMenu>
            <TextField
              hintText="LGA"
              value={this.state.lga}
              onChange={this.handleLga.bind(this)}
              className="text-field"
              required
            /><br />
            <TextField
              hintText="Current Post"
              value={this.state.current_post.title}
              onChange={this.handleCurrentPostTitle.bind(this)}
              className="text-field"
            /><br />
          </div>
          <div className="col-md-8">
            <TextField
              hintText="Previous Post"
              value={this.state.current_post.from}
              onChange={this.handlePortfolioTitle.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Current Party"
              value={this.state.current_party.name}
              onChange={this.handleCurrentPartyName.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Previous Party"
              value={this.state.current_party.from}
              onChange={this.handlePreviousPartyName.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Wikipedia url"
              value={this.state.wiki}
              onChange={this.handleWiki.bind(this)}
              className="text-field"
            /><br />
            <DropDownMenu value={this.state.currently_serving} onChange={this.handleCurrentlyServing.bind(this)}>
              <MenuItem label="Currently Serving?" value={1} primaryText="True" />
              <MenuItem value={2} primaryText="False" />
            </DropDownMenu>
            <TextField
              type="file"
              value={this.state.avatar}
              onChange={this.handleAvatar.bind(this)}
              className="text-field"
            /><br />
            <div className="imgPreview">
              {$imagePreview}
            </div><br />
          </div>
        </Dialog>
        <button className="btn btn-success add-politician-btn" onClick={this.handleOpen.bind(this)}>
          Add Politician +
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>Position</th>
              <th>Rating</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tablerows}
          </tbody>
        </table>
      </div>
    );
  }
}
export default PoliticiansTable;
