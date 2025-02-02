import React from 'react'
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleClick = async (event) => {
        const response = await fetch("http://localhost:8080/auth/logout", {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
        window.location.reload()
    }

    return (
        <div>
            <footer className="web-footer">
                <div className="footer-links">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href}>
                            {item.name}
                        </a>
                    ))}
                </div>
                {cookieValue != null &&
                    <div className="logout-link">
                        <button>
                            <span onClick={handleClick}>Logout</span>
                        </button>
                    </div>
                }
            </footer>
        </div>
    )
}