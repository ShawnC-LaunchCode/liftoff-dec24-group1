import React from 'react'

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

    return (
        <div className='container'>
            <div classname='header'>
                <h1>Sign Up</h1>
            </div>
            <div classname='textfields'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text"/>
                    </div>
                    <div>
                        <input type="email" />
                    </div>
                    <div>
                        <input type="password" />
                    </div>
                    <input type="submit" />
                </form>
            </div>
            <div classname="recover-password">Forgot Password? Click Here.</div>
        </div>
    )
}