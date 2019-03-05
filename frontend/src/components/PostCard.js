import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Message from '@material-ui/icons/Message';
import Chip from '@material-ui/core/Chip';
import Category from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { handleVotePost } from '../actions/posts';


const styles = theme => ({
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
  

export class PostCard extends Component {

    handleVoteUp(id){
        this.props.dispatch(handleVotePost(id, 'upVote'));
    }

    handleVoteDown(id){
        this.props.dispatch(handleVotePost(id, 'downVote'));
    }    

  render() {

    const { post, classes } = this.props;

    return (
      <div>
        <Card classsName={classes.card} >
                <CardHeader 
                    title={post.title}
                    subheader={post.author}
                    className={classes.cardHeader} />                       
                    <CardContent>
                        <Typography component="p" className={classes.typography}>
                            {post.body}
                        </Typography>
                        <Chip label={post.category} 
                              icon={<Category />} 
                              color='secondary' />
                    </CardContent>    
                    <CardActions>
                        <Avatar aria-label='SCORE' className={classes.avatar}>
                            {post.voteScore}
                        </Avatar>    
                        <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(post.id)}>
                            <ThumbUp />
                        </IconButton>
                        <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(post.id)}>
                            <ThumbDown />
                        </IconButton>
                        <Badge badgeContent={post.commentCount} color="primary">
                            <Message />
                        </Badge>      
                        <Button variant='contained' 
                                color='primary' 
                                className={classes.button}
                                component={Link} to={`/${post.category}/${post.id}`} >                    
                            View
                        </Button>
                    </CardActions>                    
                </Card>         
      </div>
    )
  }
}

export default connect()(withStyles(styles)(PostCard));
