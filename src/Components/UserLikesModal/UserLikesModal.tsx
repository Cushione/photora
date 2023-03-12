import axios from 'axios'
import React, { useState, useImperativeHandle, Ref } from 'react'
import { forwardRef } from 'react'
import { Modal } from 'react-bootstrap'
import { useUserInfoStore } from '../../Authentication/UserInfoContext';
import FollowButton from '../FollowButton/FollowButton'
import ProfileLink from '../ProfileLink/ProfileLink'

interface UserLike {
  is_followed: boolean
  profile_id: number
  profile_image: string
  profile_name: string
  is_owner: boolean
}

interface UserLikesModalProps {
  postId: number
}

export interface UserLikesModalRef {
  open: () => void
}

function UserLikesModal(
  { postId }: UserLikesModalProps,
  ref: Ref<UserLikesModalRef>
) {
  const [showUserLikesModal, setShowUserLikesModal] = useState<boolean>(false)
  const [userLikes, setUserLikes] = useState<UserLike[] | null>(null)
  const {loggedIn} = useUserInfoStore()

  useImperativeHandle(ref, () => ({
    open,
  }))

  const open = () => {
    setUserLikes(null)
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
                profileId={user.profile_id}
                profileImage={user.profile_image}
                profileName={user.profile_name}
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

export default forwardRef(UserLikesModal)
