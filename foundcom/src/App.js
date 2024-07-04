import React, { useEffect } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './Component/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/User'
import RegisterUser from './Component/RegisterUser'
import HomePage from './Component/HomePage'

const Applayout = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    // console.log("hello")
  },[])

  const isAuthenticated= useSelector((s)=>s.user.isAuthenticated)
  // const { isAuthenticated } = false;
  return (!isAuthenticated) ? <LoginPage /> : <HomePage/>
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />
  },
  {
    path:'/register',
    element:<RegisterUser/>
  }
])

export default appRouter;