import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { connect } from 'react-redux'
import { setCategoriesFilterAction }  from '../actions/categories';
import { setPostsFromCategoryFilterAction } from '../actions/posts'
import { handleInitialData } from '../actions/shared';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 20,
    marginRight: 20,
  },
};

class NavBar extends Component {
  
  state = {
    open: false,
  };

   handleHome(){
    this.props.history.push('/all');
    this.handleDrawerClose();
   }
  
   handleFilter(filterName){     
    this.props.history.push(`/${filterName}`);
    this.props.dispatch(setCategoriesFilterAction(filterName));
    this.props.dispatch(setPostsFromCategoryFilterAction(filterName));
    this.handleDrawerClose();
   }  

   handleAll(){
    this.props.history.push('/all');
     this.props.dispatch(handleInitialData());
     this.handleDrawerClose();
   }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render(){
    const { open } = this.state;
    const { categories } = this.props;
    const { classes } = this.props;    

    return (

      <div className={classes.root}>
        <AppBar position='static'>
        <Toolbar disableGutters={!open}>                        
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}              
            >
            <MenuIcon />
            </IconButton>                 
              <Typography variant='h4' color='inherit' className={classes.grow} >
                  Readable Project
              </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
          >
            <div>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>              
              <ListItem button key='clear' onClick={()=>this.handleHome()}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItem>
            </List>
            <List>              
              <ListItem button key='clear' onClick={()=>this.handleAll()}>
                <ListItemIcon><ClearAllIcon /></ListItemIcon>
                <ListItemText primary="All"/>
              </ListItem>
            </List>
            <Divider />
            <List>
              {Object.keys(categories).map(id =>(
                <ListItem button key={categories[id].name} onClick={()=>this.handleFilter(categories[id].name)}>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary={categories[id].name} />
              </ListItem>                  
              ))}  

            </List>
          </Drawer>
      </div>
    )
  }

}

function mapStateToProps( {categories} ){

  return { categories }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NavBar)));
