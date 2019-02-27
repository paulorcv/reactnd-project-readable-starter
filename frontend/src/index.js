import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware'
import { BrowserRouter as Router } from 'react-router-dom'


const store = createStore(reducer, middleware);

ReactDOM.render(
        <Provider store={store}>
            <Router basename={process.env.PUBLIC_URL}>
                <App />
            </Router>
        </Provider>,             
        
    document.getElementById('root'));

