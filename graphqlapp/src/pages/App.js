import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HashRouter as Router } from 'react-router-dom';
import { resolvers, typeDefs, defaults } from '../client/index';
import Layout from './Layout';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
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
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Layout />
        </Router>
      </ApolloProvider>
    );
  }
}

