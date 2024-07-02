import React, { useEffect } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './Component/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/User'

const Applayout = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    console.log("hello")
  }, [])

  const isAuthenticated= useSelector((s)=>s.user.isAuthenticated)
  // const { isAuthenticated } = false;
  return (!isAuthenticated) ? <LoginPage /> :
    (

      <div>
        <h1>This is app</h1>
      </div>
    )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />
  }
])

export default appRouter;