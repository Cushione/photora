import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

interface FollowButtonProps {
  profile_id: number
  is_followed: boolean
  size?: 'sm' | 'lg'
}

export default function FollowButton({
  is_followed,
  profile_id,
  size,
}: FollowButtonProps) {
  const [isFollowed, setIsFollowed] = useState<boolean>(is_followed)

  const followProfile = async () => {
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
