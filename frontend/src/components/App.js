import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme'
import NavBar from './NavBar';
import PostsList from './PostsList'
import CssBaseline from '@material-ui/core/CssBaseline';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PostPage from '../components/PostPage';

class App extends Component {
  
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme} >
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>
        <CssBaseline />
          <NavBar/>
          <Route path='/' exact component={PostsList} />
          <Route path='/posts/:id' component={PostPage} />
        </React.Fragment>
        </Router>      
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
