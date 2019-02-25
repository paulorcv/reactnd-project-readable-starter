import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './styles/theme'
import NavBar from './components/NavBar';
import DashBoard from './components/Dashboard'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <NavBar />
          <DashBoard />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
