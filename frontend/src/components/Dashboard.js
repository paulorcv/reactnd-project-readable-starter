import React, { Component } from 'react'
import PostsList from '../components/PostsList'
import { connect } from 'react-redux'


export class Dashboard extends Component {
  render() {
    
    const { posts } = this.props;

    return (
      <div>
        <PostsList posts={posts} />
      </div>
    )
  }
}    
function mapStateToProps({posts}){
  return {posts}
}

export default connect(mapStateToProps)(Dashboard)
