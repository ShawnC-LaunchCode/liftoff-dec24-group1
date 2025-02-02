import React from 'react'
import "./home.css"


export default function Home() {

    const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("session="))
    ?.split("=")[1];

  return (
    <div className="home">
        <div className="app-name">
            <h1>Family Flashback</h1>
        </div>
        {cookieValue == null &&
            <div className="welcome">
                <h1>Please login or signup to continue.</h1>
            </div>
        }
    </div>
  )
}
