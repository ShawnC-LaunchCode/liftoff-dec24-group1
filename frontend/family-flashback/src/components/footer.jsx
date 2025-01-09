import React from 'react'

import "./footer.css"

const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]

export default function Footer() {

    return (
        <div className='web-footer'>
            <footer>
                <div className="footer-links">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href}>
                            {item.name}
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    )
}