export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    roles: String!
    Post: [Post]!
  }

  type Query {
    users: [User!]! @requireAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    roles: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    roles: String
  }
`
