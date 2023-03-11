import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

/**
 * Props for the Follow Button Component
 */
interface FollowButtonProps {
  profile_id: number
  is_followed: boolean
  size?: 'sm' | 'lg'
}

/**
 * Component for handling profile follows
 * Allows the user to toggle the follow state of the provided
 * profile. Handles the request and state.
 * @param props Follow Button Props
 * @returns Follow button
 */
export default function FollowButton({
  is_followed,
  profile_id,
  size,
}: FollowButtonProps) {
  const [isFollowed, setIsFollowed] = useState<boolean>(is_followed)

  /**
   * Send follow request and update state according to response
   */
  const followProfile = async (): Promise<void> => {
    axios.post(`profiles/${profile_id}/followers`).then((res) => {
      setIsFollowed(res.status === 201)
    })
  }

  return (
    <Button
      size={size}
      onClick={followProfile}
      variant={isFollowed ? 'light' : 'primary'}
      className='ml-auto'
    >
      {isFollowed ? 'Following' : 'Follow'}
    </Button>
  )
}
