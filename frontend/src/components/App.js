import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme'
import NavBar from './NavBar';
import DashBoard from './Dashboard'
import CssBaseline from '@material-ui/core/CssBaseline';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux';

class App extends Component {
  
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
        <CssBaseline />
          <NavBar/>
          <DashBoard />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
