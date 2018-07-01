import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import glob from 'glob';
import path from 'path';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
// import schema from './models';
import schema from './schma';

const PORT = 8080;

const app = express();

app.use(cors());
app.use(logger('[:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));

// bodyParser is needed just for POST.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql'
}));

if (process.env.NODE_ENV === 'development') {
	glob(path.resolve(__dirname, './mock/**/*.js'), {}, (er, modules) => modules.forEach(module => require(module).default(app)));
}

app.listen(PORT, () => console.log(`> dfListening at port ${PORT}`));
