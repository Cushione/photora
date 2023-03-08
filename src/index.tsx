import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Root from './Routes/Root'
import PostList, { loader as postListLoader } from './Routes/PostList/PostList'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import Login from './Authentication/Login/Login'
import Register from './Authentication/Register/Register'
import { UserInfoContext, UserInfoProvider } from './Authentication/Authentication'
import ProfileDetail, {loader as profileLoader} from './Routes/ProfileDetail/ProfileDetail';
import ProfileEdit, {ProfileEditLoader, ProfileEditAction} from './Routes/ProfileEdit/ProfileEdit';

function Router() {
  const {userProfile} = useContext(UserInfoContext)

  const routes = (isLoggedIn: boolean) => createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'login',
          element: isLoggedIn ? <Navigate to={"/"} replace /> : <Login />,
        },
        {
          path: 'register',
          element: isLoggedIn ? <Navigate to={"/"} replace /> : <Register />,
        },
        {
          path: 'profiles/:id',
          element: <ProfileDetail />,
          loader: profileLoader,
        },
        {
          path: 'profiles/edit',
          element: <ProfileEdit />,
          loader: ProfileEditLoader,
          action: ProfileEditAction
        },
        {
          path: 'posts',
          element: <PostList />,
          loader: postListLoader,
        },
      ],
    },
  ]) 

  return (
    <RouterProvider router={routes(!!userProfile)} />
  )

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
