import React from 'react'
import "./signup.css"

import emailIcon from "../components/assets/email.png"
import passwordIcon from "../components/assets/password.png"

export default function About() {

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("session="))
    ?.split("=")[1];

  console.log(cookieValue);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      password: "test",
      email: "test",
    };

    const imageData = {
      user: userData,
      url: "test.com/images",
    };

    console.log(imageData);

    const response = await fetch("http://localhost:8080/auth/" + cookieValue, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'session': cookieValue,
      },
    });

    /*const response = await fetch("http://localhost:8080/images/test", {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'session': cookieValue,
      },
  });*/
  
    const result = await response.json();
    console.log(result);
    alert("Test");
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
              <div className='recover-password'>Forgot Password? <span>Click Here.</span></div>
          </div>
      )
}
