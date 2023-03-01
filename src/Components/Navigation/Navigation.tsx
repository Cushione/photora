import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'

export default function Navigation() {
  const linkState = ({
    isActive,
    isPending,
  }: {
    isActive: boolean
    isPending: boolean
  }) => (isActive ? 'active' : isPending ? 'pending' : '')

  return (
    <Nav className='flex-column' id='main-navigation'>
      <Nav.Link as={NavLink} to={`/`} className={linkState}>
        Home
      </Nav.Link>

      <Nav.Link as={NavLink} to={`/login`} className={linkState}>
        Login
      </Nav.Link>

      <Nav.Link as={NavLink} to={`/register`} className={linkState}>
        Register
      </Nav.Link>
    </Nav>
  )
}
