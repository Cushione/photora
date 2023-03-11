import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useUserInfoStore } from '../../Authentication/UserInfoContext';
import { Post } from '../../shared/models/Post.model'

/**
 * Props for the Like Button Component
 */
interface LikeButtonProps {
  post: Post
  onToggle?: (state: boolean) => any
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function LikeButton({ post, onToggle }: LikeButtonProps) {
  const [active, setActive] = useState<boolean>(post.has_liked)
  const { loggedIn } = useUserInfoStore()

  const toggleLike = async () => {
    const res = await axios.post(`posts/${post.id}/likes`)
    setActive(res.status === 201)
    onToggle?.(res.status === 201)
  }

  return (
    <Button
      disabled={!loggedIn}
      variant='link'
      onClick={toggleLike}
      className={`like-button ${active ? 'liked' : ''}`}
    >
      <i className={`${active ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
    </Button>
  )
}
