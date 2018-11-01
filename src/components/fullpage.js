import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import ReactStars from 'react-stars';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';
import Comments from './comments'

class fullPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    const REQUEST_URL = `https://oversight-ws.herokuapp.com/api/politicians/${this.props.match.params.id}`
    fetch(REQUEST_URL)
      .then((response) => response.json())
        .then((json) => {
          this.post = json.current_post.title;
          this.avg_rating = json.rating.average;
          this.current_party = json.current_party.name;
          this.previous_party = json.party_history.name;
          this.setState({
            profile: json,
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  reload() {
    this.props.history.push('/');
  }

  findstate() {
    console.log(this.state.profile.dob);
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

  render() {
    const shareUrl = `http://oversight.ng/oversight-rate/profile/${this.props.match.params.id}`;
    const bgimg = {
      backgroundImage: 'url(' + this.state.profile.avatar  + ')',
    };

    let averageRating;
    if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ) {
      averageRating =
      <ReactStars
        count={5}
        value={this.avg_rating}
        size={5}
        color2={'#ffd700'}
        edit={false}
      />;
    } else {
      averageRating =
      <ReactStars
        count={5}
        value={this.avg_rating}
        size={5}
        color2={'#ffd700'}
        edit={false}
      />;
    }

    return (
      <MuiThemeProvider>
        <div id="full-profile">
          <div className="full-profile-container">
            <div className="fullprofile-img-cont">
              <div className="full-profile-img" style={bgimg} />
            </div>
            <FontIcon className="material-icons clear-icon" onClick={this.reload.bind(this)}>clear</FontIcon>
            <div className="col-md-6 fullprofile-details-cont">
              <div className="col-md-4 all-card-details">
                <p className="full-card-name">{this.state.profile.name}</p>
                <p className="full-card-post">{this.post}</p>
                <p className="full-card-state"><b>{this.state.profile.state}</b></p>
                <p className="full-card-state"><b>Current Party: {this.current_party}</b></p>
                <p className="full-card-state"><b>Previous Party: {this.previous_party}</b></p>
                <p className="full-card-state"><b>Age: {this.getAge(this.state.profile.dob)}</b></p>
                <p className="fullprofile-rating">{averageRating}</p>
              </div>
              <div className="col-md-6">
                <a className="btn btn-default btn-large top-button"> Achievements & Awards </a> <br/>
                <a className="btn btn-default btn-large"> Career History  </a> <br/>
                <a className="btn btn-default btn-large"> Portfolio </a> <br/>
                <a className="btn btn-default btn-large"> Public Affairs </a> <br/>
              </div>
              <div className="comments-container">
                <Comments politician_id={this.props.match.params.id} />
              </div>
              <FacebookShareButton
               url={shareUrl}
               className="shareIcon2"
              >
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
               url={shareUrl}
               className="shareIcons"
              >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(fullPage);
