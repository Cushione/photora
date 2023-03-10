import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { UserInfoContext } from '../../Authentication/UserInfoContext'
import './Navigation.scss'

export default function Navigation() {
  const { userProfile } = useContext(UserInfoContext)

  const linkState = ({
    isActive,
    isPending,
  }: {
    isActive: boolean
    isPending: boolean
  }) => (isActive ? 'active' : isPending ? 'pending' : '')

  return (
    <Nav className='flex-column' id='main-navigation'>
      {userProfile && (
        <Nav.Link
          id='nav-user'
          as={NavLink}
          to={`/profiles/${userProfile.id}`}
          className={linkState}
        >
          <img id='nav-avatar' className='fa-fw' src={userProfile.image}></img>{' '}
          {userProfile.name}
        </Nav.Link>
      )}
      <Nav.Link as={NavLink} to={`/`} className={linkState}>
        <i className='fa-solid fa-house fa-fw'></i>Home
      </Nav.Link>

      <Nav.Link as={NavLink} to={`/search`} className={linkState}>
        <i className='fa-solid fa-magnifying-glass fa-fw'></i>Search
      </Nav.Link>

      <Nav.Link as={NavLink} to={`/explore`} className={linkState}>
        <i className='fa-regular fa-compass fa-fw'></i>Explore
      </Nav.Link>

      {userProfile && (
        <>
          <Nav.Link as={NavLink} to={`/liked`} className={linkState}>
            <i className='fa-regular fa-heart fa-fw'></i>Liked
          </Nav.Link>
          <Nav.Link as={NavLink} to={`/posts/create`} className={linkState}>
            <i className='fa-regular fa-square-plus fa-fw'></i>Create
          </Nav.Link>
          <Nav.Link as={NavLink} to={`/logout`} className={linkState}>
            <i className='fa-solid fa-arrow-right-from-bracket fa-fw'></i>
            Logout
          </Nav.Link>
        </>
      )}

      {!userProfile && (
        <>
          <Nav.Link as={NavLink} to={`/login`} className={linkState}>
            <i className='fa-solid fa-arrow-right-to-bracket fa-fw'></i>
            Login
          </Nav.Link>

          <Nav.Link as={NavLink} to={`/register`} className={linkState}>
            <i className='fa-solid fa-user-plus fa-fw'></i>Register
          </Nav.Link>
        </>
      )}
    </Nav>
  )
}
