import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { resolvers, typeDefs, defaults } from '../client/index';
import Layout from './Layout';
import Todo from '../components/TodoList';

// Initialize
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
  batchInterval: 10,
  opts: {
    credentials: 'cross-origin',
  },
});
const client = new ApolloClient({
  clientState: { resolvers, defaults, cache, typeDefs },
  cache, // 本地数据存储, 暂时用不上
  link: httpLink
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


