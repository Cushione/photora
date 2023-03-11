import axios from 'axios'
import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { Link, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { useUserInfoStore } from '../../../Authentication/UserInfoContext'
import FollowButton from '../../../Components/FollowButton/FollowButton'
import usePageTitle from '../../../shared/hooks/usePageTitle'
import { Post } from '../../../shared/models/Post.model'
import Profile from '../../../shared/models/Profile.model'
import './ProfileDetail.scss'

export async function ProfileDetailLoader({
  params,
}: {
  params: { id: number }
}) {
  const profile = axios.get<Profile>('profiles/' + params.id)
  const posts = axios.get<Post[]>(`profiles/${params.id}/posts`)
  return { profile: (await profile).data, posts: (await posts).data }
}

export async function ProfileUserDetailLoader() {
  if (!useUserInfoStore.getState().loggedIn) {
    return redirect('/login')
  }
  const profile = await axios.get<Profile>('profiles/user')
  const posts = axios.get<Post[]>(`profiles/${profile.data.id}/posts`)
  return { profile: profile.data, posts: (await posts).data }
}

export default function ProfileDetail() {
  const { profile, posts }: { profile: Profile; posts: Post[] } =
    useLoaderData() as Awaited<ReturnType<typeof ProfileDetailLoader>>

  const navigate = useNavigate()
  usePageTitle(profile.name)

  const openPost = (id: number) => {
    navigate(`/posts/${id}`)
  }

  return (
    <>
      {profile && posts && (
        <>
          <Row id='profile-detail'>
            <Col xs={12} sm={4} id='profile-image-column'>
              <div id='profile-image-wrapper'>
                <Image
                  fluid
                  roundedCircle
                  id='profile-image'
                  src={profile.image}
                  alt='profile image'
                />
              </div>
            </Col>
            <Col xs={12} sm={8}>
              <h2 className='d-flex'>
                <span id='profile-name'>{profile.name}</span>
                {profile.is_owner ? (
                  <Link
                    to='/profiles/edit'
                    role='button'
                    className='btn btn-primary ml-auto'
                  >
                    <i className='fa-regular fa-pen-to-square'></i>
                  </Link>
                ) : (
                  <FollowButton
                    profile_id={profile.id}
                    is_followed={profile.is_followed}
                  />
                )}
              </h2>
              <p>{profile.content}</p>
            </Col>
          </Row>
          <Row xs='2' md='3' id='profile-posts' className='mt-5'>
            {posts.map((post) => (
              <Col key={post.id}>
                <Card
                  className='c-pointer profile-post'
                  onClick={() => openPost(post.id)}
                >
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
