const { buildSchema } = require('graphql');
const { gql } = require('apollo-server');
const  { getUser, getUsers, getUserMixNick, getUserById }= require('../service/index');

const schema = buildSchema(`
  type User {
    id: ID!
    userName: String,
    age: Int,
    gender: String
  }

  type Query {
    user(id: ID!): User
  }

  
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);


// const userLoader = new DataLoader(ids => getUserById(ids));

const typeDefs = gql`
  type UserType {
    id: Int
    userName: String
    chiefs: [UserType]
    userMixNick: String
    military: String
    age: Int
    height: Int
    education: String
    enlistTime: String
    enlistYear: Int
  }
  type Pagination {
    pageSize: Int
    pageNum: Int
    total: Int
    data: [UserType]
  }
  type Query {
    user: UserType
    users: Pagination
  }
`;

const resolvers = {
  Query: {
    user: (obj, { id = 1 }, { loaders }, info) => {
      console.log('id:', id);
      return  loaders.person.load(id).then(value => value.data);
    },
    users: (root, { filters, pageNum, pageSize }) => {
      console.log('root', filters, pageNum, pageSize);
      return getUsers(filters, pageNum, pageSize);
    }
  },
};

module.exports = {
  typeDefs,
  resolvers
}