import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme'
import NavBar from './NavBar';
import PostsList from './PostsList'
import CssBaseline from '@material-ui/core/CssBaseline';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

class App extends Component {
  
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <React.Fragment>
        <CssBaseline />
          <NavBar/>
          <Route path='/' exact component={PostsList} />
        </React.Fragment>      
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
