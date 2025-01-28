import React from 'react';
import { useNavigate } from 'react-router-dom';

function ViewPersonButton({rootPerson}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/person-details', { state: { rootPerson } });
  };

  return (
    <div>
    <button onClick={handleClick} style={viewPersonButtonStyle} title="View person">&#128462;</button>
    </div>
  );
}

const viewPersonButtonStyle = {
  color: '#5A4FCF', 
  fontSize: '30px',
}

export default ViewPersonButton;