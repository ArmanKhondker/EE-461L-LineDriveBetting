import React from "react";
import Button from "react-bootstrap/Button";
import Moment from 'react-moment';

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post">
        <p className="post-username">{this.props.username}:</p>
        <p className="post-content">{this.props.content}</p>
        <p className="post-date"><Moment>{this.props.create_date}</Moment></p>
      </div>
    )
  }
}


export default BlogPost;
