import React, { Component } from 'react';
import NavBar from './NavBar';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PostPage from '../components/Posts/PostPage';
import PostsPage from '../components/Posts/PostsPage'
import PostNotFound from '../components/Posts/PostNotFound';
import LoadingBar from 'react-redux-loading'
import "../assets/scss/material-kit-react.scss?v=1.4.0";


class App extends Component {  
  componentDidMount(){
    this.props.dispatch(handleInitialData());
}

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>                
        <NavBar/>    
        <LoadingBar />
          {this.props.loading === true
              ? null
              : <div>          
            
            <Route path='/:category' exact component={PostsPage} />
            <Route path='/:category/:id/notfound' exact component={PostNotFound} />
            <Route path='/:category/:id/edit' exact render={(props) => <PostPage {...props} action="edit" />} />
            <Route path='/:category/:id' exact render={(props) => <PostPage {...props} action="view" />} />            
            <Route path='/:category/posts/new' exact render={(props) => <PostPage {...props} action="new" />} />
            <Route path="/" exact component={PostsPage} />
          </div>}

        </React.Fragment>
        </Router>      
    );
  }
}

function mapStateToProps ({ loading }) {
  return {
    loading
  }
}

export default connect(mapStateToProps)(App)