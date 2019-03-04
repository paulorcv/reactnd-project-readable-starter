import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme'
import NavBar from './NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { handleReceiveCategories } from '../actions/categories'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PostPage from '../components/PostPage';
import PostsPage from '../components/PostsPage'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  
  componentDidMount(){
      this.props.dispatch(handleReceiveCategories());
}

  render() {
    return (
      <MuiThemeProvider theme={theme} >
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>                
        <CssBaseline />
        <NavBar/>    
        <LoadingBar />
          {this.props.loading === true
              ? null
              : <div>          
            
            <Route path='/:category' exact component={PostsPage} />
            <Route path='/:category/:id' component={PostPage} />
          </div>}

        </React.Fragment>
        </Router>      
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps ({ loading }) {
  return {
    loading
  }
}

export default connect(mapStateToProps)(App)