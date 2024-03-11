import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  Form,
  Label,
  Submit,
  TextField,
  TextAreaField,
  FieldError,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import type { SubmitHandler } from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

interface FormValue {
  name: string
  email: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm<FormValue>({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message!')
      formMethods.reset()
    },
  })

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    create({ variables: { input: data } }).catch()
  }

  return (
    <>
      <Toaster />
      <div className="p-8">
        <Metadata title="Contact" description="Contact page" />
        <Form
          error={error}
          className="space-y-6"
          formMethods={formMethods}
          onSubmit={onSubmit}
        >
          <FormError error={error} wrapperClassName="text-red-500" />
          <div className="flex w-80 flex-col gap-1">
            <Label name="name">Name</Label>
            <TextField
              name="name"
              className="border border-gray-300"
              validation={{ required: true }}
            />
            <FieldError name="name" className="text-red-500" />
          </div>

          <div className="flex w-80 flex-col gap-1">
            <Label name="email">Email</Label>
            <TextField
              name="email"
              className="border-gr border"
              validation={{
                required: true,
                pattern: {
                  value: /^[^@]+@[^.]+\..+$/,
                  message: 'Please enter a valid email address',
                },
              }}
            />
            <FieldError name="email" className="text-red-500" />
          </div>

          <div className="flex w-80 flex-col gap-1">
            <Label name="message">Message</Label>
            <TextAreaField
              name="message"
              className="border-gr border"
              validation={{ required: true }}
            />
            <FieldError name="message" className="text-red-500" />
          </div>
          <Submit
            disabled={loading}
            className="mt-6 rounded-lg border border-gray-300 bg-blue-400 px-2 py-2 hover:bg-blue-200"
          >
            Save
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default ContactPage
