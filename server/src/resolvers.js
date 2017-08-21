import {
    Query as TweetQuery,
    Mutation as TweetMutation,
    Tweet,
} from './tweet/resolvers';
import { Query as UserQuery, User } from './user/resolvers';
import Date from './scalar/Date';

export default {
    Query: {
        ...TweetQuery,
        ...UserQuery,
    },
    Mutation: {
        ...TweetMutation,
    },
    Tweet,
    User,
    Date,
};
