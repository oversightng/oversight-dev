import React from 'react';
import Loader from 'react-loader';
import Dialog from 'material-ui/Dialog';
import ReactStars from 'react-stars';
import RaisedButton from 'material-ui/RaisedButton';
import { toast } from 'react-toastify';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { withRouter } from 'react-router-dom';

const shareUrl = 'http://priincetech.com';

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
      childVisible: false,
      loaded: true,
    };
  }

  resendLink(){
    this.setState({
      loaded: false,
    });
    console.log('Resend link clicked');
    const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/resend';
    return fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('email'),
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      if(!data.success) {
        toast('Resend link was unsuccessful');
      }
      else {
        toast("Email Verification link was sent Successfully");
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
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
    const url = `https://oversight-ws.herokuapp.com/api/politicians/${id}/rating`;
    this.setState({
      rating: rate,
    }, () => {
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
        if (!data.success) {
          toast("Rating was not sent");
        } else {
          toast("Rating has been sent");
        }
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
    });
  }

  handleProfileClick(id) {
    console.log('fullprofile clicked');
    console.log(id);
    this.props.history.push(`/profile/${id}`);
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
    if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null) {
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
        edit={false}
      />;
    } else {
      averageRating =
      <ReactStars
        count={5}
        value={this.props.averageRating}
        size={18}
        color2={'#ffd700'}
        edit={false}
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
            <p className="card-state"><b>{this.props.state}</b></p>
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
              <Loader loaded={this.state.loaded} className="loader" lines={15} length={5} width={3} radius={30}
                corners={1} rotate={0} direction={1} color="green" speed={3}
                trail={60} shadow={false} hwaccel={false} className="spinner"
                zIndex={2e9}>
              </Loader>
              {
                localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === null ? (
                  <p className="rating-cont">Rate Politician: <p className="login-to-rate"> Login to rate </p></p>
                ) : !this.props.verified ? (
                  <p className="card-dob"><p className="login-to-rate"> Please Verify Account to view rating. Check your mail or <a onClick={this.resendLink.bind(this)}> Resend Verification link</a> </p></p>
                ) : (
                  <p className="rating-cont">Rate Politician: {myrating}</p>
                )
              }
              {
                localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === null ? (
                  <p className="rating-cont">Avg:<p className="login-to-rate"> Login to view rating </p></p>
                ) : !this.props.verified ? (
                  <p className="card-dob"><p className="login-to-rate"> Please Verify Account to view rating. Check your mail or <a onClick={this.resendLink.bind(this)}> Resend Verification link</a> </p></p>
                ) : (
                  <p className="rating-cont">Avg: {averageRating}</p>
                )
              }
              <p><RaisedButton label="More" onClick={this.handleProfileClick.bind(this, this.props.id)}/></p>
            </ul>
            <FacebookShareButton url={shareUrl} />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(ProfileCard);
