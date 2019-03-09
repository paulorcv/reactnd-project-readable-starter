import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { handleVotePost } from '../../actions/posts'
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { handleReceiveComments } from '../../actions/comments';
import Comment from '../Comment';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Category from '@material-ui/icons/Category';


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '100%',
    },
 
    title:{
      width: '100%',
      margin: 'auto'
    },

    body:{
      width: '100%',
      margin: 20
    },    

    category:{
      margin: 10,
    },

    fab:{
      margin: 10
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
  

export class Post extends Component {
    
  componentDidMount(){
      const { id } = this.props.match.params;
      this.props.dispatch(handleReceiveComments(id));
  }

  handleEdit(){
    //todo: handle edit
    console.log("edit");
  }

  handleVoteUp(id){
    this.props.dispatch(handleVotePost(id, 'upVote'));
  }

  handleVoteDown(id){
    this.props.dispatch(handleVotePost(id, 'downVote'));
  }  
    
    render() {

    const { classes, post, comments } = this.props;
    console.log('comments:');
    console.log(comments);

    
    return (
      <div>
      <Paper className={classes.root} elevation={1}>

       <form className={classes.form} >
       <Typography variant="h5" gutterBottom className={classes.title}>
       <Chip label={post.category}  icon={<Category />}  color='secondary' className={classes.category} />
        {post.title}
        <Fab color="primary" aria-label="Edit" className={classes.fab}>
          <EditIcon onClick={()=>{this.handleEdit()}} />
        </Fab>                   
      </Typography>  

      <Typography variant="subtitle1" gutterBottom>
        {post.author} : {post.timestamp}
      </Typography>


      <Typography variant="body1" gutterBottom className={classes.body}>
        {post.body}
      </Typography>

      <Avatar aria-label='SCORE' className={classes.avatar}>
        {post.voteScore}
      </Avatar>    

      <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(post.id)}>
          <ThumbUp />
      </IconButton>
      <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(post.id)}>
          <ThumbDown />
      </IconButton>

      {post.commentCount > 0 && (
        <Typography variant="h5" gutterBottom className={classes.title}>
          Comments: {post.commentCount} 
        </Typography>  
      )}
     
      <Grid container spacing={24} className={classes.gridContainer}>
            {Object.keys(comments).map(id =>(
                <Grid key={id} item xs={12} sm={12} lg={12} xl={12}>                    
                <Comment comment={comments[id]} />
                <Divider variant="fullWidth" />

            </Grid>
            ))}
        </Grid>            
       </form> 
      </Paper>   
      </div>
    )
  }
}

function mapStateToProps( {comments}){
  return { 
    comments
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Post)));
