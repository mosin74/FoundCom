import React, { useEffect } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './Component/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/User'
import RegisterUser from './Component/RegisterUser'
import HomePage from './Component/HomePage'
import ProfilePage from './Component/ProfilePage'

const Applayout = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [])
  
  const isAuthenticated = useSelector((s) => s.user.isAuthenticated)
  return (!isAuthenticated) ? <LoginPage /> : <HomePage />
}


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />
  },
  {
    path: '/register',
    element: <RegisterUser />
  },
  {
    path: '/profile/:username',
    Component: () => {
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(loadUser());
      }, [])

      const isAuthenticated = useSelector((s) => s.user.isAuthenticated)

      return (isAuthenticated) ? <ProfilePage /> : <h1>Please Login First </h1>
    }

  }
])

export default appRouter;