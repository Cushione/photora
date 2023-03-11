import React, { useEffect } from 'react'
import { useContext } from 'react'
import { showMessage } from '../../Components/Messages/MessagesContext'
import { UserInfoContext } from '../UserInfoContext'

export default function Logout() {
  const { setLoggedIn } = useContext(UserInfoContext)

  useEffect(() => {
    setLoggedIn(false)
    showMessage({
      content: `Bye! See you soon :)`,
      sticky: false,
      delay: 5000,
    })
  }, [])
  return <></>
}
