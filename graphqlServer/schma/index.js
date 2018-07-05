import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';
import { getUser, getUsers, getUserMixNick } from '../service/index';


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    userName: { type: GraphQLString },
    userMixNick: { 
      type: GraphQLString,
      args: {
        ID: { type: GraphQLID }
      },
      resolve: (root, args, context, info) => {
        const { id } = root;
        console.log(info)
        return getUserMixNick(id);
      }
     },
    military: { type: GraphQLString },
    age: { type: GraphQLInt },
    height: { type: GraphQLInt },
    education: { type: GraphQLString },
    enlistTime: { type: GraphQLString },
    enlistYear: { type: GraphQLInt },
  }
});


const PaginationType = new GraphQLObjectType({
  name: 'Pagination',
  fields: {
    pageSize: { type: GraphQLInt },
    pageNum: { type: GraphQLInt },
    total: { type: GraphQLInt },
    data: {
      type: new GraphQLList(UserType)
    }
  }
});
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'militaryQuery',
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLID }
        },
        resolve: (root, args, context, info) => {
          const { id } = args;
          return getUser(id);
        }
      },
      users: {
        type: PaginationType,
        args: {
          pageNum: { type: GraphQLInt },
          pageSize: { type: GraphQLInt }
        },
        resolve: (root, { filters, pageNum, pageSize }) => {
          return getUsers(filters, pageNum, pageSize);
        }
      }
    }
  })
});

export default schema;