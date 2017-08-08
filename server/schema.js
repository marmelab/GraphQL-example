import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';
import Tweet from './tweet/schema';
import User from './user/schema';
import Stat from './stat/schema';
import resolvers from './resolvers';

export default makeExecutableSchema({
    typeDefs: [Base, Tweet, User, Stat],
    resolvers,
    logger: { log: e => console.log(e) },
});
