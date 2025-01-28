import React from 'react'

import "./footer.css"

const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]

export default function Footer() {

    const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("session="))
    ?.split("=")[1];

    const handleClick = async (event) => {
        console.log(cookieValue);
        const response = await fetch("http://localhost:8080/auth/logout/" + cookieValue, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'session': cookieValue,
            },
        });

        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (
        <div className='web-footer'>
            <footer>
                <div className="footer-links">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href}>
                            {item.name}
                        </a>
                    ))}
                    <div className="logout"><span onClick={handleClick}>Logout</span></div>
                </div>
            </footer>
        </div>
    )
}