import React from 'react'
import "./signup.css"

import emailIcon from "../components/assets/email.png"
import passwordIcon from "../components/assets/password.png"

export default function About() {

  const handleClick = async (event) => {

    const userData = {
      password: "test",
      email: "test",
    };

    const imageData = {
      user: userData,
      url: "test.com/images",
    };

    console.log(imageData);

    const response = await fetch("http://localhost:8080/images", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'session': '5_OjPrUiFNgvvTaH4jjoi',
      },
      body: JSON.stringify(imageData),
  });
  
    const result = await response.json();
    console.log(result);
    //setCookie('session', result["session"]);
    alert("Forgot Password triggered");
  }

  return (
          <div className='signup-form'>
              <div className='signup-header'>
                  <h1>Login</h1>
              </div>
              <div>
                  <form className='signup-textfields'>
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
              <div className='recover-password'>Forgot Password? <span onClick={handleClick}>Click Here.</span></div>
          </div>
      )
}
