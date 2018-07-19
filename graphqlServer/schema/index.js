import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt as Int,
  GraphQLID as ID,
  GraphQLString as Str,
  GraphQLList as List,
  GraphQLNonNull,
} from 'graphql/type';
import DataLoader from 'dataloader';
import { getUser, getUsers, getUserMixNick, getUserById } from '../service/index';

const userLoader = new DataLoader(ids => getUserById(ids));

const BookType = new GraphQLObjectType({
  name: 'book',
  fields: () => ({
    book_id: { type: Int },
    status: { type: Str },
    title: {
      type: Str,
      resolve: ({ book }) => {
        console.log(book);
        return book.title;
      }
    },
    image: {
      type: Str,
      resolve: ({ book: { image } }) => image
    },
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
        return root.collections;
      }
    } 
  })
})
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
          pageNum: { type: Int },
          pageSize: { type: Int }
        },
        resolve: (root, { filters, pageNum, pageSize }) => {
          return getUsers(filters, pageNum, pageSize);
        }
      },
      collections: {
        type: CollectionType,
        resolve: (root) => {
          return root.books;
        }
      }
    }
  })
});

export default schema;