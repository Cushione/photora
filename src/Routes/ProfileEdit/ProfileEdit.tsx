import axios from 'axios'
import React, { useState } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import {
  Form as RouterForm,
  Link,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import ImageInput from '../../Components/ImageInput/ImageInput';
import Profile from '../../shared/models/Profile.model'
import Utils from '../../shared/utils';

export async function ProfileEditLoader() {
  const profile = (
    await axios.get<{ title: string }[]>(
      'profiles/user'
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
    const image = await Utils.urlToFile(imagePreview, imageName)
    formData.append('image', image)
  }

  await axios.put('profiles/user', formData)
  return redirect(`/profiles/${id}`)
}

export default function ProfileEdit() {
  const { profile }: { profile: Profile } = useLoaderData() as {
    profile: Profile
  }
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      {profile && (
        <RouterForm method='post' onSubmit={() => setLoading(true)}>
          <input type='hidden' name='id' value={profile.id} />
          <Row id='profile-edit'>
            <Col xs={12} sm={4}>
              <ImageInput round defaultImage={profile.image} />
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
