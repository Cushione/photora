import axios from 'axios'
import React, { useState } from 'react'
import { Col, Row, Image, Button, Form } from 'react-bootstrap'
import {
  Form as RouterForm,
  Link,
  redirect,
} from 'react-router-dom'
import Utils from '../../../shared/utils'
import './PostForm.scss'

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

  await axios.post(import.meta.env.VITE_API_URL + 'posts/', formData)
  return redirect(`/profiles/user`)
}

export default function PostForm() {
  const [imagePreview, setImagePreview] = useState<string>(
    placeholderImage
  )
  const [loading, setLoading] = useState<boolean>(false)

  const handleImageChange = (event) => {
    const files = event.target.files
    if (!files && !files.length && !files[0].type.startsWith('image')) {
      return
    }
    setImagePreview(Utils.createImagePreview(files[0]))
  }

  return (
    <RouterForm method='post' onSubmit={() => setLoading(true)}>
      <Row id='post-form'>
        <Col xs={12} sm={4}>
          <input
            id='post-image-input'
            type='file'
            name='imageName'
            onChange={handleImageChange}
            accept='image/*'
          />
          <label htmlFor='post-image-input' id='post-image-input-label'>
            <Image
              fluid
              id='post-image'
              src={imagePreview}
              alt='post image'
            />
            <i className='fa-regular fa-pen-to-square fa-2xl'></i>
          </label>
          <input type='hidden' name='imagePreview' value={imagePreview} />
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
