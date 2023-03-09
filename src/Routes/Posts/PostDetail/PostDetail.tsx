import axios from 'axios'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import PostEntry from '../../../Components/PostEntry/PostEntry'
import { Post } from '../../../shared/models/Post.model'
import './PostDetail.scss'

export async function PostDetailLoader({ params }: { params: { id: number } }) {
  const post = (
    await axios.get<Post>(import.meta.env.VITE_API_URL + 'posts/' + params.id)
  ).data
  return { post }
}

export default function PostDetail() {
  const { post }: { post: Post } = useLoaderData() as Awaited<
    ReturnType<typeof PostDetailLoader>
  >

  return (
    <Container id='post-detail-container'>
      {post && <PostEntry post={post} onCommentClick={() => void 0} />}
      <h2>Comments</h2>
    </Container>
  )
}
