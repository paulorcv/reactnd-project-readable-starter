import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Message from '@material-ui/icons/Message';
import Chip from '@material-ui/core/Chip';
import Category from '@material-ui/icons/Category';
import Face from '@material-ui/icons/Face';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleVotePost } from '../../actions/posts';

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import postCardStyle from "../../assets/jss/material-kit-react/views/postCard";


export class PostCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          cardAnimaton: "cardHidden"
        };
    }
    
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
          function() {
            this.setState({ cardAnimaton: "" });
          }.bind(this),
          700
        );
      }
      
      
    handleVoteUp(id){
        this.props.dispatch(handleVotePost(id, 'upVote'));
    }

    handleVoteDown(id){
        this.props.dispatch(handleVotePost(id, 'downVote'));
    }    

  render() {

    const { post, classes } = this.props;

    return (
        <Card className={classes[this.state.cardAnimaton]}>
        <CardHeader color="info" className={classes.cardHeader}>
          <h4>{post.title} <Chip label={post.author}  icon={<Face />}  /><Chip label={post.category}  icon={<Category />}  color="secondary" /></h4>                     
        </CardHeader>                
        <CardBody>
                {`${post.body.substring(0,40)}... `}
        </CardBody>
        <CardFooter className={classes.cardFooter}>
            <Avatar aria-label='SCORE' >
                {post.voteScore}
            </Avatar>    
            <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(post.id)}>
                <ThumbUp />
            </IconButton>
            <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(post.id)}>
                <ThumbDown />
            </IconButton>
            <Badge badgeContent={post.commentCount} color="secondary">
                <Message />
            </Badge>     
        </CardFooter>
        <CardFooter className={classes.cardFooter}>

        <p className={classes.divider}>             
            <Button color='primary' size="lg" component={Link} to={`/${post.category}/${post.id}`} >                    
                View
            </Button>
            </p>
            </CardFooter>            
    </Card>        
    )

    // return (
    //   <div>
    //     <Card classsName={classes.card} >
    //             <CardHeader 
    //                 title={post.title}
    //                 subheader={post.author}
    //                 className={classes.cardHeader} />                       
    //                 <CardContent>
    //                     <Typography component="p" className={classes.typography}>
    //                         {post.body}
    //                     </Typography>
    //                     <Chip label={post.category} 
    //                           icon={<Category />} 
    //                           color='secondary' />
    //                 </CardContent>    
    //                 <CardActions>
    //                     <Avatar aria-label='SCORE' className={classes.avatar}>
    //                         {post.voteScore}
    //                     </Avatar>    
    //                     <IconButton aria-label='Vote UP' onClick={()=>this.handleVoteUp(post.id)}>
    //                         <ThumbUp />
    //                     </IconButton>
    //                     <IconButton aria-label='Vote DOWN' onClick={()=>this.handleVoteDown(post.id)}>
    //                         <ThumbDown />
    //                     </IconButton>
    //                     <Badge badgeContent={post.commentCount} color="primary">
    //                         <Message />
    //                     </Badge>      
    //                     <Button variant='contained' 
    //                             color='primary' 
    //                             className={classes.button}
    //                             component={Link} to={`/${post.category}/${post.id}`} >                    
    //                         View
    //                     </Button>
    //                 </CardActions>                    
    //             </Card>         
    //   </div>
    // )
  }
}

export default connect()(withStyles(postCardStyle)(PostCard));
