import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      content: '',
      politician: '',
      user: '',
    };
  }

  componentDidMount() {
    const commentsUrl = 'https://oversight-ws.herokuapp.com/api/comments';
    return fetch(commentsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          comments: json,
        });
      });
  }

  addComment(e){
    this.setState({
      content: e.target.value,
    });
  }

  submitComment(e) {
    e.preventDefault();
    const url = 'https://oversight-ws.herokuapp.com/api/comments/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        content: this.state.content,
        politician: this.props.politician_id,
        user: localStorage.getItem('id'),
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      console.log('submited');
      if(!data.success) {
        toast('Comment was not sent');
      }
      else {
        toast('Comment sent successfully');
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

    this.setState({
      content: '',
      politician: '',
      user: '',
    });
  }

  render() {
    let commentName;
    if (localStorage.getItem('email')){
      commentName = <span> {localStorage.getItem('email')} </span>
    } else {
      commentName = <span className="blinker">Pls login to comment & view comments</span>
    }

    let commentContent;
    if (localStorage.getItem('email')){
      commentContent =
      (
        <form onSubmit={this.submitComment.bind(this)}>
          <input type="text" placeholder="Write something here...." value={this.state.value} onChange={this.addComment.bind(this)} />
          <button type="submit" className="submit_button"/>
        </form>
      );
    }

    const filtered = this.state.comments.filter((c) => {
      return (c.politician === this.props.politician_id);
    });

    const commentsHistory = filtered.map((comment, key) => {
      return (
        <div key={comment._id} className="comments-history">
          <div className="comment-item">
            <img
              alt="comment avatar"
              src="https://semantic-ui.com/images/avatar/small/joe.jpg"
              className="comment-history-avatar"
            />
            <span>{comment.user.name}</span>
            <p>{comment.content}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="comment-cont">
          <img
            alt="comment avatar"
            src="https://semantic-ui.com/images/avatar/small/joe.jpg"
            className="comment-history-avatar"
          />
          <span>{commentName}</span>
        <br />
        {commentContent}
        {commentsHistory}
      </div>
    );
  }
}

export default Comments;
