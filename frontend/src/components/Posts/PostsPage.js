import React, { Component } from 'react'
// import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
// import { withStyles } from '@material-ui/core/styles';
import { handleReceivePosts } from '../../actions/posts'
import PostCard from './PostCard';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";


import postsPage from "../../assets/jss/material-kit-react/views/postsPage.jsx";



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
    
    return(
          <div className={classes.container}>
            <GridContainer justify="center">
            {Object.keys(posts).map(id =>(
              <GridItem xs={12} sm={12} lg={6} md={6} xl={6}>
                <PostCard post={posts[id]} />
              </GridItem>
               ))}
            </GridContainer>
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
  
  export default withRouter(connect(mapStateToProps)(withStyles(postsPage)(PostsPage)))
