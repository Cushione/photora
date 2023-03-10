import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { UserInfoContext } from '../../Authentication/UserInfoContext'
import { Post } from '../../shared/models/Post.model'

interface LikeButtonProps {
  post: Post
  onToggle?: (state: boolean) => any
}

export default function LikeButton({ post, onToggle }: LikeButtonProps) {
  const [active, setActive] = useState<boolean>(post.has_liked)
  const { userProfile } = useContext(UserInfoContext)

  const toggleLike = async () => {
    const res = await axios.post(`posts/${post.id}/likes`)
    setActive(res.status === 201)
    onToggle?.(res.status === 201)
  }

  return (
    <Button
      disabled={!userProfile}
      variant='link'
      onClick={toggleLike}
      className={`like-button ${active ? 'liked' : ''}`}
    >
      <i className={`${active ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
    </Button>
  )
}
