import axios from 'axios'
import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { Link, useLoaderData } from 'react-router-dom'
import { Post } from '../../shared/models/Post.model'
import Profile from '../../shared/models/Profile.model'
import './ProfileDetail.scss'

export async function ProfileDetailLoader({ params }: { params: { id: number } }) {
  const profile = axios.get<Profile>(
    import.meta.env.VITE_API_URL + 'profiles/' + params.id
  )
  const posts = axios.get<Post[]>(
    import.meta.env.VITE_API_URL + `profiles/${params.id}/posts`
  )
  return { profile: (await profile).data, posts: (await posts).data }
}

export default function ProfileDetail() {
  const { profile, posts }: { profile: Profile; posts: Post[] } =
    useLoaderData() as Awaited<ReturnType<typeof ProfileDetailLoader>>
  return (
    <>
      {profile && posts && (
        <>
          <Row id='profile-detail'>
            <Col xs={12} sm={4}>
              <div id="profile-image-wrapper">
              <Image
                fluid
                roundedCircle
                id='profile-image'
                src={profile.image}
                alt='profile image'
              />
              </div>
            </Col>
            <Col>
              <h2 className='d-flex'>
                {profile.name}
                {profile.is_owner && (
                  <Link
                    to='/profiles/edit'
                    role='button'
                    className='btn btn-primary ml-auto'
                  >
                    <i className='fa-regular fa-pen-to-square'></i>
                  </Link>
                )}
              </h2>
              <p>{profile.content}</p>
            </Col>
          </Row>
          <Row xs='2' md='3' id='profile-posts' className='mt-5'>
            {posts.map((post) => (
              <Col key={post.id}>
                <Card>
                  <Card.Img src={post.image} alt={post.title} />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}
