import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

interface LoginResponse {
  access: string
  refresh: string
}

export function isLoggedIn(): boolean {
  return !!getToken('AccessToken')
}

export function login(
  username: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> {
  return axios.post<LoginResponse>(
    import.meta.env.VITE_API_URL + 'api/token/',
    {
      username,
      password,
    },
    { retry: false } as any
  )
}

export function register(
  username: string,
  password1: string,
  password2: string
): Promise<AxiosResponse<void>> {
  return axios.post(
    import.meta.env.VITE_API_URL + 'dj-rest-auth/registration/',
    {
      username,
      password1,
      password2,
    },
    { retry: false } as any
  )
}

export function logout() {
  removeToken("RememberMe")
  removeToken("AccessToken")
  removeToken("RefreshToken")
}

async function refreshAccessToken(refresh: string): Promise<boolean> {
  const response = await axios.post<{ access: string }>(
    import.meta.env.VITE_API_URL + 'api/token/refresh/',
    { refresh }
  )
  return response.status === 200
}

function getToken(type: string): string | null {
  return localStorage.getItem(type) || sessionStorage.getItem(type)
}

function storeToken(type: string, value: string): void {
  if (localStorage.getItem('RememberMe')) {
    localStorage.setItem(type, value)
  } else {
    sessionStorage.setItem(type, value)
  }
}

function removeToken(type: string): void {
  localStorage.removeItem(type)
  sessionStorage.removeItem(type)
}

export function setupInterceptors() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = getToken('AccessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  })

  axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (response.data && response.data['access']) {
        storeToken('AccessToken', response.data.access)
      }
      if (response.data && response.data['refresh']) {
        storeToken('RefreshToken', response.data.refresh)
      }
      return response
    },
    async (error) => {
      if (error.response.status == 401) {
        const accessToken = getToken('AccessToken')
        if (accessToken) {
          removeToken('AccessToken')
        }
        const refreshToken = getToken('RefreshToken')
        if (refreshToken) {
          const success = await refreshAccessToken(refreshToken)
          if (success && error.config.retry) {
            return axios.request(error.config)
          } else {
            removeToken('RefreshToken')
          }
        }
        localStorage.removeItem('RememberMe')
        // TODO: Navigate to login
      }
      return Promise.reject(error)
    }
  )
}
