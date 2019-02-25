import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

export class PostsList extends Component {
  render() {

    const posts = this.props.posts;
    console.log(posts);

    return (
      <div>
        POSTS   
          
      </div>
    )
  }
}

export default PostsList
