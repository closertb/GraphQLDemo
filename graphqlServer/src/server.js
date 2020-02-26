const bodyParser = require('body-parser');
const logger = require('morgan');
const glob = require('glob');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require( 'graphql-tools');
const schema = require('./schema'); // { typeDefs, resolvers }
const { getUserById } = require('./service/index');
const DataLoader = require('dataloader');
const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = 4001;

const app = express();

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

app.use(cors());
app.use(logger('[:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));

const rootData = {};

// bodyParser is needed just for POST.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlExpress(req => {
  const personLoader = new DataLoader(keys => Promise.all(keys.map(key => getUserById(key))));
  const loaders = {
    person: personLoader,
  }
  return {
    rootValue: rootData,
    context: { loaders },
    schema
  };
}));
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql'
}));

if (process.env.NODE_ENV === 'development') {
	glob(path.resolve(__dirname, './mock/**/*.js'), {}, (er, modules) => modules.forEach(module => require(module)(app)));
}


app.listen(PORT, (port) => console.log(`🚀 Server ready at ${port}`));
