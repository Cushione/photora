import axios from 'axios'
import React, { useState, useImperativeHandle, Ref } from 'react'
import { forwardRef } from 'react'
import { Modal } from 'react-bootstrap'
import { useUserInfoStore } from '../../Authentication/UserInfoContext'
import { UserLike } from '../../shared/models/UserLike.model'
import FollowButton from '../FollowButton/FollowButton'
import ProfileLink from '../ProfileLink/ProfileLink'

/**
 * User Likes Modal Component Props
 */
interface UserLikesModalProps {
  postId: number
}

/**
 * User Likes Modal Reference Type
 * Provides information to the parent component about
 * the type of data exposed by the forwardRef
 */
export interface UserLikesModalRef {
  open: () => void
}

/**
 * Component for displaying a list of users that liked the
 * provided post. Implements a Follow Button which allows
 * logged in user to follow any of the listed users
 * @param props User Likes Modal Props
 * @param ref Reference to the component. Used by parent component
 * @returns Modal with list of user likes
 */
function UserLikesModal(
  { postId }: UserLikesModalProps,
  ref: Ref<UserLikesModalRef>
) {
  const [showUserLikesModal, setShowUserLikesModal] = useState<boolean>(false)
  const [userLikes, setUserLikes] = useState<UserLike[] | null>(null)
  const { loggedIn } = useUserInfoStore()

  // Defines the values that should be exposed to the parent component
  useImperativeHandle(ref, () => ({
    open,
  }))

  /**
   * Opens the modal and updates the list of user likes
   */
  const open = (): void => {
    setShowUserLikesModal(true)
    axios
      .get<UserLike[]>(`posts/${postId}/likes`)
      .then((res) => setUserLikes(res.data))
  }

  return (
    <Modal
      centered
      size='sm'
      show={showUserLikesModal}
      onHide={() => setShowUserLikesModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userLikes ? (
          userLikes.map((user) => (
            <div className='d-flex justify-content-between mb-3'>
              <ProfileLink
                id={user.profile_id}
                image={user.profile_image}
                name={user.profile_name}
              />
              {loggedIn && !user.is_owner && (
                <FollowButton size='sm' {...user} />
              )}
            </div>
          ))
        ) : (
          <p className='text-center p-4'>
            <i className='fa-solid fa-circle-notch fa-spin fa-2xl'></i>
          </p>
        )}
      </Modal.Body>
    </Modal>
  )
}

// Export the component together with a reference to it
export default forwardRef(UserLikesModal)
