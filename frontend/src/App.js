import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './styles/theme'
import NavBar from './components/NavBar';
import DashBoard from './components/Dashboard'
import CssBaseline from '@material-ui/core/CssBaseline';
import {getCategories, getPosts} from './api/api'

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      posts:  {}
    }
  }

  componentDidMount(){
    getCategories().then(data=>{
      this.setState( { categories: data });
    });
    getPosts().then(data=>{
      this.setState( {posts: data});
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
        <CssBaseline />
          <NavBar categories={this.state.categories}/>
          <DashBoard posts={this.state.posts} />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
