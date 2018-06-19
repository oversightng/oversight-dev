import React from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  render() {
    return (
      <div className="comment-cont">
          <img
            alt="comment avatar"
            src="https://semantic-ui.com/images/avatar/small/joe.jpg"
            className="comment-avatar"
          />
          <input
            className="comment-name"
            placeholder="Full Name"
          />
        <br />
        <input
          type="text"
          placeholder="Write something here...."
        />

        <div className="comments-history">
          <div className="comment-item">
            <img
              alt="comment avatar"
              src="https://semantic-ui.com/images/avatar/small/joe.jpg"
              className="comment-history-avatar"
            />
            <span>John Doe</span>
            <p>I want Bfuhari tfu win tfa electian</p>
          </div>
          <div className="comment-item">
            <img
              alt="comment avatar"
              src="https://semantic-ui.com/images/avatar/small/joe.jpg"
              className="comment-history-avatar"
            />
            <span>Hillart Okomba</span>
            <p>I want everyone not to compete</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
