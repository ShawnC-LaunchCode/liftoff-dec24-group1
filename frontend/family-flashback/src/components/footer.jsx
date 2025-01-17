import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={linkContainerStyle}>
        <a href="./addPerson" style={linkStyle}>Add Person</a>
        <a href="/update-person" style={linkStyle}>Update Person</a>
      </div>
    </footer>
  );
}

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 0',
  left: 0,
};

const linkContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
};

export default Footer;