import React from 'react';
import ReactStars from 'react-stars';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/politicians';

class fullPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const fullprofile = document.getElementById("full-profile");
    document.body.appendChild(fullprofile);
  }

  reload() {
    window.location.reload();
  }

  render() {
    const bgimg = {
      backgroundImage: 'url(' + this.props.avatar  + ')',
    };

    let comments;
    if (localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ) {
      comments = "Please Log in to view comments or say something....";
    } else {
      comments =
        <TextField
          hintText="Type here.."
        />;
    }

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

    return (
      <MuiThemeProvider>
        <div id="full-profile">
          <div className="full-profile-container">
            <div className="fullprofile-img-cont">
              <div className="full-profile-img" style={bgimg}>
              </div>
            </div>
            <FontIcon className="material-icons clear-icon" onClick={this.reload.bind(this)}>clear</FontIcon>
            <div className="fullprofile-details-cont">
              <div className="all-card-details">
                <p className="all-card-name">{this.props.name}</p>
                <p className="all-card-post">{this.props.post}</p>
                <p className="all-card-state"><b>{this.props.state}</b></p>
                <p className="fullprofile-rating">{averageRating}</p>
              </div>
            </div>
          </div>
          <div className="comments-container">
            {comments}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default fullPage;
