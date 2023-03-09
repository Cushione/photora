import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { isLoggedIn, logout, setupInterceptors } from './Authentication'
import Profile from '../shared/models/Profile.model'

type UserProfile = Profile | undefined | null

interface UserInfo {
  userProfile: UserProfile
  setLoggedIn: any
  setDataChange: any
}

export const UserInfoContext = createContext<UserInfo>({
  userProfile: undefined,
  setLoggedIn: undefined,
  setDataChange: undefined,
})

export function UserInfoProvider({ children }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(undefined)
  const [dataChange, setDataChange] = useState(false)
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    setupInterceptors()
  }, [])

  useEffect(() => {
    if (loggedIn || dataChange) {
      getUserProfile()
    } else if (!loggedIn) {
      setUserProfile(null)
      logout()
    }
  }, [loggedIn, dataChange])

  function getUserProfile() {
    axios.get('profiles/user').then((res) => {
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
