import type { Comment as IComment } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const DELETE = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      postId
    }
  }
`
const formattedDate = (datetime: ConstructorParameters<typeof Date>[0]) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })
  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}

// Just a temporary type. We'll replace this later
interface Props {
  comment: Pick<IComment, 'postId' | 'id' | 'name' | 'createdAt' | 'body'>
}

const Comment = ({ comment }: Props) => {
  const { hasRole } = useAuth()
  const [deleteComment] = useMutation(DELETE, {
    refetchQueries: [
      {
        query: CommentsQuery,
        variables: { postId: comment.postId },
      },
    ],
  })

  const onDelete = () => {
    if (confirm('Are you sure?')) {
      deleteComment({
        variables: { id: comment.id },
      })
    }
  }
  return (
    <div className="relative rounded-lg bg-gray-200 p-8">
      <header className="flex justify-between">
        <h2 className="font-semibold text-gray-700">{comment.name}</h2>
        <time className="text-xs text-gray-500" dateTime={comment.createdAt}>
          {formattedDate(comment.createdAt)}
        </time>
      </header>
      <p className="mt-2 text-sm">{comment.body}</p>
      {hasRole('moderator') && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute bottom-2 right-2 rounded bg-red-500 px-2 py-1 text-xs text-white"
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default Comment
