  
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt: Int,
  GraphQLID: ID,
  GraphQLString: Str,
  GraphQLList: List,
  GraphQLNonNull,
} = require('graphql');
const DataLoader = require('dataloader');
const { getUsers, getUserMixNick, getTopBooks } = require('../service');

const userLoader = new DataLoader(ids => getUserById(ids));

const BookType = new GraphQLObjectType({
  name: 'book',
  fields: () => ({
    book_id: { type: Int },
    title: { type: Str },
    subtitle: { type: Str },
    image: { type: Str },
    url: { type: Str },
  })
});

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: () => ({
    count: { type: Int },
    total: { type: Int },
    collections: { 
      type: new List(BookType),
      resolve: (root = {}) => {
        // console.log('root', root.books);
        return root.books;
      }
    } 
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: Int },
    userName: { type: Str },
    chiefs: {
      type: new List(UserType),
      resolve: (user, args, { loaders }) => loaders.person.loadMany(user.chiefs).then(value => value.map(item => item.data))
    },
    userMixNick: { 
      type: Str,
      resolve: (root, args, context, info) => {
        const { id } = root;
        return getUserMixNick(id);
      }
     },
    military: { type: Str },
    age: { type: Int },
    height: { type: Int },
    education: { type: Str },
    enlistTime: { type: Str },
    enlistYear: { type: Int },
  })
});

const PaginationType = new GraphQLObjectType({
  name: 'Pagination',
  fields: {
    pageSize: { type: Int },
    pageNum: { type: Int },
    total: { type: Int },
    data: {
      type: new List(UserType)
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
          	type: new GraphQLNonNull(ID)
          }
        },
        resolve: (root, { id }, { loaders }, info) => loaders.person.load(id).then(value => value.data)
      },
      users: {
        type: PaginationType,
        args: {
          pageNum: { type: Int },
          pageSize: { type: Int }
        },
        resolve: (root, { filters, pageNum, pageSize }) => {
          return getUsers(filters, pageNum, pageSize);
        }
      },
      collections: {
        type: CollectionType,
        args: {
          top: { type: Int },
        },
        resolve: async (root = {}, { top = 10 }) => {
          const res = await getTopBooks(top);
          // console.log('res:', res);
          return res;
        }
      }
    }
  })
});


module.exports = schema;