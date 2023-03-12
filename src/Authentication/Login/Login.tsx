import React, { FormEvent, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { Link } from 'react-router-dom'
import { useShowMessage } from '../../Components/Messages/MessagesContext'
import usePageTitle from '../../shared/hooks/usePageTitle'
import { login } from '../Authentication'

/**
 * Login Page Component
 * @returns Login Form Component
 */
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const showMessage = useShowMessage()

  usePageTitle('Login')

  /**
   * Handles the login form submission
   * Stores if the user wants to be remembered and attempts
   * login. Displays error if the request fails
   * @param event Form submit event
   */
  const handleSubmit = (event: FormEvent): void => {
    // Prevent submission of the form by the browser
    event.preventDefault()
    // Reset errors
    setError(undefined)
    // Stores if the user wants to be remembered
    localStorage.setItem('RememberMe', JSON.stringify(rememberMe))
    // Send login request
    login(username, password)
      .then(() => {
        // Display message on success
        showMessage({ content: `Logged in as ${username}` })
      })
      .catch((error) => {
        // Display error if request fails
        if (error.response) {
          setError(error.response.data.detail)
        }
      })
  }

  return (
    <div style={{ maxWidth: '600px' }} className='mx-auto'>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        {/* Display error in BS Alert component */}
        {error && <Alert variant={'danger'}>{error}</Alert>}

        {/* Username input field */}
        <Form.Group className='mb-3' controlId='loginUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type='Text'
            placeholder='Enter Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        {/* Password input field */}
        <Form.Group className='mb-3' controlId='loginPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        {/* Checkbox for remembering the user */}
        <Form.Group className='mb-3' controlId='loginCheckbox'>
          <Form.Check
            type='checkbox'
            label='Remember me'
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
        </Form.Group>

        {/* Submit button */}
        <Button
          variant='primary'
          type='submit'
          disabled={username === '' || password === ''}
        >
          Log in
        </Button>
      </Form>
      <p className='mt-4'>
        Don't have an account yet? <Link to={'/register'}>Register</Link>
      </p>
    </div>
  )
}

export default Login
