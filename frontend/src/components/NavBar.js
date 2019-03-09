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
        
  }

}

function mapStateToProps( {categories} ){

  return { categories }
}

export default withRouter(connect(mapStateToProps)(withStyles(navbarsStyle)(NavBar)));
