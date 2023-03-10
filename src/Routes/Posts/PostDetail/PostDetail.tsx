import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Form as RouterForm, useLoaderData } from 'react-router-dom'
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

export async function PostDetailAction({ request, params }) {
  if (request.method.toLowerCase() === 'post') {
    const { content } = Object.fromEntries(await request.formData())
    const comment = await axios.post(`posts/${params.id}/comments`, { content })
    return { comment }
  }
}

export default function PostDetail() {
  const { post, comments } = useLoaderData() as Awaited<
    ReturnType<typeof PostDetailLoader>
  >

  const [submitted, setSubmitted] = useState<boolean>(false)
  const commentInput = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (submitted) {
      if (commentInput.current) {
        commentInput.current.value = ''
        setSubmitted(false)
      }
    }
  }, [comments])

  return (
    <Container id='post-detail-container'>
      {post && <PostEntry post={post} onCommentClick={() => void 0} />}
      <h2>Comments</h2>
      <RouterForm method='post' onSubmit={() => setSubmitted(true)}>
        <Form.Group controlId='commentFormContent'>
          <Form.Label srOnly={true}>Comment Content</Form.Label>
          <Form.Control
            ref={commentInput}
            required
            as='textarea'
            rows={2}
            name='content'
            placeholder='Enter your comment'
          />
        </Form.Group>
        <div className='d-flex justify-content-end'>
          <Button disabled={submitted} type='submit'>
            {submitted ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </RouterForm>
      <hr />
      {comments && comments.results.length ? (
        comments.results.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </Container>
  )
}
