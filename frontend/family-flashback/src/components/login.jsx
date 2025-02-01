import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./signup.css"

import emailIcon from "../components/assets/email.png"
import passwordIcon from "../components/assets/password.png"

export default function Login() {

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            password: document.getElementById("pass").value,
            email: document.getElementById("email").value,
          };

        const response = await fetch("http://localhost:8080/auth/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log(result);
        if(result["session"] != null) {
            document.cookie = "session=" + result["session"];
        }

        navigate('/');
    }

    const handleClick = (event) => {
        alert("Forgot Password triggered");
    }

    const validateUser = (event) => {


    }

    const handlePassConfirmChange = (event) => {
        const password = document.getElementById("pass").value;
        const passwordConfirm = document.getElementById("passConfirm").value;

        if (password === passwordConfirm) {
            alert("Passwords Match!");
        }
    }

    return (
        <div className='signup-form'>
            <div className='signup-header'>
                <h1>Login</h1>
            </div>
            <div>
                <form className='signup-textfields' onSubmit={handleSubmit}>
                    <div className='signup-textfield'>
                        <img src={emailIcon} alt='' />
                        <input type="email" id='email' placeholder='email' onBlur={validateUser} />
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' id='pass' placeholder='password' onBlur={validateUser}/>
                    </div>
                    <div className='submit-button'>
                        <input type='submit' />
                    </div>
                </form>
            </div>
            <div className='recover-password'>Forgot Password? <span onClick={handleClick}>Click Here.</span></div>
        </div>
    )
}