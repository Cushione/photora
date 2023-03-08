import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Post } from '../../shared/models/Post.model';
import './LikeButton.scss'

interface LikeButtonProps {
    post: Post,
    onToggle?: (state: boolean) => any
}

export default function LikeButton({post, onToggle}: LikeButtonProps) {
    const [active, setActive] = useState<boolean>(post.has_liked)

    const toggleLike = async () => {
        const res = await axios.post(import.meta.env.VITE_API_URL + `posts/${post.id}/likes`)
        setActive(res.status === 201)
        onToggle?.(res.status === 201)
    }

  return (
    <Button variant='light' onClick={toggleLike} className={`like-button ${active ? 'liked' : ''}`}>
      <i className={`${active ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
    </Button>
  )
}
