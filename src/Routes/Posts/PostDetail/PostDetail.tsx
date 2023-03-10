import axios from 'axios'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import CommentCard from '../../../Components/CommentCard/CommentCard'
import PostEntry from '../../../Components/PostEntry/PostEntry'
import Comment from '../../../shared/models/Comment.model'
import { PaginatedResult } from '../../../shared/models/PaginatedResponse.model'
import { Post } from '../../../shared/models/Post.model'
import './PostDetail.scss'

export async function PostDetailLoader({ params }: { params: { id: number } }) {
  const post = axios.get<Post>('posts/' + params.id)
  const comments = axios.get<PaginatedResult<Comment>>(
    'posts/' + params.id + '/comments'
  )
  return { post: (await post).data, comments: (await comments).data }
}

export default function PostDetail() {
  const { post, comments } = useLoaderData() as Awaited<
    ReturnType<typeof PostDetailLoader>
  >

  return (
    <Container id='post-detail-container'>
      {post && <PostEntry post={post} onCommentClick={() => void 0} />}
      <h2>Comments</h2>
      {comments && comments.results.length ? (
        comments.results.map((comment) => <CommentCard comment={comment} />)
      ) : (
        <p>No comments yet</p>
      )}
    </Container>
  )
}
