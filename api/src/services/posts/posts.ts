import type { QueryResolvers, PostRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany({})
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findFirst({
    where: { id },
  })
}

export const Post: PostRelationResolvers = {
  comments: (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root?.id } }).comments()
  },
  user: async (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root?.id } }).user()
  },
}
