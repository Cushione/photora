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
        <Nav.Link as={NavLink} to={`/`} className={linkState}>
          {userProfile.name}
        </Nav.Link>
      )}
      <Nav.Link as={NavLink} to={`/`} className={linkState}>
        Home
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
