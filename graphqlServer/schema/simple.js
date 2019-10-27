import { buildSchema } from 'graphql';

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