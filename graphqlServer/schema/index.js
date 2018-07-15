import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql/type';
import DataLoader from 'dataloader';
import { getUser, getUsers, getUserMixNick, getUserById } from '../service/index';

const userLoader = new DataLoader(ids => getUserById(ids));
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    userName: { type: GraphQLString },
    chiefs: {
      type: new GraphQLList(UserType),
      resolve: (user, args, { loaders }) => loaders.person.loadMany(user.chiefs).then(value => value.map(item => item.data))
    },
    userMixNick: { 
      type: GraphQLString,
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
  })
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
          id: {
          	type: new GraphQLNonNull(GraphQLID)
          }
        },
/*         resolve: (root, args, context, info) => {
          const { id } = args;
          const res = userLoader.load(id);
          console.log(res);
          res.then(function (val) { console.log('value', val.data);return val.data }, function (error) { console.log(error)});
          return res;
        } */
        resolve: (root, { id }, { loaders }, info) => loaders.person.load(id).then(value => value.data)
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