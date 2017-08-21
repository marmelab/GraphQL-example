import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { LinearProgress } from 'material-ui/Progress';

import Tweet from './Tweet';
import { userFragment } from './fragments';

const HomePage = ({ data: { loading, tweets } }) =>(
    <div>
        {loading && <LinearProgress />}
        {!loading && tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} showDetailsLink /> )}
    </div>
);

HomePage.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        tweets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                body: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                Author: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    username: PropTypes.string.isRequired,
                    full_name: PropTypes.string.isRequired,
                    avatar_url: PropTypes.string.isRequired,
                }).isRequired,
                Stats: PropTypes.shape({
                    views: PropTypes.number.isRequired,
                    likes: PropTypes.number.isRequired,
                    retweets: PropTypes.number.isRequired,
                    responses: PropTypes.number.isRequired,
                }).isRequired,
            }).isRequired,
        ),
    }),
};

HomePage.defaultProps = {
    tweets: [],
};

const query = gql`
    query homePageQuery {    
        tweets: Tweets(limit:10, sort_field:"date", sort_order:"desc") {
            id
            body
            date
            Author {
                ...UserFields
            }
            Stats {
                views
                likes
                retweets
                responses
            }
        }
    }

    ${userFragment}
`;

export default graphql(query)(HomePage);
