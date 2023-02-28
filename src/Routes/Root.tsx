import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import './Root.scss'

export default function Root() {
  const linkState = ({
    isActive,
    isPending,
  }: {
    isActive: boolean
    isPending: boolean
  }) => (isActive ? 'active' : isPending ? 'pending' : '')

  return (
    <Container fluid>
      <Row>
        <Col xs='1' md='2'>
          <h1>Photora</h1>
          <nav>
            <ul>
              <li>
                <NavLink to={`/`} className={linkState}>
                  Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </Col>
        <Col xs='11' md='10'>
          <Container>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  )
}
