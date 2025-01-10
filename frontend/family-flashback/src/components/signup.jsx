import React from 'react'

import "./signup.css"

import userIcon from "../components/assets/person.png"
import emailIcon from "../components/assets/email.png"
import passwordIcon from "../components/assets/password.png"

export default function Signup() {

    const handleSubmit = (event) => {
        alert("Form submitted");
        console.log("test");
        event.preventDefault();

        /*fetch("http://localhost:8080/user", {mode: 'no-cors'}).then((response) => {
            return response;
        }).then((data) => {
            console.log(data);
        });*/

    }

    const handleClick = (event) => {
        alert("Forgot Password triggered");
    }

    const handleChange = (event) => {
        const user = document.getElementById("user");
        alert({user});
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
                <h1>Sign Up</h1>
            </div>
            <div>
                <form className='signup-textfields' onSubmit={handleSubmit}>
                    <div className='signup-textfield'>
                        <img src={userIcon} alt='' />
                        <input type='text' id='user' placeholder='name' onBlur={validateUser}/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={emailIcon} alt='' />
                        <input type="email" placeholder='email' onBlur={validateUser} />
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' id='pass' placeholder='password' onBlur={validateUser}/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' id='passConfirm' placeholder='confirm password' onBlur={validateUser} onChange={handlePassConfirmChange}/>
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