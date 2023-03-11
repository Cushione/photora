import React, { MouseEvent, useContext, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { Link } from 'react-router-dom'
import { useShowMessage } from '../../Components/Messages/MessagesContext'
import usePageTitle from '../../shared/hooks/usePageTitle'
import { login } from '../Authentication'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const showMessage = useShowMessage()

  usePageTitle('Login')

  const handleSubmit = (event: MouseEvent): void => {
    event.preventDefault()
    setError(undefined)
    localStorage.setItem('RememberMe', JSON.stringify(rememberMe))
    login(username, password)
      .then(() => {
        showMessage({ content: `Logged in as ${username}` })
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail)
        }
      })
  }

  return (
    <div style={{ maxWidth: '600px' }} className='mx-auto'>
      <h2>Login</h2>
      <Form>
        {error && <Alert variant={'danger'}>{error}</Alert>}
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
        <Form.Group className='mb-3' controlId='loginCheckbox'>
          <Form.Check
            type='checkbox'
            label='Remember me'
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          disabled={username === '' || password === ''}
          onClick={handleSubmit}
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
