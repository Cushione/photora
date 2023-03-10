import moment from 'moment'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Comment from '../../shared/models/Comment.model'
import ProfileLink from '../ProfileLink/ProfileLink'

interface CommentCardProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <Card className='mb-1'>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between'>
          <ProfileLink
            profileId={comment.profile_id}
            profileImage={comment.profile_image}
            profileName={comment.profile_name}
          />
          <div>
            <Button variant='link'>
              <i className='fa-regular fa-pen-to-square'></i>
            </Button>
          </div>
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {moment(comment.created_at).fromNow()}
        </Card.Subtitle>
        <Card.Text>{comment.content}</Card.Text>
      </Card.Body>
    </Card>
  )
}
