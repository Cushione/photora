import React, { MouseEvent, useContext, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { Link } from 'react-router-dom'
import usePageTitle from '../../shared/hooks/usePageTitle'
import { login, register } from '../Authentication'
import { UserInfoContext } from '../UserInfoContext'

function Register() {
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const { setLoggedIn } = useContext(UserInfoContext)

  usePageTitle('Register')

  const handleSubmit = (event: MouseEvent): void => {
    event.preventDefault()
    setError(undefined)
    localStorage.setItem('RememberMe', JSON.stringify(rememberMe))
    register(username, password1, password2)
      .then(() => login(username, password1))
      .then(() => {
        setLoggedIn(true)
      })
      .catch((error) => {
        if (error.response) {
          setError(
            (Object.values(error.response.data)[0] as string[])[0] as string
          )
        }
      })
  }

  return (
    <>
      <Form>
        <h2>Create Account</h2>
        {error && <Alert variant={'danger'}>{error}</Alert>}
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

        <Form.Group className='mb-3' controlId='registerCheckbox'>
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
          disabled={username === '' || password1 === '' || password2 === ''}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Form>
      <p className='mt-4'>
        Already have an account? <Link to={'/login'}>Log in</Link>
      </p>
    </>
  )
}

export default Register
