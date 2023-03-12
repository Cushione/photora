import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useUserInfoStore } from '../../Authentication/UserInfoContext';
import { Post } from '../../shared/models/Post.model'

/**
 * Props for Like Button Component
 */
interface LikeButtonProps {
  post: Post
  onToggle?: (state: boolean) => unknown
}

/**
 * Component for handling post likes
 * Allows the user to toggle the like state of the provided
 * post. Handles the request and state.
 * @param props Like Button Props 
 * @returns Like Button
 */
export default function LikeButton({ post, onToggle }: LikeButtonProps) {
  const [active, setActive] = useState<boolean>(post.has_liked)
  const { loggedIn } = useUserInfoStore()

  /**
   * Send like request and update state according to response
   */
  const toggleLike = async (): Promise<void> => {
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
