import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import { compose, gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import { userFragment } from './fragments';
import { homePageQuery, homePageQueryVariables } from './HomePage';

const styleSheet = createStyleSheet(theme => ({
    container: {
        margin: '1rem',
    },
    button: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    textarea: {
        width: '100%',
        resize: 'none',
        boxSizing: 'border-box',
    }
}));

class NewTweetPage extends Component {
    state = { body: '', saving: false };

    handleChange = event => {
        this.setState({ body: event.target.value });
    }

    handleSubmit = () => {
        this.setState({ saving: true }, () => {
            this.props.submit(this.state.body);
            // The submit promise will only resolve once the server has anwsered.
            // As we have an optimistic response setup, we don't wait for the promise
            // to be resolved and redirect the user to the list immediatly
            this.props.redirectToHome();
        });
    }

    render() {
        const { classes, saving } = this.props;
        const { body } = this.state;

        return (
            <div className={classes.container}>
                <label htmlFor="body">Enter your message</label>
                <textarea
                    id="body"
                    className={classes.textarea}
                    onChange={this.handleChange}
                    rows={4}
                    value={body}
                />

                <Button
                    raised
                    color="primary"
                    className={classes.button}
                    onClick={this.handleSubmit}
                    disabled={saving}
                >
                    Send
                    {saving && <LinearProgress />}
                </Button>
            </div>
        );
    }
}

const mutation = gql`
    mutation createTweet($body: String!) {
        createTweet(body: $body) {
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

export default compose(
    withRouter,
    graphql(mutation, {
        props: ({ mutate, ownProps: { currentUser, history } }) => ({
            redirectToHome: () => history.push('/'),
            submit: body => {
                mutate({
                    variables: { body },
                    optimisticResponse: {
                        __typename: 'Mutation',
                        createTweet: {
                            __typename: 'Tweet',
                            id: 'newTweet',
                            date: new Date().toISOString(),
                            body,
                            Author: {
                                __typename: 'User',
                                id: currentUser.id,
                                avatar_url: currentUser.avatar_url,
                                username: currentUser.username,
                                full_name: currentUser.full_name,
                            },
                            Stats: {
                                __typename: 'Stats',
                                views: 0,
                                likes: 0,
                                retweets: 0,
                                responses: 0,
                            },
                        },
                    },
                    update: (store, { data: { createTweet } }) => {
                        // Read the data from our cache for this query.
                        const data = store.readQuery({ query: homePageQuery, variables: homePageQueryVariables });
                        // Add our new tweet from the mutation to the beginning.
                        data.tweets.unshift(createTweet);
                        // Write our data back to the cache.
                        store.writeQuery({ query: homePageQuery, variables: homePageQueryVariables, data });
                    }
                });
            }
        }),
    }),
    withStyles(styleSheet),
)(NewTweetPage);
