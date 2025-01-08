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

        /*fetch("http://localhost:8080/user/1", {mode: 'no-cors'}).then((response) => {
            return response;
        }).then((data) => {
            console.log(data);
        });*/

     }

     const handleClick = (event) => {
        alert("Forgot Password triggered");
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
                        <input type='text' placeholder='name'/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={emailIcon} alt='' />
                        <input type="email" placeholder='email' />
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' placeholder='password'/>
                    </div>
                    <div className='signup-textfield'>
                        <img src={passwordIcon} alt='' />
                        <input type='password' placeholder='confirm password'/>
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