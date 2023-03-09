import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ProfileLink.scss'

interface ProfileLinkProps {
  profileId: number
  profileImage: string
  profileName: string
}

export default function ProfileLink({
  profileId,
  profileImage,
  profileName,
}: ProfileLinkProps) {
  return (
    <Link to={`/profiles/${profileId}`} className='post-list-profile-link'>
      <Image className='post-list-avatar' src={profileImage} />
      <span className='ml-2'>{profileName}</span>
    </Link>
  )
}
