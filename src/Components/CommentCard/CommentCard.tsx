import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import Comment from '../../shared/models/Comment.model'
import ProfileLink from '../ProfileLink/ProfileLink'

interface CommentCardProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [commentText, setCommentText] = useState(comment.content)
  const [content, setContent] = useState(comment.content)
  const [loading, setLoading] = useState<boolean>(false)

  const updateComment = () => {
    setLoading(true)
    axios
      .put<Comment>(`posts/${comment.post}/comments/${comment.id}`, { content })
      .then((res) => {
        setLoading(false)
        setShowForm(false)
        setCommentText(res.data.content)
      })
  }

  return (
    <Card className='mb-1'>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between'>
          <ProfileLink
            profileId={comment.profile_id}
            profileImage={comment.profile_image}
            profileName={comment.profile_name}
          />
          <div>
            <Button
              disabled={loading}
              size='sm'
              variant={showForm ? 'primary' : 'link'}
              onClick={() => setShowForm(!showForm)}
            >
              <i className='fa-regular fa-pen-to-square'></i>
            </Button>
          </div>
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {moment(comment.created_at).fromNow()}
        </Card.Subtitle>
        {showForm ? (
          <Form>
            <Form.Group controlId='commentFormContent'>
              <Form.Label srOnly={true}>Comment Content</Form.Label>
              <Form.Control
                required
                as='textarea'
                name='content'
                placeholder='Enter your comment'
                disabled={loading}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>
            <div className='d-flex justify-content-end'>
              <Button size='sm' disabled={loading} onClick={updateComment}>
                Save
              </Button>
              <Button
                className='ml-2'
                size='sm'
                variant='secondary'
                disabled={loading}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <Card.Text>{commentText}</Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}
