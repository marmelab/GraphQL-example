import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import Tweet from './Tweet';
import { userFragment } from './fragments';

const styleSheet = createStyleSheet(theme => ({
    button: {
        textAlign: 'center',
        width: '100%',
    }
}));

class HomePage extends Component {
    state = { skip: 5 };

    handleClick = () => {
        this.props.loadMore(this.state.skip).then(() => {
            this.setState(({ skip }) => ({ skip: skip + 5 }));
        });
    }
    render() {
        const { classes, loading, tweets } = this.props; 
        return (
            <div>
                {loading && <LinearProgress />}
                {!loading && tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} showDetailsLink /> )}
                <Button onClick={this.handleClick} className={classes.button}>
                    Load more
                </Button>
            </div>
        );
    }
}

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

export const homePageQuery = gql`
    query homePageQuery($limit: Int!, $skip: Int!) {    
        tweets: Tweets(limit:$limit, skip:$skip, sort_field:"date", sort_order:"desc") {
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

export const homePageQueryVariables = { limit: 5, skip: 0 };

export default compose(
    graphql(homePageQuery, {
        options: {
            variables: homePageQueryVariables,
        },
        props: ({ data: { loading, tweets, fetchMore } }) => ({
            loading,
            tweets,
            loadMore: skip =>
                fetchMore({
                    variables: { limit: 5, skip },
                    updateQuery: (previousResult, { fetchMoreResult }) => ({
                        ...previousResult,
                        tweets: [
                            ...previousResult.tweets,
                            ...fetchMoreResult.tweets,
                        ],
                    }),
                })
        }),
    }),
    withStyles(styleSheet),
)(HomePage);
