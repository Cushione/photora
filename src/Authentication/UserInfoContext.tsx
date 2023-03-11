import axios from 'axios'
import React, { useEffect } from 'react'
import { isLoggedIn, logout, setupInterceptors } from './Authentication'
import Profile from '../shared/models/Profile.model'
import { create } from 'zustand'

type UserProfile = Profile | undefined | null

interface UserInfoStore {
  userProfile: UserProfile
  loggedIn: boolean
  setUserProfile: (profile: UserProfile) => void
  fetchUserProfile: () => void
}


setupInterceptors()

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  userProfile: undefined,
  loggedIn: isLoggedIn(),
  setUserProfile: (profile: UserProfile) =>
    set(() => ({ userProfile: profile })),
  fetchUserProfile: async () => {
    if (isLoggedIn()) {
      const res = axios.get('profiles/user')
      set({ userProfile: await (await res).data })
    }
  },
}))

export const setLogin = (state: boolean) => {
  useUserInfoStore.setState({ loggedIn: state })
}

export const updateUserProfile = (profile: Profile) => {
  useUserInfoStore.setState({ userProfile: profile })
}

export function UserInfoProvider() {
  const { setUserProfile, fetchUserProfile, loggedIn } = useUserInfoStore()

  useEffect(() => {
    if (loggedIn) {
      fetchUserProfile()
    } else if (!loggedIn) {
      setUserProfile(null)
      logout()
    }
  }, [loggedIn])

  return <></>
}
