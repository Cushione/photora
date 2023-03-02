import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../Components/Navigation/Navigation'
import './Root.scss'

export default function Root() {
  const [open, setOpen] = useState(false)
  let location = useLocation();

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
      <Container fluid>
        <Row>
          <Button id='sidebar-toggle' onClick={() => setOpen(!open)}>
            Open
          </Button>
          <div id='sidebar' className={open ? 'open' : ''}>
            <h1>Photora</h1>
            <Navigation />
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
