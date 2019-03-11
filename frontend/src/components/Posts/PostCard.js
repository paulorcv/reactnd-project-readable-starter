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
import { handleVotePost, handleDeletePost } from '../../actions/posts';

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import postCardStyle from "../../assets/jss/material-kit-react/views/postCard";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from "classnames";
import { withRouter } from 'react-router-dom';


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

    handleEdit(postId, postCategory) {
        let { category } = this.props.match.params;

        if( category===undefined) category = "all";

        if(category.trim()!== "all") category = postCategory;
        this.props.history.push(`/${category}/${postId}/edit`);
    }

    handleDelete(postId, category) {
        this.props.dispatch(handleDeletePost(postId));
        this.props.history.push(`/${category}`);
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
            <Fab color="secondary" aria-label="Edit" className={classNames(classes.fab)} onClick={() => { this.handleEdit(post.id, post.category) }}>
                <EditIcon />
            </Fab>
            <Fab color="info" aria-label="Delete" className={classNames(classes.fab)} onClick={() => { this.handleDelete(post.id, post.category) }}>
                <DeleteIcon />
            </Fab> 
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

  }
}

export default withRouter(connect()(withStyles(postCardStyle)(PostCard)));
