import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import "./signup.css"

import userIcon from "../components/assets/person.png"
import emailIcon from "../components/assets/email.png"
import passwordIcon from "../components/assets/password.png"

export default function Signup() {

    const [showPasswordFeedback, setShowPasswordFeedback] = useState(false)
    const [showEmailFeedback, setShowEmailFeedback] = useState(false)
    const [showEmptyFeedback, setShowEmptyFeedback] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowEmptyFeedback(false);

        const userData = {
            password: document.getElementById("pass").value,
            name: document.getElementById("user").value,
            email: document.getElementById("email").value,
          };

        if(userData.password == '' || userData.email == '' || userData.name == '' || document.getElementById("passConfirm").value == '') {
            setShowEmptyFeedback(true);
        } else if (!showPasswordFeedback) {
            const response = await fetch("http://localhost:8080/user/create", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if(result["error"] = "email already in use") {
                setShowEmailFeedback(true);
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

    const handlePassConfirmChange = (event) => {
        const password = document.getElementById("pass").value;
        const passwordConfirm = document.getElementById("passConfirm").value;

        if (password != passwordConfirm) {
            setShowPasswordFeedback(true);
        } else {
            setShowPasswordFeedback(false);
        }
    }

    const handleChange = (event) => {
        if(document.getElementById("user").value != '') {
            if(document.getElementById("email").value != '') {
                if(document.getElementById("pass").value != '') {
                    if(document.getElementById("passConfirm").value != '') {
                        setShowEmptyFeedback(false);
                    }
                }
            }
        }
    }

    return (
        <div className='signup-form'>
            <div className='signup-header'>
                <h1>Sign Up</h1>
            </div>
            <div>
                <form className='signup-textfields' onSubmit={handleSubmit}>
                    <div className='signup-textfield'>
                        <img src={userIcon} alt='' />
                        <input type='text' id='user' placeholder='name' onChange={handleChange}/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={emailIcon} alt='' />
                        <input type="email" id='email' placeholder='email' onChange={handleChange}/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' id='pass' placeholder='password' onChange={handleChange}/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' id='passConfirm' placeholder='confirm password' onChange={handlePassConfirmChange}/>
                    </div>
                    <div className='submit-button'>
                        <button type='submit'>Sign up!</button>
                    </div>
                </form>
            </div>
            {showPasswordFeedback &&
                <div className="login-denied">
                    <p>Passwords do not match.</p>
                </div>
            }
            {showEmptyFeedback &&
                <div className="login-denied">
                    <p>Please fill in all fields.</p>
                </div>
            }
            {showEmailFeedback &&
                <div className="login-denied">
                    <p>Email already in use.</p>
                </div>
            }
            <div className='recover-password'>Already Registered? <span onClick={handleClick}>Log In.</span></div>
        </div>
    )
}