import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
} from 'graphql/type';
import { mockData } from './mock';

//定义schema  
/* const schema = buildSchema(`  
    type User{  
        name: String  
        sex: String  
        intro: String  
    }  
    type Query {  
        user:User  
    }  
`); */

//定义服务端数据  
/* const root = {
  user: {
    name: 'username',
    sex: '男',
    intro: '资深码农'
  }
};   */


/* let count = 5;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'urQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        description: 'The count!',
        resolve: function () {
          count += 1;
          return count;
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'urMutationType',
    fields: {
      updateCount: {
        type: GraphQLInt,
        description: 'Updates the count',
        resolve: function () {
          count += 1;
          return count;
        }
      }
    }
  })
}); */

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  }
});
console.log('in');
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          console.log(root, id);
          const { id } = args      // the `id` argument for this field is declared above
          return mockData // hit the database,fetchUserById(id)
        }
      }
    }
  })
});

export default schema;