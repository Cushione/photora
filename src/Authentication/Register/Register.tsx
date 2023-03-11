import React, { MouseEvent, useContext, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { Link } from 'react-router-dom'
import { useShowMessage } from '../../Components/Messages/MessagesContext'
import usePageTitle from '../../shared/hooks/usePageTitle'
import { login, register } from '../Authentication'

/**
 * Register Page Component
 * @returns Register Form
 */
function Register(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const showMessage = useShowMessage()

  usePageTitle('Register')

  /**
   * Handles the register form submission
   * Stores if the user wants to be remembered and attempts
   * register. If successful, the user is logged in automatically.
   * Displays error if the request fails
   * @param event Form submit event
   */
  const handleSubmit = (event: MouseEvent): void => {
    // Prevent submission of the form by the browser
    event.preventDefault()
    // Reset errors
    setError(undefined)
    // Stores if the user wants to be remembered 
    localStorage.setItem('RememberMe', JSON.stringify(rememberMe))
    // Send register request
    register(username, password1, password2)
      // On success, login user automatically
      .then(() => login(username, password1))
      .then(() => {
        // Display message on success
        showMessage({ content: `Logged in as ${username}` })
      })
      .catch((error) => {
        if (error.response) {
          // Display error if request fails
          setError(
            (Object.values(error.response.data)[0] as string[])[0] as string
          )
        }
      })
  }

  return (
    <div style={{ maxWidth: '600px' }} className='mx-auto'>
      <Form>
        <h2>Create Account</h2>
        
        {/* Display error in BS Alert component */}
        {error && <Alert variant={'danger'}>{error}</Alert>}

        {/* Username input field */}
        <Form.Group className='mb-3' controlId='registerUsername'>
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
        <Form.Group className='mb-3' controlId='registerPassword1'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Password'
            value={password1}
            onChange={(event) => setPassword1(event.target.value)}
          />
        </Form.Group>

        {/* Confirm password input field */}
        <Form.Group className='mb-3' controlId='registerPassword2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
          />
        </Form.Group>

        {/* Checkbox for remembering the user */}
        <Form.Group className='mb-3' controlId='registerCheckbox'>
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
          disabled={username === '' || password1 === '' || password2 === ''}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Form>
      <p className='mt-4'>
        Already have an account? <Link to={'/login'}>Log in</Link>
      </p>
    </div>
  )
}

export default Register
