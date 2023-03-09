import axios from 'axios'
import React, { useState } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import {
  Form as RouterForm,
  Link,
  redirect,
} from 'react-router-dom'
import ImageInput from '../../../Components/ImageInput/ImageInput';
import Utils from '../../../shared/utils'

const placeholderImage = 'https://placehold.co/600x400?text=Your Image'

export async function PostFormAction({ request }) {
  const { imagePreview, imageName, title, description } = Object.fromEntries(
    await request.formData()
  )

  if (imagePreview === placeholderImage) {
    throw new Error("Please select an image")
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)

  if (imageName) {
    const image = await Utils.urlToFile(imagePreview, imageName)
    formData.append('image', image)
  }

  await axios.post('posts/', formData)
  return redirect(`/profiles/user`)
}

export default function PostForm() {
  const [imagePreview, setImagePreview] = useState<string>(
    placeholderImage
  )
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <RouterForm method='post' onSubmit={() => setLoading(true)}>
      <Row id='post-form'>
        <Col xs={12} sm={4}>
          <ImageInput defaultImage={placeholderImage} onChange={setImagePreview}/>
        </Col>
        <Col>
          <Form.Group controlId='post-form-title'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Title' name='title' required/>
          </Form.Group>

          <Form.Group controlId='post-form-description'>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' placeholder='Description' name='description'/>
          </Form.Group>

          <Button
            type='submit'
            className={loading ? 'loading' : ''}
            disabled={loading || imagePreview === placeholderImage}
          >
            {loading ? 'Saving...' : 'Create'}
          </Button>
          <Link
            to={`/profiles/user`}
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
