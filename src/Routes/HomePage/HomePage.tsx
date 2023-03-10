import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='text-center'>
      <h2>Welcome to Photora!</h2>
      <p>Feel free to look around and explore 🧭</p>
      <p>
        For the best experience, consider{' '}
        <Link to='/register' style={{ fontWeight: 'bold' }}>
          creating an account
        </Link>
      </p>
      <p>
        Already have an account?{' '}
        <Link to='/login' style={{ fontWeight: 'bold' }}>
          Log in here
        </Link>
      </p>
    </div>
  )
}
