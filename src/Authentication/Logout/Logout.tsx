import React, { useEffect } from 'react'
import { showMessage } from '../../Components/Messages/MessagesContext'
import { setLogin } from '../UserInfoContext';

export default function Logout() {

  useEffect(() => {
    setLogin(false)
    showMessage({
      content: `Bye! See you soon :)`,
      sticky: false,
      delay: 5000,
    })
  }, [])
  return <></>
}
