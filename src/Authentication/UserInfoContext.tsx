import axios from 'axios'
import React, { useEffect } from 'react'
import { isLoggedIn, logout, setupInterceptors } from './Authentication'
import Profile from '../shared/models/Profile.model'
import { create } from 'zustand'

type UserProfile = Profile | undefined | null

/**
 * Structure of the user info store
 */
interface UserInfoStore {
  userProfile: UserProfile
  loggedIn: boolean
  setUserProfile: (profile: UserProfile) => void
  fetchUserProfile: () => void
}

// Setup Axios interceptors before creating user info store
setupInterceptors()

// Create user info store from managing user info state
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

/**
 * Set user login state
 * @param state login state
 */
export const setLogin = (state: boolean) => {
  useUserInfoStore.setState({ loggedIn: state })
}

/**
 * Update user profile in state
 * @param profile user profile
 */
export const updateUserProfile = (profile: Profile) => {
  useUserInfoStore.setState({ userProfile: profile })
}

/**
 * Component for handling user profile in state
 * @returns User Info Handler Component
 */
export function UserInfoHandler() {
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
