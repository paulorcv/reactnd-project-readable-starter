import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import commentStyle from "../../assets/jss/material-kit-react/views/commentStyle.jsx";
import TextField from '@material-ui/core/TextField';
import {handleCreateComment, handleReceiveComments } from '../../actions/comments';
import { withRouter } from 'react-router';
import Button from "../../components/CustomButtons/Button.jsx";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";
import Check from "@material-ui/icons/Check";

export class CommentNew extends Component {
  
  constructor(props){
    super(props);
    const { postId } = props;
    this.state = { comment: {parentId: postId}, showAlert: false }
  }

componentDidUpdate(){
  const { postId } = this.props;
  if(postId!== undefined && !this.state.comment.parentId){
     this.setState({comment: {parentId: postId}});
   }
}

handleSave = () => {
  const { comment }  = this.state;
  this.props.dispatch(handleCreateComment(comment));
  this.setState({ comment: {}, showAlert: true});
  const { postId } = this.props;
  setTimeout(()=>{ this.setState({ comment: {parentId: postId, author: '', body: ''}, showAlert: false }) }, 3000);
  this.props.dispatch(handleReceiveComments(postId));
}

handleChange = name => event => {
const { comment } = this.state;
comment[name] = event.target.value;
this.setState({ comment });
// console.log(this.state);
}

isCommentIncomplete = () => {
  const { comment  } = this.state;

  return  comment.author === undefined ||  comment.body === undefined || 
          comment.author.trim() === '' || comment.body.trim() === '' ;
      
}    


    render() {

    const { classes } = this.props;

    const { showAlert } = this.state;
  
    return(
        <Card plain>
        <h4>Comment this:</h4>
        <TextField
          id="comment-author"
          className={classes.textField}
          value={this.state.comment.author}
          onChange={this.handleChange('author')}
          margin="normal"
                
          defaultValue=" "
          label="Author"
        />        
        <TextField
          id="comment-body"
          className={classes.textField}
          value={this.state.comment.body}
          onChange={this.handleChange('body')}
          margin="normal"
                
          defaultValue=" "
          label="Comment"
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
            <Button size="sm" color="primary" className={classes.button}
              onClick={()=>this.handleSave()} disabled={this.isCommentIncomplete()}>
              SAVE
            </Button>                    
        </CardFooter>
      </Card>        
    )

  }
}

export default withRouter(connect()(withStyles(commentStyle)(CommentNew)));
