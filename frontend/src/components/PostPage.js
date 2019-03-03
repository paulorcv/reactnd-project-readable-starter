import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class PostPage extends Component {

  render() {
    const { id, category} = this.props.match.params;      
    const { classes, post }  = this.props;

return (
<div>
      <Button variant="contained" className={classes.button}>
        Default
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="contained" color="secondary" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons" className={classes.button}>
        Link
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>
    )
  }
}

function mapStateToProps( {posts, loading}, props){
 
  const { category, id } = props.match.params;  
  let post = {};
  Object.keys(posts).map(index=>{
    if( posts[index].id === id){
      return post = posts[index];
    }
  });

  return { 
    post,
    category
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PostPage))

