import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { UserInfoContext } from '../../Authentication/Authentication'
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
        <Nav.Link id='nav-user' as={NavLink} to={`/profiles/${userProfile.id}`} className={linkState}>
          <img id='nav-avatar' src={userProfile.image}></img> {userProfile.name}
        </Nav.Link>
      )}
      <Nav.Link as={NavLink} to={`/`} className={linkState}>
      <i className="fa-solid fa-house fa-xl"></i>&nbsp;Home
      </Nav.Link>

      <Nav.Link as={NavLink} to={`/posts`} className={linkState}>
      <i className="fa-regular fa-compass fa-xl"></i>&nbsp;Explore
      </Nav.Link>
      
      {!userProfile && (
        <>
          <Nav.Link as={NavLink} to={`/login`} className={linkState}>
            Login
          </Nav.Link>

          <Nav.Link as={NavLink} to={`/register`} className={linkState}>
            Register
          </Nav.Link>
        </>
      )}
    </Nav>
  )
}
