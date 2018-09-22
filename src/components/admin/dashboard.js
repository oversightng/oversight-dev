import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politicians: '',
      users: '',
    };
  }

  componentDidMount() {
    const reqPoliticians = 'https://oversight-ws.herokuapp.com/api/politicians';
    const reqUsers = 'https://oversight-ws.herokuapp.com/api/users';

    fetch(reqPoliticians)
      .then(response => response.json())
        .then((json) => {
          this.setState({
            politicians: json.length,
            showDialog: false,
          });
        });
    fetch(reqUsers, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
        .then((json) => {
          this.setState({
            users: json.length,
            showDialog: false,
          });
        });
  }

  render() {
    return (
      <div className="col-md-9 admin-table">
        <ToastContainer />
        <div className="col-md-12">
          <div className="col-md-4 dashboard-card">
            <h4>Total Politicians: {this.state.politicians}</h4>
            <p></p>
          </div>
          <div className="col-md-2">

          </div>
          <div className="col-md-4 dashboard-card">
            <h4>Total Users: {this.state.users} </h4>
          </div>
        </div>
        <div className="col-md-12">

        </div>
      </div>
    );
  }
}
export default Dashboard;
