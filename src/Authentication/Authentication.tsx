import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { setLogin } from './UserInfoContext'

interface LoginResponse {
  access: string
  refresh: string
}

enum Token {
  Access = 'AccessToken',
  Refresh = 'RefreshToken',
  RememberMe = 'RememberMe',
}

export function isLoggedIn(): boolean {
  return !!getToken(Token.Access)
}

export async function login(
  username: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> {
  const res = await axios.post<LoginResponse>(
    'api/token/',
    {
      username,
      password,
    },
    { retry: false } as any
  )
  setLogin(true)
  return res
}

export function register(
  username: string,
  password1: string,
  password2: string
): Promise<AxiosResponse<void>> {
  return axios.post(
    'dj-rest-auth/registration/',
    {
      username,
      password1,
      password2,
    },
    { retry: false } as any
  )
}

export function logout(): void {
  removeToken(Token.Access)
  removeToken(Token.Refresh)
  removeToken(Token.RememberMe)
}

async function refreshAccessToken(refresh: string): Promise<boolean> {
  const response = await axios.post<{ access: string }>('api/token/refresh/', {
    refresh,
  })
  return response.status === 200
}

// Utility functions for handling tokens in session- and localstorage

/**
 * Retrieve specified token from storage
 * @param type Type of token
 * @returns token or null
 */
function getToken(type: Token): string | null {
  return localStorage.getItem(type) || sessionStorage.getItem(type)
}

/**
 * Store specified token in storage
 * @param type Type of token
 */
function storeToken(type: string, value: string): void {
  if (localStorage.getItem(Token.RememberMe)) {
    localStorage.setItem(type, value)
  } else {
    sessionStorage.setItem(type, value)
  }
}

/**
 * Delete specified token from storage
 * @param type Type of token
 */
function removeToken(type: Token): void {
  localStorage.removeItem(type)
  sessionStorage.removeItem(type)
}

/**
 * Setup Axios interceptors
 */
export function setupInterceptors(): void {
  /* 
  Add Axios Request Interceptor
  If user is logged in, add access token as bearer token
  */
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = getToken(Token.Access)
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  })

  /* 
  Add Axios Response Interceptor
  If request is successful, check if response contains tokens and store them
  Attempt to refresh access token if request returns authorisation error
  */
  axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      // Store tokens if response contains access or response tokens
      if (response.data && response.data['access']) {
        storeToken(Token.Access, response.data.access)
      }
      if (response.data && response.data['refresh']) {
        storeToken(Token.Refresh, response.data.refresh)
      }
      return response
    },
    async (error) => {
      /* If an request returns authorisation error, attempt to refresh tokens
      otherwise logout the user */
      if (error.response.status == 401 || error.response.status === 403) {
        const accessToken = getToken(Token.Access)
        if (accessToken) {
          // Invalidate the access token by removing stored token
          removeToken(Token.Access)
        }
        const refreshToken = getToken(Token.Refresh)
        // If refresh token exists, attempt to refresh access token
        if (refreshToken) {
          const success = await refreshAccessToken(refreshToken)
          // If successful, retry original request, otherwise remove token
          if (success && error.config.retry) {
            return axios.request(error.config)
          } else {
            removeToken(Token.Refresh)
          }
        }
        localStorage.removeItem(Token.RememberMe)
      }
      return Promise.reject(error)
    }
  )
}
