import React from 'react';
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
      .then((response) => response.json() )
        .then((json) => {
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

  render() {
    const bgimg = {
      backgroundImage: 'url(' + this.state.profile.avatar  + ')',
    };

    // let averageRating;
    // if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ) {
    //   averageRating =
    //   <ReactStars
    //     count={5}
    //     value={this.state.profile.rating.average}
    //     size={18}
    //     color2={'#ffd700'}
    //     edit={false}
    //   />;
    // } else {
    //   averageRating =
    //   <ReactStars
    //     count={5}
    //     value={this.state.profile.rating.average}
    //     size={18}
    //     color2={'#ffd700'}
    //     edit={false}
    //   />;
    // }

    return (
      <MuiThemeProvider>
        <div id="full-profile">
          <div className="full-profile-container">
            <div className="fullprofile-img-cont">
              <div className="full-profile-img" style={bgimg} />
            </div>
            <FontIcon className="material-icons clear-icon" onClick={this.reload.bind(this)}>clear</FontIcon>
            <div className="fullprofile-details-cont">
              <div className="all-card-details">
                <p className="all-card-name">{this.state.profile.name}</p>
                <p className="all-card-post">{this.state.profile.post}</p>
                <p className="all-card-state"><b>{this.state.profile.state}</b></p>
                <p className="fullprofile-rating">{this.state.profile.rating}</p>
              </div>
            </div>
          </div>
          <div className="comments-container">
            <Comments politician_id={this.props.match.params.id} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(fullPage);
