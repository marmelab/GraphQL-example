import { gql } from 'react-apollo';

export const userFragment = gql`
    fragment UserFields on User {
        id
        username
        full_name
        avatar_url
    }
`;

export const tweetFragment = gql`
    fragment TweetFields on Tweet {
        id
        body
        date
        Author {
            ...UserFields
        }
        Stats {
            tweet_id
            views
            likes
            retweets
            responses
        }
    }
`;
