import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUSer } from '../Actions/User';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUSer(email, password));
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center text-gray-700 mb-6'>Login</h1>
        <form onSubmit={loginHandler} className='space-y-4'>
          <input 
            type='email' 
            placeholder='Email' 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input 
            type='password' 
            placeholder='Password' 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <Link to='/forgot/password' className='text-blue-500 text-sm hover:underline'>Forgot Password?</Link>
          <button 
            type='submit' 
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Login
          </button>
        </form>
        <p className='text-center text-sm text-gray-600 mt-4'>
          New User? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
