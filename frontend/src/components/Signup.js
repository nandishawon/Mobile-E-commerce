import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const handleOnNameChange = (event) => {
        setName(event.target.value);
    }
    const handleOnPasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleOnEmailChange = (event) => {
        setEmail(event.target.value);
    }


    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user'); //jokhon local storage theke kono maal uthabo tokhn json.parse() lagate hbe...
        if(auth){  //ekhane auth er kono value use korchi na just auth ache kina seta true/false korchi...
            navigate('/');
        }
    })

    const collectData = async () => {

        //API give/take data in JSON.string() format...
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate('/')
    }

    return (
        <div className='register'>
            <h1>Register</h1>
            <input className='inputBox' value={name} onChange={handleOnNameChange} type="text" placeholder='Enter Name' />
            <input className='inputBox' value={email} onChange={handleOnEmailChange} type="text" placeholder='Enter Email' />
            <input className='inputBox' value={password} onChange={handleOnPasswordChange} type="text" placeholder='Enter Password' />
            <button className='button' onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp;