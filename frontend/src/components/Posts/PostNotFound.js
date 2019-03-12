import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import postStyle from "../../assets/jss/material-kit-react/views/postStyle.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";



class PostNotFound extends Component {


  render() {
    const { classes}  = this.props;
    

      return (
        <div>
            <Grid container spacing={24} className={classes.gridContainer}>               
            <GridItem xs={12} sm={12} lg={12} md={12} xl={12}>
              <Card>
              <CardBody>
                      <h2 className={classes.title} align='center'>POST NOT FOUND</h2>
              </CardBody>
              </Card>       
              </GridItem>
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

export default withStyles(postStyle)(PostNotFound)

