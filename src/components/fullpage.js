import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactStars from 'react-stars';


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

  render() {
    const bgimg = {
      backgroundImage: 'url(' + this.props.avatar  + ')',
    };

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
            <div className="full-profile-img" style={bgimg}>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg>
            <div className="all-card-details">
              <p className="all-card-name">{this.props.name}</p>
              <p className="all-card-post">{this.props.post}</p>
              <p className="all-card-state"><b>{this.props.state}</b></p>
              <p className="card-dob">{averageRating}</p>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default fullPage;
