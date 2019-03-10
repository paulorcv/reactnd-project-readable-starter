import React, { Component } from 'react'
import Button from "../../components/CustomButtons/Button.jsx";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { handleCreatePost } from '../../actions/posts'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';

import postStyle from "../../assets/jss/material-kit-react/views/postStyle.jsx";
import classNames from "classnames";
import MenuItem from '@material-ui/core/MenuItem';


export class PostNew extends Component {

  constructor(props){
    super(props);
    const { post } = props;
    this.state = { post,
                  toHome: false
                 }

  }
  handleSave = () => {
        const post = this.state;
        this.props.dispatch(handleCreatePost(post));
        this.setState(() => ({
            toHome: true,
          }))
    }
    
    handleChange = name => event => {
    this.setState({ [name]: event.target.value, toHome: false });
    }

    isPostIncomplete = () => {
      const { author, category, body, title } = this.state;

      return author === undefined || category===undefined || body === undefined || title === undefined ||
               author.trim() === '' || category.trim() === '' || body.trim() === '' || title.trim() === '';
          
    }    

    render() {

    const { classes, category, categories } = this.props;
    const { toHome } = this.state;
    
    if (toHome === true) {
        return <Redirect to={`/${category}`} />
    }

    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.container}>
      <div className={classes.section}>

       <form className={classes.form} >

       <TextField
          id="post-title-new"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
          fullWidth      
          defaultValue=" "

        />
        <TextField
          id="post-category-new"
          select
          label="Category"
          fullWidth
          className={classes.textField}
          value={this.state.category}
          onChange={this.handleChange('category')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select post category"
          margin="normal"
        >
          {Object.keys(categories).map(index => (
            <MenuItem key={categories[index].name} value={categories[index].name}>
              {categories[index].name}
            </MenuItem>
          ))}
        </TextField>
        
     <TextField
          id="post-body-new"
          label="Body"
          multiline
          rows="10"
          value={this.state.body}
          className={classes.textField}
          onChange={this.handleChange('body')}
          margin="normal"
          fullWidth
          defaultValue=" "
        />

      <TextField
          id="post-author-new"
          label="Author"
          className={classes.textField}
          value={this.state.author}
          onChange={this.handleChange('author')}
          margin="normal"
          fullWidth
          defaultValue=" "
        />    

      <Button size="lg" color="primary" className={classes.button}
        onClick={()=>this.handleSave()}
        disabled={this.isPostIncomplete()}
      >
        SAVE
      </Button>
    
       </form> 
       </div>
      </div>
    </div>
    )
  }
}
function mapStateToProps({categories}){
    
  return {
      categories
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(postStyle)(PostNew)));
