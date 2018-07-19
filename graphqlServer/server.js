import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import glob from 'glob';
import path from 'path';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import schema from './schema';
import { getUserById, getUserBooks } from './service/index';
import DataLoader from 'dataloader';

const PORT = 4001;

const app = express();

const rootData = {};

app.use(cors());
app.use(logger('[:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));

// bodyParser is needed just for POST.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
getUserBooks().then(res => {
  rootData.books = res;
});
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
	glob(path.resolve(__dirname, './mock/**/*.js'), {}, (er, modules) => modules.forEach(module => require(module).default(app)));
}

app.listen(PORT, () => console.log(`> Listening at port ${PORT}`));
