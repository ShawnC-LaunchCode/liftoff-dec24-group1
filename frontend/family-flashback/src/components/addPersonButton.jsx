import React from 'react';

function AddPersonButton({ onOpenModal }) {
  return (
    <div>
    <button onClick={onOpenModal} style={addPersonButtonStyle} title="Add new relationship">&#43;</button>
    </div>
  );
}

const addPersonButtonStyle = {
  color: '#5A4FCF', 
  lineHeight: '45px',
  fontWeight: 'bold',
  fontSize: '2rem',
}

export default AddPersonButton;