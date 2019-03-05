import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { handleUpdatePost, handleVotePost } from '../actions/posts'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { handleReceiveComments } from '../actions/comments';
import Comment from '../components/Comment';

const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
      },    
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 400,
      },
      dense: {
        marginTop: 19,
      },
      menu: {
        width: 200,
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
  

export class Post extends Component {

    state = {
        toHome: false
    };
    
  componentDidMount(){
      const { post } = this.props;
      this.setState(post)
      this.props.dispatch(handleReceiveComments(post.id));
  }

  handleVoteUp(id){
    this.setState((state, props) => ({
      voteScore: state.voteScore + 1
    }));      
    this.props.dispatch(handleVotePost(id, 'upVote'));
  }

  handleVoteDown(id){
    this.setState((state, props) => ({
      voteScore: state.voteScore - 1
    }));      

    this.props.dispatch(handleVotePost(id, 'downVote'));
  }  
    handleSave = () => {
        const post = this.state;
        this.props.dispatch(handleUpdatePost(post));
        this.setState(() => ({
            toHome: true,
          }))
    }
    
    handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    }

    render() {

    const { classes, category, post, comments } = this.props;
    const { toHome } = this.state;
    
    if (toHome === true) {
        return <Redirect to={`/${category}`} />
    }

    return (
      <div>
       <form className={classes.form} >
       <TextField
          id="post-title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
          fullWidth      
          defaultValue=" "

        />

     <TextField
          id="post-body"
          label="Body"
          multiline
          rows="10"
          value={this.state.body}
          className={classes.textField}
          onChange={this.handleChange('body')}
          margin="normal"
          fullWidth
          defaultValue=" "
        />

      <TextField
          id="post-author"
          label="Title"
          className={classes.textField}
          value={this.state.author}
          onChange={this.handleChange('author')}
          margin="normal"
          fullWidth
          defaultValue=" "
        />    

      <TextField
          id="post-category"
          label="Category"
          className={classes.textField}
          value={this.state.category}
          margin="normal"
          defaultValue=" "
          fullWidth   
          InputProps={{
          readOnly: true,
          }}
        />

      <TextField
          id="post-voteScore"
          label="Vote Score"
          className={classes.textField}
          value={this.state.voteScore}
          margin="normal"
          fullWidth   
          InputProps={{
          readOnly: true,
          }}
          defaultValue=" "   
        />       
      <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(post.id)}>
          <ThumbUp />
      </IconButton>
      <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(post.id)}>
          <ThumbDown />
      </IconButton>

      <TextField
          id="post-commentCount"
          label="Comments"
          className={classes.textField}
          value={this.state.commentCount}
          margin="normal"
          fullWidth   
          InputProps={{
          readOnly: true,
          }}
          defaultValue=" "                 
        />  
      <Button variant="contained" color="primary" className={classes.button}
        onClick={()=>this.handleSave()}
      >
        SAVE
      </Button>
       { Object.keys(comments).map( (key) => (
         <Comment comment={comments[key]} />
       ))}
       </form>   
      </div>
    )
  }
}

function mapStateToProps( {comments}){
  return { 
    comments
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Post));
