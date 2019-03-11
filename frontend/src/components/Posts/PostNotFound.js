import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import postStyle from "../../assets/jss/material-kit-react/views/postStyle.jsx";



class PostNotFound extends Component {


  render() {
    const { classes}  = this.props;
    

      return (
        <div>
            <Grid container spacing={24} className={classes.gridContainer}>               
              <Card>
              <CardBody>
                      <h2 className={classes.title} align='center'>POST NOT FOUND</h2>
              </CardBody>
              </Card>       
            </Grid>     
        </div>
          )
  }
}

function mapStateToProps( {posts}, props){
 
  const { id , category} = props.match.params;  

  if(posts[id] === undefined){
    return {
      post: {},
      category,
      id
    }
  }
  const post = posts[id];

  return { 
    post,
    category,
    id
  }
}

export default connect(mapStateToProps)(withStyles(postStyle)(PostNotFound))

