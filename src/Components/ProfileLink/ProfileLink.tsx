import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Utils from '../../shared/utils'
import './ProfileLink.scss'

/**
 * Props for Profile Link Component
 */
interface ProfileLinkProps {
  id: number
  image: string
  name: string
}

/**
 * Component for displaying a link to the profile page of
 * a provided profile
 * @param profile Profile Link Props
 * @returns Profile Link
 */
export default function ProfileLink(profile: ProfileLinkProps) {
  return (
    <Link to={`/profiles/${profile.id}`} className='post-list-profile-link'>
      <Image
        className='post-list-avatar'
        src={Utils.transformImage(profile.image, true, true, 100)}
      />
      <span className='ml-2'>{profile.name}</span>
    </Link>
  )
}
