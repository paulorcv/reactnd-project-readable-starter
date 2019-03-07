import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { handleReceivePosts } from '../actions/posts'
import PostCard from '../components/PostCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



const styles = theme => ({
    fab:{
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
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

    handleNewPost(category){
      this.props.history.push(`/${category}/new`);
    }

    componentDidMount(){
        const { category } = this.props;
        this.props.dispatch(handleReceivePosts(category)); 
    }

    render() {
    const { posts, classes, category}  = this.props;    
    return (
      <div>
        <Grid container spacing={24} className={classes.gridContainer}>
            {Object.keys(posts).map(id =>(
                <Grid key={id} item xs={12} sm={6} lg={3} xl={3}>                    
                <PostCard post={posts[id]} />
            </Grid>
            ))}
        </Grid>      
        <Fab 
          className={classes.fab} 
          color="primary" 
          aria-label="New Post" 
          onClick={()=>this.handleNewPost(category)}>
          <AddIcon />
        </Fab>
          
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
