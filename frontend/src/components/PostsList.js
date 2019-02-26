import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
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
import MailIcon from '@material-ui/icons/Mail';

export class PostsList extends Component {
  render() {

    const posts = this.props.posts;

    console.log(posts);

    return (
      <div>
        <Grid container spacing={24} style={{padding: 20}}>
            {Object.keys(posts).map(id =>(
                <Grid key={id} item xs={12} sm={4} lg={4} xl={3}>                    
                <Card>
                    <CardHeader 
                        title={posts[id].title}
                        subheader={posts[id].author} >                                          
                        </CardHeader>
                    <CardContent>
                        <Badge badgeContent={posts[id].commentCount} color="primary">
                            <MailIcon />
                        </Badge> 
                        <Typography component="p">
                            {posts[id].body}
                        </Typography>
                    </CardContent>    
                    <CardActions>
                        <Avatar aria-label='SCORE'>
                            {posts[id].voteScore}
                        </Avatar>                        
                        <IconButton aria-label='Vote UP'>
                            <ThumbUp />
                        </IconButton>
                        <IconButton aria-label='Vote DOWN'>
                            <ThumbDown />
                        </IconButton>
                    </CardActions>
                </Card>                
            </Grid>
            ))}
        </Grid>      
          
      </div>
    )
  }
}

export default PostsList
