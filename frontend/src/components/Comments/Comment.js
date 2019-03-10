import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Avatar from '@material-ui/core/Avatar';
import { handleVoteComment, handleDeleteComment } from '../../actions/comments';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import commentStyle from "../../assets/jss/material-kit-react/views/commentStyle.jsx";
import moment from 'moment';
import classNames from "classnames";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';


export class Comment extends Component {
  
  
    handleVoteUp(id){
        this.props.dispatch(handleVoteComment(id, 'upVote'));
    }

    handleVoteDown(id){
        this.props.dispatch(handleVoteComment(id, 'downVote'));
    }  

    handleDelete(commentId){
      this.props.dispatch(handleDeleteComment(commentId));
      // const {category, id} = this.props.match.params;
      //this.props.history.push(`/${category}/${id}`);
    }

    render() {

    const { comment , classes } = this.props;

    return(
        <Card plain>
        <h4 className={classes.cardTitle}>
          by {comment.author}
          <br />
          <small className={classes.smallTitle}>{moment(comment.timestamp).format('DD/MM/YYYY')}</small>
        </h4>
        <CardBody>
          <p className={classes.description}>
           {comment.body}
          </p>
        </CardBody>
        <CardFooter className={classes.justifyCenter}>
           <Avatar aria-label='SCORE' className={classes.avatar}>
                {comment.voteScore}
            </Avatar>    
            <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(comment.id)}>
                <ThumbUp/>
            </IconButton>
            <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(comment.id)}>
                <ThumbDown />
            </IconButton>
            <Fab color="info" aria-label="Delete" className={classNames(classes.fab)} onClick={()=>{this.handleDelete(comment.id)}}>
              <DeleteIcon   />
            </Fab>             
        </CardFooter>
      </Card>        
    )

  }
}

function mapStateToProps( {comments}){
  return { 
    comments
  }
}


export default withRouter(connect(mapStateToProps)(withStyles(commentStyle)(Comment)));
