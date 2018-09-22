import React from 'react';
import { ToastContainer, toast } from 'react-toastify';


const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/politicians';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politicians: '',
      users: '',
    };
  }

  componentDidMount() {
    return fetch(REQUEST_URL)
      .then(response => response.json())
        .then((json) => {
          this.setState({
            data: json,
            showDialog: false,
          });
        });
  }

  render() {
    return (
      <div className="col-md-9 admin-table">
        <ToastContainer />

      </div>
    );
  }
}
export default Settings;
