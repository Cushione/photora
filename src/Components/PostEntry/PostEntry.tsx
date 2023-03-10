import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Button, Card, Image, Modal } from 'react-bootstrap'
import { Form, Link, useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../../Authentication/UserInfoContext'
import { Post } from '../../shared/models/Post.model'
import LikeButton from '../LikeButton/LikeButton'
import ProfileLink from '../ProfileLink/ProfileLink'

interface PostEntryProps {
  post: Post
  onCommentClick: () => any
  openable?: boolean
}
export default function PostEntry({
  post,
  openable,
  onCommentClick,
}: PostEntryProps) {
  const navigate = useNavigate()
  const { userProfile } = useContext(UserInfoContext)

  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    post.number_of_likes
  )

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const handleLikeToggle = (state: boolean) => {
    setNumberOfLikes(state ? numberOfLikes + 1 : numberOfLikes - 1)
  }

  const openPost = () => {
    if (openable) {
      navigate(`/posts/${post.id}`)
    }
  }

  const handleClose = () => {
    setShowDeleteModal(false)
  }

  const handleDelete = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <Card key={post.id} className='my-4'>
        <Card.Body>
          <Card.Text className='d-flex justify-content-between'>
            <ProfileLink
              profileId={post.profile_id}
              profileImage={post.profile_image}
              profileName={post.profile_name}
            />
            <span>{moment(post.created_at).fromNow()}</span>
          </Card.Text>
        </Card.Body>
        <Card.Img
          src={post.image}
          className={openable ? 'c-pointer' : ''}
          onClick={openPost}
        />
        <Card.Body>
          <Card.Text className='d-flex'>
            <LikeButton post={post} onToggle={handleLikeToggle}></LikeButton>
            <Button
              variant='link'
              onClick={onCommentClick}
              disabled={!userProfile}
            >
              <i className='fa-regular fa-message'></i>
            </Button>
            {numberOfLikes > 0 && (
              <Button variant='link' className='ml-2'>
                {numberOfLikes} Like
                {numberOfLikes !== 1 ? 's' : ''}
              </Button>
            )}
            {post.number_of_comments > 0 && (
              <Button
                variant='link'
                onClick={onCommentClick}
              >
                {post.number_of_comments} Comment
                {post.number_of_comments !== 1 ? 's' : ''}
              </Button>
            )}
            {post.is_owner && !openable && (
              <>
                <Link
                  className='ml-auto btn btn-link'
                  to={`/posts/${post.id}/edit`}
                >
                  <i className='fa-regular fa-pen-to-square'></i>
                </Link>
                <Button
                  variant='link'
                  className='text-danger'
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i className='fa-regular fa-trash-can'></i>
                </Button>
              </>
            )}
          </Card.Text>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
      </Card>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete this Post: "{post.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Form method='delete' action='delete'>
            <Button type='submit' variant='danger' onClick={handleDelete}>
              Delete
            </Button>
          </Form>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
