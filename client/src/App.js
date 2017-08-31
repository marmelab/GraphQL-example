import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { userFragment } from './fragments';

import HomePage from './HomePage';
import Header from './Header';
import TweetPage from './TweetPage';
import NewTweetPage from './NewTweetPage';

const App = ({ data: { currentUser } }) => 
    <Router>
        <div>
            <Header currentUser={currentUser} />
            
            <Switch>
                <Route exact path="/" component={HomePage} />
                {/* This route must come before the one with a parameter to be matched */}
                <Route exact path="/new" render={() => <NewTweetPage currentUser={currentUser} /> } />
                <Route exact path="/:id" component={TweetPage} />
            </Switch>
        </div>
    </Router>;

export const currentUserQuery = gql`
    query headerQuery {
        currentUser: User {
            ...UserFields
        }
    }

    ${userFragment}
`;

export default graphql(currentUserQuery)(App);
