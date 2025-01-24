import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function AddPersonForm({ handleClose, rootPerson}) {

  const [rootPersonData, setRootPersonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    deathDate: '',
    birthTown: '',
    bio: '',
    relationship: '',
    user: {
      id: '',
    },
  });

  let rootPersonName;

  // Request for rootPersonData
  useEffect(() => {
    fetch(`http://localhost:8080/persons/${rootPerson}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to get rootPerson details');
          }
        return response.json();
      })
      .then((data) => {
        setRootPersonData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

rootPersonName = rootPersonData?.name;

// Update formData when rootPersonData is changed
useEffect(() => {
    if (rootPersonData) {
      const userId = rootPersonData?.user.id;
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: {
          id: userId,
        },
      }));
    }
  }, [rootPersonData]); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

// Form submission
const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    // Request to submit formData
    fetch('http://localhost:8080/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        return response.json();
      })
      .then((result) => {
        const relationshipData = {
          rootPerson: rootPerson,
          relatedPerson: result.id,
          relationship: formData.relationship,
        };
  
        // Request to submit relationshipData
        return fetch('http://localhost:8080/relation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(relationshipData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit relationship');
        }
        return response.json();
      })
      .then((result) => {
        setOpen(true);
        //alert(`New relationship has been added to ${rootPersonName}`);
        console.log('Response:', result);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
        handleClose(); // Close modal
      });
  };

  return (
    <div>
        <Snackbar open={open} 
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ position: 'fixed', bottom: 0, left: 0 }}>
    <Alert severity="success">New relationship has been added to {rootPersonName}</Alert>
    </Snackbar>
      <div style={headingStyle}>
        <h2 style={h2Style}>Add a new relationship to {rootPersonName}</h2>
        <button onClick={handleClose} style={closeButtonStyle}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor='name'>Name: </label>
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
            Relationship to {rootPersonName}: <br />
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
          <label htmlFor='birthDate'>Birth Date: </label>
          <input
            type='date'
            id='birthDate'
            name='birthDate'
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor='deathDate'>Death Date: </label>
          <input
            type='date'
            id='deathDate'
            name='deathDate'
            value={formData.deathDate}
            onChange={handleChange}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor='birthTown'>Birth Town: </label>
          <input
            type='text'
            id='birthTown'
            name='birthTown'
            value={formData.birthTown}
            onChange={handleChange}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor='bio'>Biography: </label>
          <textarea
            id='bio'
            name='bio'
            value={formData.bio}
            onChange={handleChange}
            maxLength='500'
            rows='4'
          />
        </div>

        <button type='submit' style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

const headingStyle = {
  display: 'flex',
  padding: '0 5px',
  marginBottom: '10px',
  justifyContent: 'space-between',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  margin: '5px auto 15px auto',
  padding: '20px',
  border: '1px solid #cccccc',
  borderRadius: '8px',
  backgroundColor: '#e0e0e0',
  justifyContent: 'center',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const h2Style = {
  fontSize: '18px',
  color: '#5A4FCF',
  marginTop: '10px',
  paddingRight: '10px',
  alignSelf: 'end',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '40%',
  alignSelf: 'center',
};

const closeButtonStyle = {
  fontSize: '25px',
  color: '#B4A9FF',
  alignSelf: 'start',
};

export default AddPersonForm;
