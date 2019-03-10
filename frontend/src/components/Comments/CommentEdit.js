import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Delete from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { handleVoteComment, handleDeleteComment } from '../../actions/comments';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import commentStyle from "../../assets/jss/material-kit-react/views/commentStyle.jsx";
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { handleReceiveComments, handleUpdateComment } from '../../actions/comments';
import { withRouter } from 'react-router';
import Button from "../../components/CustomButtons/Button.jsx";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";
import Check from "@material-ui/icons/Check";





export class CommentEdit extends Component {
  
  constructor(props){
    super(props);
    const { comment } = props;
    this.state = { comment: comment, showAlert: false }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.dispatch(handleReceiveComments(id));
}  

componentDidUpdate(){
  const { comment } = this.props;
   if(comment.id && !this.state.id){
     this.setState(comment);
   }
}

handleSave = () => {
  const comment = this.state.comment;
  this.props.dispatch(handleUpdateComment(comment));
  this.setState({ comment: {}, showAlert: true});
  setTimeout(()=>{ this.setState({ comment: {}, showAlert: false}) }, 3000);
}

// handleChange = name => event => {
// this.setState({ comment: {[name]: event.target.value, toHome: false }});
// }

handleChange = name => event => {
  const { comment } = this.state;
  comment[name] = event.target.value;
  this.setState({ comment, toHome: false });  
  }
  

  handleDelete(commentId){
      this.props.dispatch(handleDeleteComment(commentId));      
}  
  
    handleVoteUp(id){
        this.props.dispatch(handleVoteComment(id, 'upVote'));
    }

    handleVoteDown(id){
        this.props.dispatch(handleVoteComment(id, 'downVote'));
    }  


    isCommentIncomplete = () => {
      const { comment  } = this.state;
    
      return  comment.body === undefined || comment.body.trim() === '' ;
          
    }  

    render() {

    const { comment , classes } = this.props;

    const { showAlert } = this.state;
  
    return(
        <Card plain>
        <h4 className={classes.cardTitle}>
          by {comment.author}
          <br />
          <small className={classes.smallTitle}>{moment(comment.timestamp).format('DD/MM/YYYY')}</small>
        </h4>

        <TextField
          id="comment-body"
          className={classes.textField}
          value={this.state.comment.body}
          onChange={this.handleChange('body')}
          margin="normal"
          fullWidth      
          defaultValue=" "
        />
        { showAlert === true && (
              <SnackbarContent
              message={
                <span>
                  <b>SAVED</b> 
                </span>
              }
              close
              color="success"
              icon={Check}              
            />
        )}


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
            <IconButton aria-label='Delete' onClick={()=>this.handleDelete(comment.id)}>
                <Delete />
            </IconButton>    
            <Button size="sm" color="primary" className={classes.button}
              onClick={()=>this.handleSave()} disabled={this.isCommentIncomplete()}>
              SAVE
            </Button>                    
        </CardFooter>
      </Card>        
    )

  }
}

export default withRouter(connect()(withStyles(commentStyle)(CommentEdit)));
