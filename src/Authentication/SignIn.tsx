import axios from 'axios'
import React, { MouseEvent, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'

interface SignInResponse {
  access: string
  refresh: string
}

function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = (event: MouseEvent): void => {
    event.preventDefault()
    setError(undefined)
    localStorage.setItem('RememberMe', JSON.stringify(rememberMe))
    axios
      .post<SignInResponse>(
        import.meta.env.VITE_API_URL + 'api/token/',
        {
          username,
          password,
        },
        { retry: false } as any
      )
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail)
        }
      })
  }

  return (
    <Form>
      {error && <Alert variant={'danger'}>{error}</Alert>}
      <Form.Group className='mb-3' controlId='signInUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type='Text'
          placeholder='Enter Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='signInPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicCheckbox'>
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
        Sign in
      </Button>
    </Form>
  )
}

export default SignIn
