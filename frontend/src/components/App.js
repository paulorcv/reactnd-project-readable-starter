import React, { Component } from 'react';
import NavBar from './NavBar';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PostPage from '../components/Posts/PostPage';
import PostsPage from '../components/Posts/PostsPage'
import LoadingBar from 'react-redux-loading'
import Components from '../views/Components/Components.jsx';
import LandingPage from '../views/LandingPage/LandingPage';
import LoginPage from '../views/LoginPage/LoginPage.jsx';
import ProfilePage from '../views/ProfilePage/ProfilePage.jsx';
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
            <Route path='/:category/:id' component={PostPage} />
            <Route path="/" exact component={Components} />
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/login-page" component={LoginPage} />

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