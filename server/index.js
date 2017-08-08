// in src/index.js
import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schema';
import context from './context';

var app = express();
app.use(
    '/graphql',
    graphqlHTTP(request => ({
        schema: schema,
        context: context(request),
        graphiql: true,
    })),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
