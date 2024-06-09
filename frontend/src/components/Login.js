import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user") //puro user e stored value ta uthacchi as an object tai json.parse() lagbe na...
        if(auth){
            navigate('/');
        }
    })

    const handleLogin = async ()=>{
       let result = await fetch("http://localhost:5000/login",{
        method: 'post',
        body: JSON.stringify({email,password}),  //read-stream hota hai...
        headers: {
            'Content-Type' : 'application/json'
        },
       });
       result = await result.json(); //result.json returns a promise..
       console.log(result);
       if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));

        navigate('/');
       }
       else{
        alert("Please enter correct details");
       }
      
   
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="text" className='inputBox' value={email} 
            onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email" />
            <input type="text" className='inputBox' value={password} 
            onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" />
            <button className='button' onClick={handleLogin}>Submit</button>
        </div>
    )
}


export default Login;
