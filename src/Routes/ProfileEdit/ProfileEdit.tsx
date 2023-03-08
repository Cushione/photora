import axios from 'axios'
import React, { useState } from 'react'
import { Col, Row, Image, Button, Form } from 'react-bootstrap'
import {
  Form as RouterForm,
  Link,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import Profile from '../../shared/models/Profile.model'
import './ProfileEdit.scss'

export async function ProfileEditLoader() {
  const profile = (
    await axios.get<{ title: string }[]>(
      import.meta.env.VITE_API_URL + 'profiles/user'
    )
  ).data
  return { profile }
}

export async function ProfileEditAction({ request }) {
  const { id, imagePreview, imageName, ...updates } = Object.fromEntries(
    await request.formData()
  )

  const formData = new FormData()
  formData.append('name', updates.name)
  formData.append('content', updates.content)

  if (imageName) {
    const image = await fetch(imagePreview)
      .then((res) => res.blob())
      .then((blob) => new File([blob], imageName))
    formData.append('image', image)
  }

  await axios.put(import.meta.env.VITE_API_URL + 'profiles/user', formData)
  return redirect(`/profiles/${id}`)
}

export default function ProfileEdit() {
  const { profile }: { profile: Profile } = useLoaderData() as {
    profile: Profile
  }
  const [imagePreview, setImagePreview] = useState<string>(profile.image)
  const [loading, setLoading] = useState<boolean>(false)

  const handleImageChange = (event) => {
    const files = event.target.files
    if (!files && !files.length && !files[0].type.startsWith('image')) {
      return
    }
    const objectUrl = URL.createObjectURL(files[0])
    setImagePreview(objectUrl)
  }

  return (
    <>
      {profile && (
        <RouterForm method='post' onSubmit={() => setLoading(true)}>
          <input type='hidden' name='id' value={profile.id} />
          <Row id='profile-edit'>
            <Col xs={12} sm={4}>
              <input
                id='profile-image-input'
                type='file'
                name='imageName'
                onChange={handleImageChange}
                accept='image/*'
              />
              <label
                htmlFor='profile-image-input'
                id='profile-image-input-label'
              >
                <Image
                  fluid
                  roundedCircle
                  id='profile-image'
                  src={imagePreview}
                  alt='profile image'
                />
                <i className='fa-regular fa-pen-to-square fa-2xl'></i>
              </label>
              <input type='hidden' name='imagePreview' value={imagePreview} />
            </Col>
            <Col>
              <Form.Group controlId='profile-edit-name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Name'
                  name='name'
                  defaultValue={profile.name}
                />
              </Form.Group>

              <Form.Group controlId='profile-edit-content'>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Bio'
                  name='content'
                  defaultValue={profile.content}
                />
              </Form.Group>

              <Button
                type='submit'
                className={loading ? 'loading' : ''}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Link 
                to={`/profiles/${profile.id}`}
                role="button"
                className='btn btn-secondary ml-2'
                >
                  Cancel
                </Link>
            </Col>
          </Row>
        </RouterForm>
      )}
    </>
  )
}
