import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { handleReceivePosts } from '../actions/posts'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class PostPage extends Component {

  componentDidMount(){
    const { id, category } = this.props;
    id!== undefined && (
      this.props.dispatch(handleReceivePosts(category))
    );
  }

  render() {
    const { classes, category, id, post }  = this.props;
    

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
 
  const { id , category} = props.match.params;  

  const post = posts[id];

  return { 
    post,
    category,
    id
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PostPage))

