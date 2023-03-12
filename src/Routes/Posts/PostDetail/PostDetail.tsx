import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Form as RouterForm, Link, useLoaderData } from 'react-router-dom'
import { useUserInfoStore } from '../../../Authentication/UserInfoContext';
import CommentCard from '../../../Components/CommentCard/CommentCard'
import { showMessage } from '../../../Components/Messages/MessagesContext';
import PostEntry from '../../../Components/PostEntry/PostEntry'
import usePageTitle from '../../../shared/hooks/usePageTitle'
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
    showMessage({content: 'Comment posted'})
    return { comment }
  }
}

export default function PostDetail() {
  const { post, comments: initialComments } = useLoaderData() as Awaited<
    ReturnType<typeof PostDetailLoader>
  >

  const [comments, setComments] = useState<Comment[]>(initialComments.results)
  const [currentNext, setCurrentNext] = useState<string>(initialComments.next)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const commentInput = useRef<HTMLTextAreaElement | null>(null)
  const { loggedIn } = useUserInfoStore()

  usePageTitle(post.title)

  useEffect(() => {
    if (submitted) {
      if (commentInput.current) {
        commentInput.current.value = ''
        setSubmitted(false)
      }
    }
    setComments(
      initialComments.results
        .filter((c1) => !comments.find((c2) => c2.id === c1.id))
        .concat(comments)
    )
  }, [initialComments])

  const loadMoreComments = async () => {
    const url = new URL(currentNext)
    const newComments = (
      await axios.get<PaginatedResult<Comment>>(
        url.pathname.toString() + url.search.toString()
      )
    ).data
    setComments(
      comments.concat(
        newComments.results.filter(
          (c1) => !comments.find((c2) => c2.id === c1.id)
        )
      )
    )
    setCurrentNext(newComments.next)
  }

  return (
    <Container id='post-detail-container' className='mw-600'>
      {post && <PostEntry post={post} onCommentClick={() => commentInput.current?.focus()} />}
      <h2>Comments</h2>
      {loggedIn ? (
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
      ) : (
        <p>
          <Link to='/login'>Log in</Link> or&nbsp;
          <Link to='/register'>register</Link> to comment.
        </p>
      )}
      <hr />
      <InfiniteScroll
        dataLength={comments.length}
        next={loadMoreComments}
        hasMore={!!currentNext}
        loader={<h1>Loading</h1>}
      >
        {comments && comments.length ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </InfiniteScroll>
    </Container>
  )
}
