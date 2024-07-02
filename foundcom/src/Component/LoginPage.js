import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { loginUSer } from '../Actions/User';
const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch=useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUSer(email,password))
  };
  
  return (
    <>
      <form action="submit" onSubmit={loginHandler}>
        <h1>Login</h1>
        <input type="email" placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
        <Link to='/forgot/password'><p>forgot Password</p></Link>
        <button>Login</button>
        <Link to='/register'><p>NewUSer</p></Link>
      </form>


    </>
  )
}

export default LoginPage
