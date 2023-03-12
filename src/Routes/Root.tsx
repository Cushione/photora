import React, { useEffect, useState } from 'react'
import { Button, Container, Image, Row } from 'react-bootstrap'
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from 'react-router-dom'
import Navigation from '../Components/Navigation/Navigation'
import './Root.scss'

/**
 * Root component, providing general page layout
 * @returns Root layout component
 */
export default function Root() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigation = useNavigation()

  // For small screens, hide sidebar on every route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <Container fluid>
      {/* Sidebar toggle for small screens */}
      <Button
        as={'a'}
        variant='light'
        id='sidebar-toggle-mobile'
        className='nav-link'
        onClick={() => setOpen(!open)}
      >
        <i
          className={`fa-solid ${open ? 'fa-angles-left' : 'fa-angles-right'}`}
        ></i>
      </Button>
      <Row>
        <div id='sidebar' className={open ? 'open' : ''}>
          {/* Brand name and logo */}
          <h1 id='brand-name'>
            <Image src='/logo.png' />
            <span>Photora</span>
          </h1>
          <Navigation />

          {/* Sidebar toggle for medium screens */}
          <Button
            as={'a'}
            variant='link'
            id='sidebar-toggle'
            className='nav-link'
            onClick={() => setOpen(!open)}
          >
            <i
              className={`fa-solid ${
                open ? 'fa-angles-left' : 'fa-angles-right'
              }`}
            ></i>
          </Button>
        </div>
        <div
          id='content'
          className={navigation.state === 'loading' ? 'loading' : ''}
        >
          <Container>
            <Outlet />
          </Container>
        </div>
      </Row>

      <ScrollRestoration />
    </Container>
  )
}
