import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
      },    
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 400,
      },
      dense: {
        marginTop: 19,
      },
      menu: {
        width: 200,
      },

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
  

export class Post extends Component {

    state = {
    };

    handleSave = () => {
        console.log('saved');
        console.log(this.state);
    }
    
    handleChange = name => event => {
    const post = this.s
    this.setState({ [name]: event.target.value });
    }

    componentDidMount(){
        const { post } = this.props;
        this.setState(post)
    }

    render() {

    const { post, classes } = this.props;

    return (
      <div>
       <form className={classes.form} >
       <TextField
          id="post-title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
          fullWidth      
          defaultValue=" "

        />

     <TextField
          id="post-body"
          label="Body"
          multiline
          rows="10"
          value={this.state.body}
          className={classes.textField}
          margin="normal"
          fullWidth
          defaultValue=" "
        />

      <TextField
          id="post-author"
          label="Title"
          className={classes.textField}
          value={this.state.author}
          onChange={this.handleChange('author')}
          margin="normal"
          fullWidth
          defaultValue=" "
        />    

      <TextField
          id="post-category"
          label="Category"
          className={classes.textField}
          value={this.state.category}
          margin="normal"
          defaultValue=" "
          fullWidth   
          InputProps={{
          readOnly: true,
          }}
          defaultValue=" "
        />

      <TextField
          id="post-voteScore"
          label="Vote Score"
          className={classes.textField}
          value={this.state.voteScore}
          margin="normal"
          fullWidth   
          InputProps={{
          readOnly: true,
          }}
          defaultValue=" "   
        />       

      <TextField
          id="post-commentCount"
          label="Comments"
          className={classes.textField}
          value={this.state.commentCount}
          margin="normal"
          fullWidth   
          InputProps={{
          readOnly: true,
          }}
          defaultValue=" "                 
        />  
      <Button variant="contained" color="primary" className={classes.button}
        onClick={()=>this.handleSave()}
      >
        SAVE
      </Button>
       </form>   
      </div>
    )
  }
}

export default withStyles(styles)(Post);