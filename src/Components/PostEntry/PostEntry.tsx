import moment from 'moment'
import React, { useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Post } from '../../shared/models/Post.model'
import LikeButton from '../LikeButton/LikeButton'
import ProfileLink from '../ProfileLink/ProfileLink'

interface PostEntryProps {
  post: Post
  onCommentClick: () => any
  openable?: boolean
}
export default function PostEntry({ post, openable, onCommentClick }: PostEntryProps) {
  const navigate = useNavigate()

  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    post.number_of_likes
  )

  const handleLikeToggle = (state: boolean) => {
    setNumberOfLikes(state ? numberOfLikes + 1 : numberOfLikes - 1)
  }

  const openPost = () => {
    if (openable) {
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <Card key={post.id} className='my-4'>
      <Card.Body>
        <Card.Text className='d-flex justify-content-between'>
          <ProfileLink
            profileId={post.profile_id}
            profileImage={post.profile_image}
            profileName={post.profile_name}
          />
          <span>{moment(post.created_at).fromNow()}</span>
        </Card.Text>
      </Card.Body>
      <Card.Img
        src={post.image}
        className={openable ? 'c-pointer' : ''}
        onClick={openPost}
      />
      <Card.Body>
        <Card.Text className='d-flex'>
          <LikeButton post={post} onToggle={handleLikeToggle}></LikeButton>
          <Button variant='link' onClick={onCommentClick}>
            <i className='fa-regular fa-message'></i>
          </Button>
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
