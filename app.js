const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

//定义schema  
const schema = buildSchema(`  
    type User{  
        name: String  
        sex: String  
        intro: String  
    }  
    type Query {  
        user:User  
    }  
`);

//定义服务端数据  
const root = {
  user: {
    name: 'username',
    sex: '男',
    intro: '资深码农'
  }
};  
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, //启用GraphiQL  
}));
app.listen(8000, () => console.log('请在浏览器中打开地址：http://localhost:8000/graphql'));  