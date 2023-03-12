import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useUserInfoStore } from '../../Authentication/UserInfoContext'
import { Post } from '../../shared/models/Post.model'
import Utils from '../../shared/utils'
import LikeButton from '../LikeButton/LikeButton'
import ProfileLink from '../ProfileLink/ProfileLink'
import UserLikesModal, {
  UserLikesModalRef,
} from '../UserLikesModal/UserLikesModal'

/**
 * Props for Post Entry Component
 */
interface PostEntryProps {
  post: Post
  onCommentClick: () => unknown
  openable?: boolean
}

/**
 * Component for displaying a post
 * @param props Post Entry Props
 * @returns Post Entry Card
 */
export default function PostEntry({
  post,
  openable,
  onCommentClick,
}: PostEntryProps) {
  const navigate = useNavigate()
  const { loggedIn } = useUserInfoStore()

  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    post.number_of_likes
  )

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  // Reference to the User Likes Modal
  const userLikesModalRef = useRef<UserLikesModalRef>(null)

  /**
   * When the post like state changes, adjust like count accordingly
   * @param state new post like state
   */
  const handleLikeToggle = (state: boolean): void => {
    setNumberOfLikes(state ? numberOfLikes + 1 : numberOfLikes - 1)
  }

  /**
   * If post can be opened, navigate to the post detail page
   */
  const openPost = (): void => {
    if (openable) {
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <>
      <Card key={post.id} className='my-4'>
        <Card.Body>
          <Card.Text className='d-flex justify-content-between'>
            {/* Link to the author profile */}
            <ProfileLink
              id={post.profile_id}
              image={post.profile_image}
              name={post.profile_name}
            />
            {/* Times since post creation */}
            <span>{moment(post.created_at).fromNow()}</span>
          </Card.Text>
        </Card.Body>

        {/* Post image */}
        <Card.Img
          src={
            openable
              ? Utils.transformImage(
                  post.image,
                  false,
                  false,
                  800,
                  true,
                  false,
                  null
                )
              : Utils.transformImage(
                  post.image,
                  false,
                  false,
                  undefined,
                  false,
                  false
                )
          }
          className={openable ? 'c-pointer' : ''}
          onClick={openPost}
        />
        <Card.Body>
          <Card.Text className='w-100'>
            <Row>
              <Col
                xs={{span: 12, order: 2}}
                lg={{span: "auto", order: 1}}
                className='d-flex justify-content-around align-items-center'
              >
                {/* Like and Comment Buttons */}
                <LikeButton
                  post={post}
                  onToggle={handleLikeToggle}
                ></LikeButton>
                <Button
                  variant='link'
                  onClick={onCommentClick}
                  disabled={!loggedIn}
                >
                  <i className='fa-regular fa-message'></i>
                </Button>
              </Col>

              <Col
                xs={{span: 12, order: 3}}
                lg={{span: "auto", order: 2}}
                className='d-flex justify-content-around align-items-center'
              >
                {/* Number of likes and comments */}
                {numberOfLikes > 0 && (
                  <Button
                    variant='link'
                    className='ml-2'
                    onClick={() => userLikesModalRef.current?.open()}
                  >
                    {numberOfLikes} Like
                    {numberOfLikes !== 1 ? 's' : ''}
                  </Button>
                )}
                {post.number_of_comments > 0 && (
                  <Button variant='link' onClick={onCommentClick}>
                    {post.number_of_comments} Comment
                    {post.number_of_comments !== 1 ? 's' : ''}
                  </Button>
                )}
              </Col>

              <Col
                xs={{span: 12, order: 1}}
                lg={{order: 3}}
                className='d-flex justify-content-end align-items-center mb-3 mb-sm-0'
              >
                {/* Post mutation buttons if post owner */}
                {post.is_owner && !openable && (
                  <>
                    <Link
                      className='btn btn-link'
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
              </Col>
            </Row>
          </Card.Text>

          {/* Post title and description */}
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
      </Card>

      {/* Modal for confirming a post deletion */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete this Post: "{post.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Form
            method='delete'
            action='delete'
            onSubmit={() => setShowDeleteModal(false)}
          >
            <Button type='submit' variant='danger'>
              Delete
            </Button>
          </Form>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for displaying the list of users who liked the post */}
      <UserLikesModal postId={post.id} ref={userLikesModalRef} />
    </>
  )
}
