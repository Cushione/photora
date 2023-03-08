import axios from 'axios'
import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import { Post } from '../../shared/models/Post.model';
import Profile from '../../shared/models/Profile.model'
import './ProfileDetail.scss'

export async function loader({ params }: { params: { id: number } }) {
  const profile = axios.get<{ title: string }[]>(
    import.meta.env.VITE_API_URL + 'profiles/' + params.id
  )
  const posts = axios.get<{ title: string }[]>(
    import.meta.env.VITE_API_URL + `profiles/${params.id}/posts`
  )
  return { profile: (await profile).data, posts: (await posts).data }
}

export default function ProfileDetail() {
  const { profile, posts }: { profile: Profile; posts: Post[] } =
    useLoaderData() as {
      profile: Profile
      posts: Post[]
    }
  return (
    <>
      {profile && posts && (
        <>
          <Row id='profile-detail'>
            <Col xs={12} sm={4}>
              <Image
                fluid
                roundedCircle
                id='profile-image'
                src={profile.image}
                alt='profile image'
              />
            </Col>
            <Col>
              <h2>{profile.name}</h2>
              <p>{profile.content}</p>
            </Col>
          </Row>
          <Row xs='2' md='3' id='profile-posts' className='mt-5'>
            {posts.map((post) => (
              <Col>
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
