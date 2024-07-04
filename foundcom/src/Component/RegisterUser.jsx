import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../Actions/User'
const RegisterUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const registerHandler = (e) => {
        e.preventDefault()
        dispatch(registerUser(name, email, password));
    };

    return (
        <form action="submit" onSubmit={registerHandler}>
            <input type="text" placeholder='name' required value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Register</button>
        </form>
    )
}

export default RegisterUser
