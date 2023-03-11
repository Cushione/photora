import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import Comment from '../../shared/models/Comment.model'
import { useShowMessage } from '../Messages/MessagesContext'
import ProfileLink from '../ProfileLink/ProfileLink'

/**
 * Props for the Comment Card Component
 */
interface CommentCardProps {
  comment: Comment
}

/**
 * Component to display an comment
 * @param props Comment Card Props
 * @returns Comment Card
 */
export default function CommentCard({ comment }: CommentCardProps) {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [commentText, setCommentText] = useState(comment.content)
  const [content, setContent] = useState(comment.content)
  const [loading, setLoading] = useState<boolean>(false)
  const [deleted, setDeleted] = useState<boolean>(false)
  const showMessage = useShowMessage()

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  /**
   * Update Comment Handler
   * Send update request. On success, hide form,
   * update comment text and show message
   */
  const updateComment = (): void => {
    setLoading(true)
    axios
      .put<Comment>(`posts/${comment.post}/comments/${comment.id}`, { content })
      .then((res) => {
        setLoading(false)
        setShowForm(false)
        setCommentText(res.data.content)
        showMessage({ content: 'Comment updated' })
      })
  }

  /**
   * Delete Comment Handler
   * Send delete request. On success, hide form and
   * confirm modal, mark comment as deleted and show
   * message
   */
  const deleteComment = (): void => {
    setLoading(true)
    axios
      .delete<void>(`posts/${comment.post}/comments/${comment.id}`)
      .then(() => {
        setLoading(false)
        setShowForm(false)
        setDeleted(true)
        setShowDeleteModal(false)
        showMessage({ content: 'Comment deleted' })
      })
  }

  /**
   * Handle Modal Close
   * Close modal if no request is currently active
   */
  const handleClose = () => {
    if (!loading) {
      setShowDeleteModal(false)
    }
  }

  return (
    <>
      <Card className='mb-1' hidden={deleted}>
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            {/* Author Profile Link */}
            <ProfileLink
              profileId={comment.profile_id}
              profileImage={comment.profile_image}
              profileName={comment.profile_name}
            />

            {/* If owner, show comment manipulation buttons */}
            {comment.is_owner && (
              <div>
                <Button
                  hidden={showForm}
                  disabled={loading}
                  size='sm'
                  variant='link'
                  className='text-danger mr-1'
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i className='fa-regular fa-trash-can'></i>
                </Button>
                <Button
                  disabled={loading}
                  size='sm'
                  variant={showForm ? 'primary' : 'link'}
                  onClick={() => setShowForm(!showForm)}
                >
                  <i className='fa-regular fa-pen-to-square'></i>
                </Button>
              </div>
            )}
          </Card.Title>

          {/* Comment creation timestamp */}
          <Card.Subtitle className='mb-2 text-muted'>
            {moment(comment.created_at).fromNow()}
          </Card.Subtitle>

          {/* Inline form or comment text that can be toggle by the user */}
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

      {/* Modal for confirming the deletion of a comment */}
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete your comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' disabled={loading} onClick={deleteComment}>
            Delete
          </Button>
          <Button variant='secondary' disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
