import axios from 'axios'
import React, { useState } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import {
  Form as RouterForm,
  Link,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import ImageInput from '../../../Components/ImageInput/ImageInput'
import usePageTitle from '../../../shared/hooks/usePageTitle'
import { Post } from '../../../shared/models/Post.model'
import Utils from '../../../shared/utils'

const placeholderImage = 'https://placehold.co/600x400?text=Your Image'

export async function PostFormLoader({ params }): Promise<Post | null> {
  if (params.id) {
    const post = (await axios.get<Post>('posts/' + params.id)).data
    if (!post.is_owner) {
      throw new Error('You do not have permission to edit this post')
    }
    return post
  } else {
    return null
  }
}

export async function PostFormAction({ request, params }) {
  const { imagePreview, imageName, title, description } = Object.fromEntries(
    await request.formData()
  )
  if (imagePreview === placeholderImage) {
    throw new Error('Please select an image')
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)

  if (imageName) {
    const image = await Utils.urlToFile(imagePreview, imageName)
    formData.append('image', image)
  } else {
    formData.append('image', '')
  }

  if (request.method.toLowerCase() === 'post') {
    await axios.post('posts', formData)
    return redirect(`/profiles/user`)
  } else {
    await axios.put(`posts/${params.id}`, formData)
    return redirect(`/posts/${params.id}`)
  }
}

export default function PostForm() {
  const data: Post | undefined = useLoaderData() as
    | Awaited<ReturnType<typeof PostFormLoader>>
    | undefined
  const [imagePreview, setImagePreview] = useState<string>(placeholderImage)
  const [loading, setLoading] = useState<boolean>(false)

  usePageTitle(data ? `Edit '${data.title}'` : 'Create Post')

  return (
    <RouterForm
      method={data ? 'put' : 'post'}
      onSubmit={() => setLoading(true)}
    >
      <Row id='post-form'>
        <Col xs={12} sm={4}>
          <ImageInput
            defaultImage={data?.image || placeholderImage}
            onChange={setImagePreview}
          />
        </Col>
        <Col>
          <Form.Group controlId='post-form-title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              defaultValue={data?.title || ''}
              required
            />
          </Form.Group>

          <Form.Group controlId='post-form-description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Description'
              name='description'
              defaultValue={data?.description || ''}
            />
          </Form.Group>

          <Button
            type='submit'
            className={loading ? 'loading' : ''}
            disabled={loading || imagePreview === placeholderImage}
          >
            {loading ? 'Saving...' : data ? 'Update' : 'Create'}
          </Button>
          <Link
            to={data ? `/posts/${data.id}` : '/profiles/user'}
            role='button'
            className='btn btn-secondary ml-2'
          >
            Cancel
          </Link>
        </Col>
      </Row>
    </RouterForm>
  )
}
