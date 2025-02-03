import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import "./signup.css"

import emailIcon from "../components/assets/email.png"
import passwordIcon from "../components/assets/password.png"

export default function Login() {

    const [showLoginFeedback, setShowLoginFeedback] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowLoginFeedback(false);

        const userData = {
            password: document.getElementById("pass").value,
            email: document.getElementById("email").value,
          };

        if(userData.password == '' || userData.email == '') {
            setShowLoginFeedback(true);
        } else {

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

            if(result["error"] == "passwords do not match" || result["error"] == "incorrect email") {
                setShowLoginFeedback(true);
            } else if (result["error"] == "session already exists") {
                navigate('/');
                window.location.reload()
            }

            const session = document.cookie
            .split("; ")
            .find((row) => row.startsWith("session="))
            ?.split("=")[1];

            if(session != null) {
                navigate('/');
                window.location.reload()
            }
        }
    }

    const handleClick = (event) => {
        alert("Forgot Password triggered");
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
                        <input type="email" id='email' placeholder='email'/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' id='pass' placeholder='password'/>
                    </div>
                    <div className='submit-button'>
                        <input type='submit' />
                    </div>
                </form>
            </div>
            {showLoginFeedback &&
                <div className="login-denied">
                    <p>Email and Password do not match.</p>
                </div>
            }
            <div className='recover-password'>Forgot Password? <span onClick={handleClick}>Click Here.</span></div>
        </div>
    )
}