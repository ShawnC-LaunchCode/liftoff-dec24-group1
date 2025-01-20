import React, { useState } from 'react';

function AddPersonForm({ handleClose }) {
  // Get rootPerson (The person the relationship will be added to)

  // Set rootPerson in relationshipData and add rootPerson name on the form

  // Get authenticated user information

  // Update user id in useState

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    deathDate: '',
    birthTown: '',
    bio: '',
    relationship: '',
    user: {
      id: 'ht-vvKg8UMPr4PissxDbN',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // If the request is successful
      const result = await response.json();
      console.log('Form submitted successfully:', result);

      const relationshipData = {
        rootPerson: 'dct4GZiwTnIvLg1YD7bAW',
        relatedPerson: result.id,
        relationship: formData.relationship,
      };

      console.log(relationshipData);

      try {
        const response = await fetch('http://localhost:8080/relation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(relationshipData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit relationship');
        }

        const result = await response.json();
        console.log('Response:', result);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }

      // Close modal
      handleClose();
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <p style={pStyle}>Add a new relationship to rootPersonName</p>
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor='relationship'>
          Relationship to rootPersonName: <br />
        </label>
        <select
          id='relationship'
          name='relationship'
          value={formData.relationship}
          onChange={handleChange}
          required
        >
          <option value=''>Select a relationship</option>
          <option value='sister'>Sister</option>
          <option value='brother'>Brother</option>
          <option value='mother'>Mother</option>
          <option value='father'>Father</option>
          <option value='aunt'>Aunt</option>
          <option value='uncle'>Uncle</option>
          <option value='grandmother'>Grandmother</option>
          <option value='grandfather'>Grandfather</option>
          <option value='daughter'>Daughter</option>
          <option value='son'>Son</option>
          <option value='cousin'>Cousin</option>
          <option value='niece'>Niece</option>
          <option value='nephew'>Nephew</option>
        </select>
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor='birthDate'>Birth Date:</label>
        <input
          type='date'
          id='birthDate'
          name='birthDate'
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor='deathDate'>Death Date:</label>
        <input
          type='date'
          id='deathDate'
          name='deathDate'
          value={formData.deathDate}
          onChange={handleChange}
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor='birthTown'>Birth Town:</label>
        <input
          type='text'
          id='birthTown'
          name='birthTown'
          value={formData.birthTown}
          onChange={handleChange}
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor='bio'>Bio (Max 500 characters):</label>
        <textarea
          id='bio'
          name='bio'
          value={formData.bio}
          onChange={handleChange}
          maxLength='500'
          rows='4'
        />
      </div>

      <button type='submit' style={buttonStyle}>
        Submit
      </button>
    </form>
    </div>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #cccccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const pStyle = {
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bolder',
    color: 'purple',
  };

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AddPersonForm;
