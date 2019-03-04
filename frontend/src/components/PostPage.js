import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { handleReceivePosts } from '../actions/posts'
import Grid from '@material-ui/core/Grid';
import PostCard from '../components/PostCard';

const styles = theme => ({
  gridContainer:{
      padding: 20
  },
});


class PostPage extends Component {

  componentDidMount(){
    const { id, category } = this.props;
    id!== undefined && (
      this.props.dispatch(handleReceivePosts(category))
    );
  }

  render() {
    const { classes, category, id, post }  = this.props;

return (
  <div>
      <Grid container spacing={24} className={classes.gridContainer}>
            <Grid key={id} item xs={12} sm={12} lg={12} xl={12}>                    
            {post.id && (
              <PostCard post={post} />
            )}
        </Grid>
      </Grid>     
  </div>
    )
  }
}

function mapStateToProps( {posts, loading}, props){
 
  const { id , category} = props.match.params;  

  if(posts[id] === undefined){
    return {
      post: {},
      category,
      id
    }
  }
  const post = posts[id];

  return { 
    post,
    category,
    id
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PostPage))

