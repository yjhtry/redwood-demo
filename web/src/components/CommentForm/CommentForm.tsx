import { useState } from 'react'

import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from 'types/graphql'

import {
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
  useForm,
  FormError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

interface CommentFormProps {
  postId: number
}

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      name
      body
      createdAt
    }
  }
`

const CommentForm = ({ postId }: CommentFormProps) => {
  const [hasPosted, setHasPosted] = useState(false)
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CREATE, {
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
  })

  const onSubmit = async (data) => {
    await create({ variables: { input: { postId, ...data } } }).catch()

    formMethods.reset()
  }

  return (
    <>
      <div className={hasPosted ? 'hidden' : ''}>
        <h3 className="text-lg font-light text-gray-600">Leave a Comment</h3>
        <Form
          className="mt-4 w-full"
          error={error}
          onSubmit={onSubmit}
          formMethods={formMethods}
        >
          <FormError wrapperClassName="text-red-500" error={error} />

          <Label name="name" className="block text-sm uppercase text-gray-600">
            Name
          </Label>
          <TextField
            name="name"
            className="block w-full rounded border p-1 text-xs"
            validation={{ required: true }}
          />

          <Label
            name="body"
            className="mt-4 block text-sm uppercase text-gray-600"
          >
            Comment
          </Label>
          <TextAreaField
            name="body"
            className="block h-24 w-full rounded border p-1 text-xs"
            validation={{ required: true }}
          />

          <Submit
            disabled={loading}
            className="mt-4 block rounded bg-blue-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
          >
            Submit
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default CommentForm
