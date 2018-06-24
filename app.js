require('babel-core/register');
require("babel-core").transform("code", {
  plugins: ["transform-runtime"]
});
import express from 'express';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';
import schema from './schema';

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 8000;
// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    });
});
/* app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, //启用GraphiQL  
}));
app.listen(8000, () => console.log('请在浏览器中打开地址：http://localhost:8000/graphql')); */

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});