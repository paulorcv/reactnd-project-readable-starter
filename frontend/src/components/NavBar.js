import React, {Component} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CategoryIcon from '@material-ui/icons/Category';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { connect } from 'react-redux'
import { setCategoriesFilterAction }  from '../actions/categories';
import { setPostsFromCategoryFilterAction } from '../actions/posts'
import { handleInitialData } from '../actions/shared';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
//components and assets
import Header from './Header/Header';
import Button from "./CustomButtons/Button.jsx";
import navbarsStyle from '../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx';
import Explore from "@material-ui/icons/Explore";


class NavBar extends Component {

   handleHome(){
        this.props.history.push('/all');
   }
  
   handleFilter(filterName){     
    this.props.history.push(`/${filterName}`);
    this.props.dispatch(setCategoriesFilterAction(filterName));
    this.props.dispatch(setPostsFromCategoryFilterAction(filterName));
   }  

   handleAll(){
    this.props.history.push('/all');
     this.props.dispatch(handleInitialData());
   }

  
  render(){
    const { categories } = this.props;
    const { classes } = this.props;   
    console.log('===== categories ======');
    console.log(categories); 

    return (
      <div className={classes.section}>
        <div id="navbar" className={classes.navbar}>
            <Header
              brand="READABLE"
              color="primary"
              rightLinks={
                <List className={classes.list}>
                  <ListItem key='all' className={classes.listItem}>
                 <Button
                      href="#"
                      className={classes.navLink}
                      onClick={()=>this.handleAll()}
                      color="transparent"
                    >
                      <ClearAllIcon className={classes.icons} /> ALL Categories
                    </Button>                 
               </ListItem>                
                {Object.keys(categories).map(id =>(
                  <ListItem key={categories[id].name} className={classes.listItem}>
                    <Button
                      href="#"
                      className={classes.navLink}
                      onClick={()=>this.handleFilter(categories[id].name)}
                      color="transparent"
                    >
                      <CategoryIcon className={classes.icons} /> {categories[id].name}
                    </Button>
                  </ListItem>
                  ))} 
                </List>
              }
            />
        </div>
      </div>
    );
    
    // return (


    //   <div className={classes.root}>
    //     <AppBar position='static'>
    //     <Toolbar disableGutters={!open}>                        
    //         <IconButton
    //           color="inherit"
    //           aria-label="Open drawer"
    //           onClick={this.handleDrawerOpen}
    //           className={classes.menuButton}              
    //         >
    //         <MenuIcon />
    //         </IconButton>                 
    //           <Typography variant='h4' color='inherit' className={classes.grow} >
    //               Readable Project
    //           </Typography>
    //       </Toolbar>
    //     </AppBar>
    //     <Drawer
    //         variant="persistent"
    //         anchor="left"
    //         open={open}
    //       >
    //         <div>
    //           <IconButton onClick={this.handleDrawerClose}>
    //             <ChevronLeftIcon />
    //           </IconButton>
    //         </div>
    //         <Divider />
    //         <List>              
    //           <ListItem button key='clear' onClick={()=>this.handleHome()}>
    //             <ListItemIcon><HomeIcon /></ListItemIcon>
    //             <ListItemText primary="Home"/>
    //           </ListItem>
    //         </List>
    //         <List>              
    //           <ListItem button key='clear' onClick={()=>this.handleAll()}>
    //             <ListItemIcon><ClearAllIcon /></ListItemIcon>
    //             <ListItemText primary="All"/>
    //           </ListItem>
    //         </List>
    //         <Divider />
    //         <List>
    //           {Object.keys(categories).map(id =>(
    //             <ListItem button key={categories[id].name} onClick={()=>this.handleFilter(categories[id].name)}>
    //             <ListItemIcon><CategoryIcon /></ListItemIcon>
    //             <ListItemText primary={categories[id].name} />
    //           </ListItem>                  
    //           ))}  

    //         </List>
    //       </Drawer>
    //   </div>
    // )
  }

}

function mapStateToProps( {categories} ){

  return { categories }
}

export default withRouter(connect(mapStateToProps)(withStyles(navbarsStyle)(NavBar)));
