import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { ToastContainer, toast } from 'react-toastify';

class UpdatePolitician extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      input: '',
      open: false,
      name: '',
      avatar: '',
      state: '',
      dob: new Date(),
      sex: 1,
      lga: '',
      current_post: { title: '', from: '' },
      current_party: { name: '', from: '' },
      wiki: '',
      currently_serving: 1,
      date: new Date(),
      imagePreviewUrl: '',
    }
  }

  handleSubmit() {
    const url = `https://oversight-ws.herokuapp.com/api/politicians/${id}`;
    fetch(url, {
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
        current_post: { title: this.state.current_post.title, from: this.state.current_post.from },
        current_party: { name: this.state.current_party.name, from: this.state.current_party.from },
        wiki: this.state.wiki,
        currently_serving: this.state.currently_serving
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      if(!data.success) {
        toast('Updating Politician was unsuccessful pls try again and fill all forms');
      }
      else {
        toast("Politician Updated Successfully");
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
    e.preventDefault();
    this.setState({ avatar: e.target.value });

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatar: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
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
  handleCurrentPostFrom(e) {
    const currentPost = Object.assign({}, this.state.current_post);
    this.setState({ current_post: { title: this.state.current_post.title, from: e.target.value } });
    console.log(currentPost);
  }
  handleCurrentPartyName(e) {
    const currentParty = Object.assign({}, this.state.current_party);
    this.setState({ current_party: { name: e.target.value, from: this.state.current_party.from } });
    console.log(currentParty);
  }
  handleCurrentPartyFrom(e) {
    const currentParty = Object.assign({}, this.state.current_party);
    this.setState({ current_party: { name: this.state.current_party.name, from: e.target.value } });
    console.log(currentParty);
  }
  handleWiki(e) {
    this.setState({ wiki: e.target.value });
  }
  handleCurrentlyServing(e, i, v) {
    this.setState({ currently_serving: v });
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="Politicain Avatar" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

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

    return (
      <div className="edit-politician-cont">
        <Dialog
          title="Update Politician"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div className="col-md-4">
            <TextField
              hintText="Name"
              value={this.props.name}
              onChange={this.handleName.bind(this)}
              className="text-field"
              required
            /><br />
            <TextField
              hintText="State"
              value={this.props.state}
              onChange={this.handleState.bind(this)}
              className="text-field"
            /><br />
            <DatePicker
              hintText="Date of Birth"
              openToYearSelection={true}
              onChange={this.handleDob.bind(this)}
            /><br />
            <DropDownMenu value={this.props.sex} onChange={this.handleSex.bind(this)}>
              <MenuItem label="Sex" value={1} primaryText="Male" />
              <MenuItem value={2} primaryText="Female" />
            </DropDownMenu>
            <TextField
              hintText="LGA"
              value={this.props.lga}
              onChange={this.handleLga.bind(this)}
              className="text-field"
              required
            /><br />
            <TextField
              hintText="Current Post"
              value={this.props.current_post}
              onChange={this.handleCurrentPostTitle.bind(this)}
              className="text-field"
            /><br />
          </div>
          <div className="col-md-8">
            <TextField
              hintText="Previous Post"
              value={this.props.previous_post}
              onChange={this.handleCurrentPostFrom.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Current Party"
              value={this.props.current_party}
              onChange={this.handleCurrentPartyName.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Previous Party"
              value={this.props.previous_party}
              onChange={this.handleCurrentPartyFrom.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Wikipedia url"
              value={this.props.wiki}
              onChange={this.handleWiki.bind(this)}
              className="text-field"
            /><br />
            <DropDownMenu value={this.props.currently_serving} onChange={this.handleCurrentlyServing.bind(this)}>
              <MenuItem label="Currently Serving?" value={1} primaryText="True" />
              <MenuItem value={2} primaryText="False" />
            </DropDownMenu>
            <TextField
              type="file"
              value={this.props.avatar}
              onChange={this.handleAvatar.bind(this)}
              className="text-field"
            /><br />
            <div className="imgPreview">
              {$imagePreview}
            </div><br />
          </div>
        </Dialog>
        <a onClick={this.handleOpen.bind(this)}>
          Edit
        </a>
      </div>
    );
  }
}
export default UpdatePolitician;
