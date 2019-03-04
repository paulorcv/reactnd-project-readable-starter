import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { handleReceivePosts } from '../actions/posts'
import PostCard from '../components/PostCard';


const styles = theme => ({
    button: {      
      margin: 20
    },
    card: {
        padding: 10
    },
    gridContainer:{
        padding: 20
    },
    cardHeader: {
        padding: 10,
        margin: 5
    },
    typography: {
        padding: 5
    }

  });
  

export class PostsPage extends Component {
  
    componentDidMount(){
        const { category } = this.props;
        this.props.dispatch(handleReceivePosts(category)); 
    }

    render() {
    const { posts, classes}  = this.props;    
    return (
      <div>
        <Grid container spacing={24} className={classes.gridContainer}>
            {Object.keys(posts).map(id =>(
                <Grid key={id} item xs={12} sm={6} lg={3} xl={3}>                    
                <PostCard post={posts[id]} />
            </Grid>
            ))}
        </Grid>      
          
      </div>
    )
  }
}

function mapStateToProps({posts}, props){
    
    const { category } = props.match.params;

    return {
        posts,
        category
    }
  }
  
  export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostsPage)))
