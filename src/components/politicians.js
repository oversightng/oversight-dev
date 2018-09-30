import React from 'react';
import Slider from 'react-slick';
import ProfileCard from './profilecard';

const settings = {
  className: 'center',
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 5,
  swipeToSlide: true,
  responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }, { breakpoint: 1024, settings: { slidesToShow: 5 } }],
  afterChange: function (index) {
    console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
  }
};

class Politicians extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      verified: false,
    };
  }

  componentDidMount() {
    const id = localStorage.getItem('id');
    const REQUEST_URL = `https://oversight-ws.herokuapp.com/api/verify?id=${id}`;
    return fetch(REQUEST_URL)
    .then((response) => response.json() )
      .then((json) => {
        console.log(json);
        if (!json.success) {
          toast("Please Verify Your Account. Link was sent to your Email")
        } else {
          this.setState({
            verified: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const politicians = this.props.politicians.map((politician, key) => {
      return (
        <div key={politician._id}>
          <ProfileCard
            id={politician._id}
            name={politician.name}
            avatar={politician.avatar}
            post={politician.current_post.title}
            state={politician.state}
            dob={politician.dob}
            party={politician.current_party.name}
            prev_party={politician.party_history.name}
            loggedin={this.props.loggedin}
            averageRating={politician.rating.average}
            verified={this.state.verified}
          />
        </div>
      );
    });

    return (
      <div className="col-md-12 politicians-container">
        {this.props.politicians.length &&
          <Slider {...settings}>
              {politicians}
          </Slider>
        }
      </div>
    );
  }
}

export default Politicians;
