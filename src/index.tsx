import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Root from './Routes/Root'
import PostList, { PostListLoader } from './Routes/Posts/PostList/PostList'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import Login from './Authentication/Login/Login'
import Register from './Authentication/Register/Register'
import {
  UserInfoContext,
  UserInfoProvider,
} from './Authentication/UserInfoContext'
import ProfileDetail, {
  ProfileDetailLoader,
  ProfileUserDetailLoader,
} from './Routes/ProfileDetail/ProfileDetail'
import ProfileEdit, {
  ProfileEditLoader,
  ProfileEditAction,
} from './Routes/ProfileEdit/ProfileEdit'
import PostForm, { PostFormAction } from './Routes/Posts/PostForm/PostForm'
import Logout from './Authentication/Logout/Logout'
import PostDetail, {
  PostDetailLoader,
} from './Routes/Posts/PostDetail/PostDetail'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

function Router() {
  const { userProfile } = useContext(UserInfoContext)

  const routes = (isLoggedIn: boolean) =>
    createBrowserRouter([
      {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'login',
            element: isLoggedIn ? <Navigate to={'/'} replace /> : <Login />,
          },
          {
            path: 'register',
            element: isLoggedIn ? <Navigate to={'/'} replace /> : <Register />,
          },
          {
            path: 'logout',
            element: !isLoggedIn ? <Navigate to={'/'} replace /> : <Logout />,
          },
          {
            path: 'profiles/:id',
            element: <ProfileDetail />,
            loader: ProfileDetailLoader,
          },
          {
            path: 'profiles/user',
            element: <ProfileDetail />,
            loader: ProfileUserDetailLoader,
          },
          {
            path: 'profiles/edit',
            element: <ProfileEdit />,
            loader: ProfileEditLoader,
            action: ProfileEditAction,
          },
          {
            path: 'posts',
            element: <PostList />,
            loader: PostListLoader,
          },
          {
            path: 'posts/create',
            element: <PostForm />,
            action: PostFormAction,
          },
          {
            path: 'posts/:id',
            element: <PostDetail />,
            loader: PostDetailLoader,
          },
        ],
      },
    ])

  return <RouterProvider router={routes(!!userProfile)} />
}

ReactDOM.render(
  <React.StrictMode>
    <UserInfoProvider>
      <Router />
    </UserInfoProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
