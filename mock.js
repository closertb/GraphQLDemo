import { mockServer } from 'graphql-tools';
import schema from './simpleSchema';

const myMockServer = mockServer(schema);
console.log('myMockServer', myMockServer)
/* const res = myMockServer.query(`{
  User: {
    id
    name
  }
}`);

console.log('res', res) */

/* export const mockData = [{
  id: 1,
  name: 'dom'
},
  {
    id: 2,
    name: 'denzel'
  },
  {
    id: 3,
    name: 'simon'
  }] */

export const mockData = {
  "id": 1,
  "name": "dome"
};