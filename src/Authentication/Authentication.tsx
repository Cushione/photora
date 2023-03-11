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

export function logout() {
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

export function getToken(type: string): string | null {
function getToken(type: Token): string | null {
  return localStorage.getItem(type) || sessionStorage.getItem(type)
}

function storeToken(type: string, value: string): void {
  if (localStorage.getItem(Token.RememberMe)) {
    localStorage.setItem(type, value)
  } else {
    sessionStorage.setItem(type, value)
  }
}

function removeToken(type: Token): void {
  localStorage.removeItem(type)
  sessionStorage.removeItem(type)
}

export function setupInterceptors() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = getToken(Token.Access)
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  })

  axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (response.data && response.data['access']) {
        storeToken(Token.Access, response.data.access)
      }
      if (response.data && response.data['refresh']) {
        storeToken(Token.Refresh, response.data.refresh)
      }
      return response
    },
    async (error) => {
      if (error.response.status == 401 || error.response.status === 403) {
        const accessToken = getToken(Token.Access)
        if (accessToken) {
          removeToken(Token.Access)
        }
        const refreshToken = getToken(Token.Refresh)
        if (refreshToken) {
          const success = await refreshAccessToken(refreshToken)
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
