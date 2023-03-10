import moment from 'moment';
import React from 'react';
import { Card } from "react-bootstrap";
import Comment from '../../shared/models/Comment.model';
import ProfileLink from '../ProfileLink/ProfileLink';

interface CommentCardProps {
    comment: Comment
}

export default function CommentCard({comment}: CommentCardProps) {
    return (
        <Card className='mb-1'>
            <Card.Body>
              <Card.Title>
                <ProfileLink
                  profileId={comment.profile_id}
                  profileImage={comment.profile_image}
                  profileName={comment.profile_name}
                />
              </Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {moment(comment.created_at).fromNow()}
              </Card.Subtitle>
              <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
          </Card>
    )
}