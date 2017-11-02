import React from 'react';
import Dialog from 'material-ui/Dialog';
// import StarRating from 'react-star-rating';
import Rating from 'react-rating';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showTab: false,
      clicked: false,
      selected: '',
      showProjects: false,
      showLegalCases: false,
      showBudget: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleClick(selected) {
    this.setState({ selected: selected });
    if (selected === 'projects') {
      this.setState({
        showProjects: true,
        showLegalCases: false,
        showBudget: false,
      });
    } else if (selected === 'cases') {
      this.setState({
        showLegalCases: true,
        showProjects: false,
        showBudget: false,
      });
    } else if (selected === 'budget') {
      this.setState({
        showBudget: true,
        showLegalCases: false,
        showProjects: false,
      });
    }
  }

  isActive(selected) {
    return ((selected === this.state.selected) ? 'active' : 'default');
  }

  handleRatingClick(e, data) {
      alert('You left a ' + data.rating + ' star rating for ' + data.caption);
  }

  render() {
    const bgimg = {
      backgroundImage: 'url(' + this.props.avatar  + ')',
    };

// Loggedin Rate input display
    let rate;
    if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ) {
      rate = null;
    } else {
      rate = <p className="rate-tab"><i>Your rating:</i> <input className="rate-input" placeholder="0" />% </p>;
    }
// ..........

// Loggedin Your Rating display
    let myrating;
    if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ) {
      myrating = null;
    } else {
      myrating = <Rating />;
    }

// ..........

    return (
      <div>
        <div className="card-container" onClick={this.handleOpen.bind(this)}>
          <div className="card-img" style={bgimg}>
          </div>
          <div className="card-details">
            <p className="card-name">{this.props.name}</p>
            <p className="card-post">{this.props.post}</p>
            <p className="card-state">{this.props.state}</p>
            <p className="card-dob">Age: {this.props.dob} <span>80%</span></p>
          </div>
        </div>
        <Dialog
          title={this.props.name}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div className="col-md-4 image-cont">
            <div className="politician-circle-img" style={bgimg}></div>
            <p className="card-age">Age: 54</p>
            <p className="card-post font-big">Senate President</p>
          </div>
          <div className="col-md-3 image-map">
            <img src="https://imgur.com/ws4j90c"></img>
          </div>
          <div className="col-md-5 info-cont">
            <ul>
              <li>Name: <b>{this.props.name}</b></li>
              <li>Post: <b>{this.props.post}</b></li>
              <li>State: <b>{this.props.state}</b></li>
              <li>DOB: <b>{this.props.dob}</b></li>
              <li>Party: <b>{this.props.party}</b></li>
              {myrating}
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ProfileCard;
