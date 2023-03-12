import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
 * @param props Profile Link Props
 * @returns Profile Link
 */
export default function ProfileLink(profile: ProfileLinkProps) {
  return (
    <Link to={`/profiles/${profile.id}`} className='post-list-profile-link'>
      <Image className='post-list-avatar' src={profile.image} />
      <span className='ml-2'>{profile.name}</span>
    </Link>
  )
}
