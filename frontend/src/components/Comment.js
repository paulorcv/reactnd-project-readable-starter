import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

export class Comment extends Component {
  
  
    handleVoteUp(id){
        // this.props.dispatch(handleVotePost(id, 'upVote'));
    }

    handleVoteDown(id){
        // this.props.dispatch(handleVotePost(id, 'downVote'));
    }  

    render() {

    const { comment , classes } = this.props;

    return (
        <div>
        <Card classsName={classes.card} >
                <CardHeader 
                    title={comment.author}
                    subheader={comment.timestamp}
                    className={classes.cardHeader} />                       
                    <CardContent>
                        <Typography component="p" className={classes.typography}>
                            {comment.body}
                        </Typography>
                    </CardContent>    
                    <CardActions>
                        <Avatar aria-label='SCORE' className={classes.avatar}>
                            {comment.voteScore}
                        </Avatar>    
                        <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(comment.id)}>
                            <ThumbUp />
                        </IconButton>
                        <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(comment.id)}>
                            <ThumbDown />
                        </IconButton>
                    </CardActions>                    
                </Card>         
      </div>
    )
  }
}

export default withStyles(styles)(Comment);
