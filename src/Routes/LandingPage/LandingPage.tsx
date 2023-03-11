import React, { useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './LandingPage.scss'

export default function LandingPage() {
  const features = useRef<any>()

  const goToFeatures = () => {
    features.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className='jumbotron text-white text-center'>
        <h1 className='display-1 mb-5'>PHOTORA</h1>
        <div
          id='icon-scroll'
          className='c-pointer'
          onClick={goToFeatures}
        ></div>
      </div>
      <Container ref={features} id='features' className='text-center'>
        <Row>
          <Col sm={4}>
            <i className='fa-solid fa-camera-retro'></i>
            <h2>Share</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              nunc quis diam ultrices malesuada eget sit amet nunc.
            </p>
          </Col>

          <Col sm={4}>
            <i className='fa-solid fa-user-group'></i>
            <h2>Connect</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              nunc quis diam ultrices malesuada eget sit amet nunc.
            </p>
          </Col>

          <Col sm={4}>
            <i className='fa-solid fa-compass'></i>
            <h2>Explore</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              nunc quis diam ultrices malesuada eget sit amet nunc.
            </p>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <h2 className='mb-5'>Enjoy the world of photography</h2>
            <p className='lead-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              nunc quis diam ultrices malesuada eget sit amet nunc. Aliquam
              dignissim laoreet nibh, at mattis mauris accumsan id. Aliquam
              porta rhoncus consectetur. Etiam convallis elit commodo leo
              feugiat ultricies. Aliquam rhoncus tortor lacus, quis aliquet urna
              mollis eget.
            </p>
          </Col>
        </Row>
        <Row sm={3}>
          <Col>
            <Link
              className='btn btn-primary btn-lg'
              role='button'
              to='/register'
            >
              Register
            </Link>
          </Col>

          <Col>
            <Link
              className='btn btn-primary btn-lg'
              role='button'
              to='/login'
            >
              Login
            </Link>
          </Col>

          <Col>
            <Link
              className='btn btn-primary btn-lg'
              role='button'
              to='/explore'
            >
              Browse
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
