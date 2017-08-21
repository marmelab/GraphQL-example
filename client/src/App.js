import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Header from './Header';
import TweetPage from './TweetPage';

export default () => 
    <Router>
        <div>
            <Header />
            
            <Route exact path="/" component={HomePage} />
            <Route exact path="/:id" component={TweetPage} />
        </div>
    </Router>
