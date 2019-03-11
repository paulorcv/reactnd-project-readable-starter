import React, { Component } from 'react'
import Button from "../../components/CustomButtons/Button.jsx";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { handleUpdatePost, handleVotePost, handleDeletePost } from '../../actions/posts'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { handleReceiveComments } from '../../actions/comments';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentEdit from '../Comments/CommentEdit';

import Grid from '@material-ui/core/Grid';

import { withRouter } from 'react-router';

import postStyle from "../../assets/jss/material-kit-react/views/postStyle.jsx";
import classNames from "classnames";
import Avatar from '@material-ui/core/Avatar';
import InfoArea from "../../components/InfoArea/InfoArea.jsx";
import Category from '@material-ui/icons/Category';
import Fab from '@material-ui/core/Fab';


export class PostEdit extends Component {

  constructor(props){
    super(props);
    const { post } = props;
    this.state = { post,
                  toHome: false
                 }

  }
  componentDidMount(){
      const { id } = this.props.match.params;
      this.props.dispatch(handleReceiveComments(id));
  }

  componentDidUpdate(){
    const { post } = this.props;
     if(post.id && !this.state.id){
       this.setState(post)
     }
  }

  handleDelete(postId){
    this.props.dispatch(handleDeletePost(postId));
    const {category} = this.props.match.params;
    this.props.history.push(`/${category}`);
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
    this.setState({ [name]: event.target.value, toHome: false });
    }

    isPostIncomplete = () => {
      const { author, body, title } = this.state;

      return author === undefined ||  body === undefined || title === undefined ||
               author.trim() === '' || body.trim() === '' || title.trim() === '';
          
    }    

    render() {

    const { classes, category, post, comments } = this.props;
    const { toHome } = this.state;
    
    if (toHome === true) {
        return <Redirect to={`/${category}`} />
    }

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.container}>
      <div className={classes.section}>

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
      <InfoArea
                title={post.category}
                description={`by ${post.author} : ${post.timestamp}`}
                icon={Category}
                iconColor="info"
                vertical
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
          label="Author"
          className={classes.textField}
          value={this.state.author}
          onChange={this.handleChange('author')}
          margin="normal"
          fullWidth
          defaultValue=" "
        />    

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

      <Button size="lg" color="primary" className={classes.button}
        onClick={()=>this.handleSave()}
        disabled={this.isPostIncomplete()}>
        SAVE
      </Button>
      <Fab color="info" aria-label="Delete" className={classNames(classes.fab)} onClick={()=>{this.handleDelete(post.id)}}>
           <DeleteIcon   />
      </Fab>          
    
            
       <Grid container spacing={24} className={classes.gridContainer}>
             {Object.keys(comments).map(id =>(
                 <Grid key={id} item xs={12} sm={12} lg={12} xl={12}>                    
                 <CommentEdit comment={comments[id]} />

             </Grid>
             ))}
         </Grid>            
       </form> 
       </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps( {comments, posts}, props){
 
  const { id} = props.match.params;  
 
  if(posts[id] === undefined){
    return {
      post: {},
      comments,
    }
  }
  const post = posts[id];

  return { 
    post,
    comments,    
  }
}
  

export default withRouter(connect(mapStateToProps)(withStyles(postStyle)(PostEdit)));
