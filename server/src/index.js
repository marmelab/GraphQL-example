// in src/index.js
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';

import schema from './schema';
import context from './context';

var app = express();

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
