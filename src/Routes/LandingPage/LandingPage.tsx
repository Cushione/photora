import moment from 'moment'
import React, { useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import usePageTitle from '../../shared/hooks/usePageTitle'
import './LandingPage.scss'

/**
 * Landing page component rendering static content
 * @returns Landing Page
 */
export default function LandingPage() {
  const features = useRef<any>()

  usePageTitle('Photora', true)

  /**
   * Scroll to the features section on the page
   */
  const goToFeatures = (): void => {
    features.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
    
      {/* Jumbotron */}
      <div className='jumbotron text-white text-center'>
        <h1 className='display-1 mb-5'>PHOTORA</h1>
        {/* Icon copied from https://codemyui.com/scroll-icon-animation/ */}
        <div
          id='icon-scroll'
          className='c-pointer'
          onClick={goToFeatures}
        ></div>
      </div>

      {/* Features Section */}
      <Container ref={features} id='features' className='text-center'>
        <Row>
          <Col sm={4} className='my-4'>
            <i className='fa-solid fa-camera-retro'></i>
            <h2>Share</h2>
            <p>Share your best moments with people around the world.</p>
          </Col>

          <Col sm={4} className='my-4'>
            <i className='fa-solid fa-user-group'></i>
            <h2>Connect</h2>
            <p>Get in touch with people and make new friends.</p>
          </Col>

          <Col sm={4} className='my-4'>
            <i className='fa-solid fa-compass'></i>
            <h2>Discover</h2>
            <p>
              Explore and create your own unique catalog of stunning images.
            </p>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <h2 className='mb-5'>Enjoy the world of photography</h2>
            <p className='lead-text'>
              Are you ready to dive into an ocean of colors?
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p id='cta-line' className='mb-5 font-weight-bold'>
              Get started now!
            </p>
          </Col>
          <Col sm={4} className='my-4'>
            <Link
              className='btn btn-primary btn-lg'
              role='button'
              to='/register'
            >
              Register
            </Link>
          </Col>

          <Col sm={4} className='my-4'>
            <Link className='btn btn-primary btn-lg' role='button' to='/login'>
              Login
            </Link>
          </Col>

          <Col sm={4} className='my-4'>
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
      
      {/* Footer */}
      <Container fluid>
        <Row
          id='footer'
          className='text-white text-center bg-gradient-secondary'
        >
          <Col>
            <p>© {moment().year()} Photora</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}
