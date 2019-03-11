import React, { Component } from 'react'
// import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
// import { withStyles } from '@material-ui/core/styles';
import { handleReceivePosts } from '../../actions/posts'
import { orderByAction } from '../../actions/preferences';
import PostCard from './PostCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import postsPageStyle from "../../assets/jss/material-kit-react/views/postsPage.jsx";
import { orderPosts } from '../../util/preferencesHelper';
import Chip from '@material-ui/core/Chip';
import ScoreIcon from '@material-ui/icons/Score';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';


export class PostsPage extends Component {

    handleOrder(order){
      this.props.dispatch(orderByAction(order)); 
    }

    handleNew(category){
      this.props.history.push(`/${category}/posts/new`);
    }


    componentDidMount(){
        const { category } = this.props;
        this.props.dispatch(handleReceivePosts(category)); 
    }

    render() {
    const { posts, classes, category, preferences}  = this.props;    
    
    const postsOrdered = orderPosts(posts, preferences.orderBy);

    return(
          <div>
          <div className={classes.container}>
          <GridContainer justify="center">
          <GridItem xs={4} sm={4} lg={4} md={4} xl={4}>
          <Chip icon={<AlarmIcon />}
              label="NEWEST"
              clickable
              className={classes.chip}
              onClick={()=>{ this.handleOrder('newest')}}
              color="info"
          />
          </GridItem>
          <GridItem xs={4} sm={4} lg={4} md={4} xl={4}>
          <Chip icon={<AlarmOnIcon />}
              label="OLDEST"
              clickable
              className={classes.chip}
              onClick={()=>{ this.handleOrder('oldest')}}
              color="info"
          />
          </GridItem>
          <GridItem xs={4} sm={4} lg={4} md={4} xl={4}>
          <Chip icon={<ScoreIcon />}
              label="SCORE"
              clickable
              className={classes.chip}
              onClick={()=>{ this.handleOrder('score')}}
              color="info"
          />
          </GridItem>                    
          </GridContainer>

            <GridContainer justify="center">
            {Object.keys(postsOrdered).map(id =>(
              <GridItem xs={12} sm={12} lg={6} md={6} xl={6}>
                <PostCard post={postsOrdered[id]} />
              </GridItem>
               ))}
            </GridContainer>
          </div>      
          <Fab color="secondary" className={classes.fab} onClick={()=>{this.handleNew(category)}}>
            <AddIcon  />
          </Fab>             
          </div>
    )
  
  }
}

function mapStateToProps({posts, preferences}, props){
    
    const { category } = props.match.params;

    return {
        posts,
        category,
        preferences
    }
  }
  
  export default withRouter(connect(mapStateToProps)(withStyles(postsPageStyle)(PostsPage)))
