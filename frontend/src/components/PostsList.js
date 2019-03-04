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
import Message from '@material-ui/icons/Message';
import Chip from '@material-ui/core/Chip';
import Category from '@material-ui/icons/Category';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { setCategoriesFilter }  from '../actions/categories';
// import { setPostsFromCategoryFilter } from '../actions/posts'
import { handleReceivePosts } from '../actions/posts'


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
  

export class PostsList extends Component {
  
    componentDidMount(){
        const { category } = this.props;
        this.props.dispatch(handleReceivePosts(category)); 
    }

    render() {
    const { posts, classes}  = this.props;    
    console.log('posts:');
    console.log(posts);
    return (
      <div>
        <Grid container spacing={24} className={classes.gridContainer}>
            {Object.keys(posts).map(id =>(
                <Grid key={id} item xs={12} sm={6} lg={3} xl={3}>                    
                
                <Card classsName={classes.card} >
                <CardHeader 
                    title={posts[id].title}
                    subheader={posts[id].author}
                    className={classes.cardHeader} />                       
                    <CardContent>
                        <Typography component="p" className={classes.typography}>
                            {posts[id].body}
                        </Typography>
                        <Chip label={posts[id].category} 
                              icon={<Category />} 
                              color='secondary' />
                    </CardContent>    
                    <CardActions>
                        <Avatar aria-label='SCORE' className={classes.avatar}>
                            {posts[id].voteScore}
                        </Avatar>    
                        <IconButton aria-label='Vote UP'>
                            <ThumbUp />
                        </IconButton>
                        <IconButton aria-label='Vote DOWN'>
                            <ThumbDown />
                        </IconButton>
                        <Badge badgeContent={posts[id].commentCount} color="primary">
                            <Message />
                        </Badge>      
                        <Button variant='contained' 
                                color='primary' 
                                className={classes.button}
                                component={Link} to={`/${posts[id].category}/${posts[id].id}`} >                    
                            View
                        </Button>
                    </CardActions>                    
                </Card> 
            </Grid>
            ))}
        </Grid>      
          
      </div>
    )
  }
}

function mapStateToProps({posts}, props){
    
    // let postsConverted = {};

    // Object.keys(posts).map(key => {
    //     let id = posts[key].id;
    //     let post = posts[key];
    //     postsConverted = { ...postsConverted, [id]: post};
    //     return (postsConverted);
    // })

    const { category } = props.match.params;

    return {
        posts,
        category
    }
  }
  
  export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostsList)))
