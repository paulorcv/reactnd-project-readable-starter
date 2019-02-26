import React, { Component } from 'react'
import PostsList from '../components/PostsList'

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <PostsList posts={this.props.posts} />
      </div>
    )
  }
}    
export default Dashboard
