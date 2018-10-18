import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

const Root = ({store}) => (
    // Using Provider, to make the store available for the grand-childrens as part of the context
    <Provider store={ store } >
        <Router >
            <Route path='/:filter?' component={App} />  
            {/* The ':filter' part specifies the router path in the browser and ? specifies its optional - v4 */}
        </Router>
     </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root;

