import moment from 'moment'
import React, { useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Post } from '../../shared/models/Post.model'
import LikeButton from '../LikeButton/LikeButton'

interface PostEntryProps {
  post: Post
}
export default function PostEntry({ post }: PostEntryProps) {
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    post.number_of_likes
  )

  const handleLikeToggle = (state: boolean) => {
    setNumberOfLikes(state ? numberOfLikes + 1 : numberOfLikes - 1)
  }

  return (
    <Card key={post.id} className='m-4'>
      <Card.Body>
        <Card.Text className='d-flex justify-content-between'>
          <Link
            to={`/profiles/${post.profile_id}`}
            className='post-list-profile-link'
          >
            <Image className='post-list-avatar' src={post.profile_image} />
            <span className='ml-2'>{post.profile_name}</span>
          </Link>
          <span>{moment(post.created_at).fromNow()}</span>
        </Card.Text>
      </Card.Body>
      <Card.Img src={post.image} />
      <Card.Body>
        <Card.Text className='d-flex'>
          <LikeButton
            post={post}
            onToggle={handleLikeToggle}
          ></LikeButton>
          <Link to={`/posts/${post.id}#comment`} className='btn btn-light ml-2'>
            <i className='fa-regular fa-message'></i>
          </Link>
          {numberOfLikes > 0 && (
            <Button variant='link' className='ml-2'>
              {numberOfLikes} Like
              {numberOfLikes !== 1 ? 's' : ''}
            </Button>
          )}
        </Card.Text>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}
