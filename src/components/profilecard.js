import React from 'react';
import Dialog from 'material-ui/Dialog';
import ReactStars from 'react-stars'

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
      rating: '',
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleRating() {
    this.setState({ rating: 2 })
    // console.log(this.state.rating);
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

  getAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  isActive(selected) {
    return ((selected === this.state.selected) ? 'active' : 'default');
  }

  submitRating(id, rate) {
    console.log(id);
    const url = `https://oversight-ws.herokuapp.com/api/politicians/${id}/rating`;
    console.log(url);
    this.setState({
      rating: rate,
    }, () => {
      console.log(this.state.rating);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          rating: this.state.rating,
        }),
      })
      .then(response => response.json())
      .then(function (data) {
        console.log('JSON response:', data);
        if (!data.success) {
          alert("Rating was not sent " + data.message)
        } else {
          alert("Rating has been sent " + data.message);
        }
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
    });
  }

  render() {
    const bgimg = {
      backgroundImage: 'url(' + this.props.avatar  + ')',
    };

    const ratingChanged = (newRating) => {
      console.log(newRating)
    }

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
      myrating =
      <ReactStars
        count={5}
        onChange={this.submitRating.bind(this, this.props.id)}
        size={18}
        value={this.state.rating}
        color2={'#ffd700'}
      />;
    }

// Loggedin Your Rating display
    let averageRating;
    if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ) {
      averageRating =
      <ReactStars
        count={5}
        value={this.props.averageRating}
        size={18}
        color2={'#ffd700'}
      />;
    } else {
      averageRating =
      <ReactStars
        count={5}
        value={this.props.averageRating}
        size={18}
        color2={'#ffd700'}
      />;
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
            <p className="card-state">State of Origin: <b>{this.props.state}</b></p>
            <p className="card-dob">{averageRating}</p>
          </div>
        </div>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div className="image-cont">
            <div className="img-wrap">
              <div className="politician-circle-img" style={bgimg}></div>
            </div>
            <p className="card-post green font-big">{this.props.name}</p>
            <p className="font-big">{this.props.post}</p>
          </div>
          <div className="info-cont">
            <ul>
              <li>State: <b>{this.props.state}</b></li>
              <li>Age: <b>{this.getAge(this.props.dob)}</b></li>
              <li>Party: <b>{this.props.party}</b></li>
              <p className="rating-cont">Rate Politician: {myrating}</p>
              <p className="rating-cont">Avg: {averageRating}</p>
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ProfileCard;
