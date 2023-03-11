import React, { useEffect, useState } from 'react'
import { Button, Container, Image, Row } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../Components/Navigation/Navigation'
import './Root.scss'

export default function Root() {
  const [open, setOpen] = useState(false)
  let location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <Container fluid>
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
          <h1 id='brand-name'>
            <Image src='logo.png' />
            <span>Photora</span>
          </h1>
          <Navigation />

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
        <div id='content'>
          <Container>
            <Outlet />
          </Container>
        </div>
      </Row>
    </Container>
  )
}
