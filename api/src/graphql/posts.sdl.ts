export const schema = gql`
  type Post {
    id: Int!
    title: String!
    body: String!
    comments: [Comment]!
    user: User!
    userId: Int!
    createdAt: DateTime!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: Int!): Post @skipAuth
  }
`
