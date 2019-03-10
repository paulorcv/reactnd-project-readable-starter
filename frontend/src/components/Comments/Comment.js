import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Avatar from '@material-ui/core/Avatar';
import { handleVoteComment } from '../../actions/comments';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import commentStyle from "../../assets/jss/material-kit-react/views/commentStyle.jsx";
import moment from 'moment';

export class Comment extends Component {
  
  
    handleVoteUp(id){
        this.props.dispatch(handleVoteComment(id, 'upVote'));
    }

    handleVoteDown(id){
        this.props.dispatch(handleVoteComment(id, 'downVote'));
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


export default connect(mapStateToProps)(withStyles(commentStyle)(Comment));
