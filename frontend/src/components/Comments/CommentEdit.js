import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Delete from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { handleVoteComment } from '../../actions/comments';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import commentStyle from "../../assets/jss/material-kit-react/views/commentStyle.jsx";
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { handleReceiveComments, handleUpdateComment } from '../../actions/comments';
import { withRouter } from 'react-router';
import Button from "../../components/CustomButtons/Button.jsx";


export class CommentEdit extends Component {
  
  constructor(props){
    super(props);
    const { comment } = props;
    this.state = { comment }
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
  const comment = this.state;
  this.props.dispatch(handleUpdateComment(comment));
  this.setState(() => ({  }))
}

handleChange = name => event => {
this.setState({ [name]: event.target.value, toHome: false });
}

  handleDelete(id){
    //this.props.dispatch(handleVoteComment(id, 'upVote'));
    console.log('delete');
}  
  
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

        <TextField
          id="comment-body"
          label="Body"
          className={classes.textField}
          value={this.state.body}
          onChange={this.handleChange('body')}
          margin="normal"
          fullWidth      
          defaultValue=" "
        />
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
              onClick={()=>this.handleSave()}>
              SAVE
            </Button>                    
        </CardFooter>
      </Card>        
    )

  }
}

export default withRouter(connect()(withStyles(commentStyle)(CommentEdit)));
