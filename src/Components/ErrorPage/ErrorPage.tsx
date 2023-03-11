import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import './ErrorPage.scss'

/**
 * Error Page Component
 * Used to display error messages
 * @returns Error Page
 */
export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div id='error-page'>
      <h1 className='mb-5'>Oops!</h1>
      <p>Sorry, something went wrong.</p>
      <p className='mb-5'>
        Error: <i>{error.statusText || error.message}</i>
      </p>
      <p>
        Would you like to&nbsp;
        <a href='javascript:void 0' onClick={() => navigate(-1)}>
          Go Back
        </a>
        &nbsp;or return to the <Link to={'/home'}>Homepage</Link>?
      </p>
    </div>
  )
}
