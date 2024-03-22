import Comment from './Comment'

export const defaultView = () => {
  return (
    <Comment
      comment={{
        id: 1,
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        createdAt: '2020-01-01T12:34:56Z',
        postId: 1,
      }}
    />
  )
}

export const moderatorView = () => {
  mockCurrentUser({ roles: 'moderator', email: 'yjh', id: 1 })
  return (
    <Comment
      comment={{
        id: 1,
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        createdAt: '2020-01-01T12:34:56Z',
        postId: 1,
      }}
    />
  )
}

export default {
  title: 'Components/Comment',
  component: Comment,
}
