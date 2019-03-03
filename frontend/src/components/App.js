import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme'
import NavBar from './NavBar';
import PostsList from './PostsList'
import CssBaseline from '@material-ui/core/CssBaseline';
import { handleReceiveCategories } from '../actions/categories'
import { handleReceivePosts } from '../actions/posts'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PostPage from '../components/PostPage';
import LoadingBar from 'react-redux-loading'

class App extends Component {
  
  componentDidMount(){
      this.props.dispatch(handleReceiveCategories());
      this.props.dispatch(handleReceivePosts(''));

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
            
            <Route path='/:category' exact component={PostsList} />
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