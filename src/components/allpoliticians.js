import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import { SplitButton, MenuItem } from 'react-bootstrap';
import ProfileCard from './profilecard';

const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/politicians';

class AllPoliticians extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: '',
      searchText: '',
    };
  }

  componentDidMount(){
    return fetch(REQUEST_URL)
      .then((response) => response.json() )
        .then((json) => {
            this.setState({
              data: json,
              showDialog: false,
            });
          })
          .catch((error) => {
            console.error(error);
          });
  }

  handleUserInput(s) {
    this.setState({
      input: s,
    })
  }

  handleChange() {
    this.setState({
      searchText: searchText
    })
    this.props.onUserInput(this.refs.filterTextInput.value);
  }

  render() {
    const title = 'Filter Politicians';
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

    const politicians = filtered.map((politician, key) => {
      return (
        <div key={politician._id} className="all-politicians-card">
          <ProfileCard
            name={politician.name}
            avatar={politician.avatar}
            post={politician.current_post.title}
            state={politician.state}
            dob={politician.dob}
            party={politician.party}
            // loggedin={this.props.loggedin}
          />
        </div>
      );
    });

    return (
      <MuiThemeProvider>
        <div className="col-md-12">
          <div clasName="col-md-12">
            <div className="col-md-3">
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
            </div>
            <div className="col-md-2 row margintop">
              <SplitButton id="23" title={title} className="filter-dropdown">
                <MenuItem eventKey="1">APC</MenuItem>
                <MenuItem eventKey="2">PDP</MenuItem>
                <MenuItem eventKey="4">North East</MenuItem>
                <MenuItem eventKey="4">North West</MenuItem>
                <MenuItem eventKey="4">Middle Belt</MenuItem>
                <MenuItem eventKey="4">South East</MenuItem>
                <MenuItem eventKey="4">South West</MenuItem>
                <MenuItem eventKey="4">South South</MenuItem>
              </SplitButton>
            </div>
            <div className="col-md-7 margintop-2">
              <ul className="menu-item">
                <li><a href="/">Home</a></li>
                <li>Rated Politicians</li>
                <li>Unrated Politicians</li>
              </ul>
            </div>
          </div>
          <div className="col-md-12">
            {politicians}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AllPoliticians;
