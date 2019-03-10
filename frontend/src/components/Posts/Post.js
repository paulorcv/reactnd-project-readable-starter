import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { handleVotePost } from '../../actions/posts'
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { handleReceiveComments } from '../../actions/comments';
import Comment from '../Comments/Comment';
import CommentNew from '../Comments/CommentNew';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Category from '@material-ui/icons/Category';

import postStyle from "../../assets/jss/material-kit-react/views/postStyle.jsx";
import classNames from "classnames";
import InfoArea from "../../components/InfoArea/InfoArea.jsx";
import moment from 'moment';
  

export class Post extends Component {
    
  componentDidMount(){
      const { id } = this.props.match.params;
      this.props.dispatch(handleReceiveComments(id));
  }

  handleEdit(){
    const {id, category} = this.props.match.params;
    this.props.history.push(`/${category}/${id}/edit`);
  }

  handleVoteUp(id){
    this.props.dispatch(handleVotePost(id, 'upVote'));
  }

  handleVoteDown(id){
    this.props.dispatch(handleVotePost(id, 'downVote'));
  }  
    
    render() {

    const { classes, post, comments } = this.props;
    
    return(
      <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.container}>
      <div className={classes.section}>
      <h2 className={classes.title}>{post.title} 
      <Fab color="secondary" aria-label="Edit" className={classNames(classes.fab)} onClick={()=>{this.handleEdit()}}>
           <EditIcon   />
      </Fab>                   
      </h2>
      <h4 className={classes.description}>
        {post.body}
      </h4>
      <h4>
      <Avatar aria-label='SCORE' className={classNames(classes.avatar)}>
         {post.voteScore}
       </Avatar>          
      <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(post.id)}>
           <ThumbUp />
       </IconButton>
       <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(post.id)}>
           <ThumbDown />
       </IconButton>       
      </h4>
      <InfoArea
                title={post.category}
                description={`by ${post.author} : ${moment(post.timestamp).format('DD/MM/YYYY')}`}
                icon={Category}
                iconColor="info"
                vertical
              />      

        {post.commentCount > 0 && (
          <h3 className={classes.title}>
            Comments: {post.commentCount} 
          </h3>  
        )}              
       <Grid container spacing={24} className={classes.gridContainer}>
             {Object.keys(comments).map(id =>(
                 <Grid key={id} item xs={12} sm={12} lg={12} xl={12}>                    
                 <Comment comment={comments[id]} />

             </Grid>
             ))}
         </Grid>       

         <Grid container spacing={24} className={classes.gridContainer}>             
                 <Grid key='new-comment' item xs={12} sm={12} lg={12} xl={12}>                    
                 <CommentNew postId={post.id} />
             </Grid>
         </Grid>                

      </div>
      </div>
    </div>
    )

    
  }
}

function mapStateToProps( {comments}){
  return { 
    comments
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(postStyle)(Post)));
