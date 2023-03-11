import React, { useEffect } from 'react'
import { showMessage } from '../../Components/Messages/MessagesContext'
import { setLogin } from '../UserInfoContext';

/**
 * Initialises user logout
 * @returns empty JSX
 */
export default function Logout() {

  /* On component mount, trigger user logout and 
  display message */
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
