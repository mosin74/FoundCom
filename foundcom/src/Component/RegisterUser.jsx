import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Actions/User';

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center text-gray-700 mb-6'>Register</h1>
        <form onSubmit={registerHandler} className='space-y-4'>
          <input 
            type='text' 
            placeholder='Name' 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
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
          <button 
            type='submit' 
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
