import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { resolvers, typeDefs, defaults } from '../client/index';
import Layout from './Layout';
import Todo from '../components/TodoList';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache, // 本地数据存储
  link: withClientState({ resolvers, defaults, cache, typeDefs }).concat(
    new HttpLink({
      uri: 'http://localhost:4001/graphql',
      batchInterval: 10,
      opts: {
        credentials: 'cross-origin',
      },
    })
  ),
});
export default function({ history }) {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route path="/todoList" component={Todo} />
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}


