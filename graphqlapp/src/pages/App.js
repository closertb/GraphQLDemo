import React, { Component } from 'react';
import {
  ApolloProvider,
} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from '../components/List';
import Detail from '../components/Detail';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  batchInterval: 10,
  opts: {
    credentials: 'cross-origin',
  },
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
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

