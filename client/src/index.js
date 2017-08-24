import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import notificationsReducer from './notifications';

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({ networkInterface });

const store = createStore(
    combineReducers({
        notifications: notificationsReducer,
        apollo: client.reducer(),
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);


registerServiceWorker();
