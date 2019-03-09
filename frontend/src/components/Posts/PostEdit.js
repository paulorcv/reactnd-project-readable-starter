import React, { Component } from 'react'
import Button from "../../components/CustomButtons/Button.jsx";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { handleUpdatePost, handleVotePost } from '../../actions/posts'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { handleReceiveComments } from '../../actions/comments';
import Comment from '../Comments/Comment';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';

import postStyle from "../../assets/jss/material-kit-react/views/postStyle.jsx";
import classNames from "classnames";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Avatar from '@material-ui/core/Avatar';
import InfoArea from "../../components/InfoArea/InfoArea.jsx";
import Category from '@material-ui/icons/Category';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },

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
       <CustomInput
                  id="post-title"
                  inputProps={{
                    placeholder: "Title",
                    value:this.state.title,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange:this.handleChange('title')
                  }}
                />

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
          label="Title"
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
      >
        SAVE
      </Button>
    
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
       </form> 
       </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps( {comments, posts}, props){
 
  const { id , category} = props.match.params;  
 
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
