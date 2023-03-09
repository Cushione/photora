import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { isLoggedIn, setupInterceptors } from './Authentication'

interface UserInfo {
  userProfile:
    | {
        id: number
        owner: string
        name: string
        image: string
      }
    | undefined
  setLoggedIn: any
  setDataChange: any
}

export const UserInfoContext = createContext<UserInfo>({
  userProfile: undefined,
  setLoggedIn: undefined,
  setDataChange: undefined,
})

export function UserInfoProvider({ children }) {
  const [userProfile, setUserProfile] = useState(undefined)
  const [dataChange, setDataChange] = useState(false)
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    setupInterceptors()
  }, [])

  useEffect(() => {
    console.log(loggedIn)
    if (loggedIn || dataChange) {
      getUserProfile()
    }
  }, [loggedIn, dataChange])

  function getUserProfile() {
    axios.get(import.meta.env.VITE_API_URL + 'profiles/user').then((res) => {
      setUserProfile(res.data)
      if (dataChange) {
        setDataChange(false)
      }
    })
  }

  return (
    <UserInfoContext.Provider
      value={{ userProfile, setLoggedIn, setDataChange }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}
