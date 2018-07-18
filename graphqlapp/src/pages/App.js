import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { resolvers, typeDefs, defaults } from '../client/index';
import List from '../components/List';
import Detail from '../components/Detail';
import Todo from '../components/TodoList';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs }).concat(
    new HttpLink({
      uri: 'http://localhost:8080/graphql',
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
          <div>
            <Route exact path="/" component={List} />
            <Switch>
              <Route exact path="/:id/detail" component={Detail} />
              <Route exact path="/todo" component={Todo} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

