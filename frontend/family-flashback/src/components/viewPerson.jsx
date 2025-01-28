import {
  borderRadius,
  display,
  fontSize,
  fontWeight,
  height,
  margin,
  maxHeight,
  minHeight,
  minWidth,
  padding,
} from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function ViewPerson() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [rootPersonData, setRootPersonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    // age: '',
    birthDate: '',
    deathDate: '',
    birthTown: '',
    bio: '',
  });
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);

  const location = useLocation();
  const { rootPerson } = location.state || {};

  console.log('rootperson ' + rootPerson);

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

  // Get age
  const age = () => {
    const birthDate = new Date(rootPersonData?.birthDate);
    const deathDate = new Date(rootPersonData?.deathDate);
    
    let age;
    if (rootPersonData?.deathDate) {
    //   console.log('person is deceased');
      age = deathDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = deathDate.getMonth() - birthDate.getMonth();

      // TEST THIS! -  MIGHT NOT NEED THIS HERE
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && deathDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;

    } else {
    //   console.log('person is alive');
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    }
  };



  // Update form data when rootPersonData is available
  useEffect(() => {
    if (rootPersonData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: rootPersonData.name || '',
        // age: age() || '',
        bio: rootPersonData.bio || '',
        birthDate: rootPersonData.birthDate || '',
        deathDate: rootPersonData.deathDate || '',
        birthTown: rootPersonData.birthTown || '',
      }));
    }
  }, [rootPersonData]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
    setFormData((prevData) => ({
        ...prevData,
        bio: e.target.value,
      }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormData((prevData) => ({
        ...prevData,
        name: e.target.value,
      }));
  };

  const handleEditClick = () => {
    setIsDisabled(false);
  };

  const handlleCancelClick = () => {
    setIsDisabled(true);
  };

  const handleDeleteClick = () => {
    setWarningIsOpen(true);

  };


    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

// Request to Patch rootPerson
        
            const requestData = JSON.stringify(formData);  // updateData should be the data you want to send
        
            fetch(`http://localhost:8080/persons/${rootPerson}`, {
              method: 'PATCH',  // Change the method to PATCH
              headers: {
                'Content-Type': 'application/json',  // Send data as JSON
              },
              body: requestData,  // Attach the data to the body
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to update ${rootPerson}`);
                }
                return response.json();
              })
              .then((data) => {
                setRootPersonData(data);  // Store the updated person data
                setSuccessIsOpen(true);
                setLoading(false);
              })
              .catch((error) => {
                setError(error.message);  // Catch any error and display it
                setLoading(false);
              });
         



       console.log(requestData);
   
        console.log(formData);
        setIsDisabled(true);
    };

  
//   const dataToSubmit = {
//     ...formData,
//     bio,
//     name, // Include the bio from the extra field here
//   };
//   console.log('Form data:', dataToSubmit);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={{ ...boxStyle, ...topStyle }}>
          <div style={profilePicStyle}>
            <img src=''></img>
          </div>
          <div style={profileDetailsStyle}>
            <div style={profileHeadingStyle}>
              <input
                    style={{...h2Style,
                        ...(isDisabled ? inputStyle : activeInputStyle),
                    }}
                    type='text'
                    id='name'
                    name='name'
                    disabled={isDisabled}
                    value={formData.name}
                    onChange={handleNameChange}
                  />
              {isDisabled && (
                <div style={buttonGroupStyle}>
                  <button onClick={handleEditClick} title='Edit person'>
                    &#9998;
                  </button>
                  <button title='Delete person'>&#10060;</button>
                </div>
              )}
            </div>
            <div style={personDetailsStyle}>
              <form style={formGroupStyle} onSubmit={handleSubmit}>
                <div style={inputGroupStyle}>
                  <label htmlFor='age'>Age:</label>
                  <input
                    style={inputStyle}
                    type='text'
                    id='age'
                    name='age'
                    disabled
                    value={`${age()}`}
                    onChange={handleChange}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label htmlFor='birthDate'>Birth Date:</label>
                  <input
                    style={isDisabled ? inputStyle : activeInputStyle}
                    type='date'
                    id='birthDate'
                    name='birthDate'
                    disabled={isDisabled}
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>

{/* This is functioning maybe. Will not accept show div until rootperson is updated after save. */}
{(rootPersonData?.deathDate !== null || !isDisabled) && (
                <div style={inputGroupStyle}>
                  <label htmlFor='deathDate'>Death Date:</label>
                  <input
                    style={isDisabled ? inputStyle : activeInputStyle}
                    type='date'
                    id='deathDate'
                    name='deathDate'
                    disabled={isDisabled}
                    value={formData.deathDate}
                    onChange={handleChange}
                  />
                </div>
                )}

                <div style={inputGroupStyle}>
                  <label htmlFor='birthTown'>Birth Town:</label>
                  <input
                    style={isDisabled ? inputStyle : activeInputStyle}
                    type='text'
                    id='birthTown'
                    name='birthTown'
                    disabled={isDisabled}
                    value={formData.birthTown}
                    onChange={handleChange}
                  />
                </div>
                {!isDisabled && (
                  <div style={editingButtonGroupStyle}>
                    <button type='submit' style={submitButtonStyle}>
                      Save
                    </button>
                    <button
                      type='button'
                      style={cancelButtonStyle}
                      onClick={handlleCancelClick}
                    >
                      Discard Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div style={bioStyle}>
            <h2 style={h2Style}>Biography</h2>
            <textarea
              id='bio'
            value={formData.bio}
            // value='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              disabled={isDisabled}
              onChange={handleBioChange}
              style={isDisabled ? bioContentStyle : activeBioContentStyle}
            />
          </div>
        </div>
        <div style={{ ...boxStyle, ...bottomStyle }}>images</div>
      </div>
      <Stack sx={{ width: '100%'}} spacing={2}>
      {/* <Alert
        severity="warning"
        action={
            <div style={{display: 'flex', gap: '10px'}}>
          <Button color="error" size="small" variant="outlined">
            DELETE
          </Button> 
          <Button color="inherit" size="small" variant="outlined">
            CANCEL
          </Button>
          </div>
        }
      >
        Are you sure you want to delete {rootPersonData?.name}? This cannot be undone.
      </Alert> */}
       {successIsOpen && (
      <Alert severity="success" onClose={() => {setSuccessIsOpen(false)}}>Person profile for {rootPersonData?.name} has been updated.</Alert>
       )}
    </Stack>
    </div>
  );
}


// ---------ALERT STYLES----------

// ---------FORM STYLES------------
const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignContent: 'center',
  gap: '5px',
  height: '100%',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const labelStyle = {
  //paddingRight: '10px',
};

const inputStyle = {
  width: '70%',
  //   padding: '10px',
};

const activeInputStyle = {
  width: '70%',
  border: '2px solid #5A4FCF',
  borderRadius: '3px',
  padding: '5px',
};

const personDetailsStyle = {
  border: '1px solid black',
  borderRadius: '5px',
  padding: '10px',
  margin: '10px auto',
  //height: '80%',
};

const profileHeadingStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '5px',
  color: '#5A4FCF',
  fontSize: '20px',
};

const editingButtonGroupStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: '10px',
  justifyContent: 'space-between',
};

const h2Style = {
  color: '#5A4FCF',
  fontWeight: 'bolder',
  fontSize: '1.2rem',
};

const containerStyle = {
  backgroundImage: 'radial-gradient(circle, white, #5A4FCF)',
  height: '80vh',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  margin: 'auto',
  backgroundColor: 'white',
  height: '100%',
};

const boxStyle = {
  //border: '1px solid #5A4FCF',
  borderRadius: '10px',
  width: '95%',
  margin: '15px auto 0 auto',
  backgroundColor: '#D3D3D3',
  //background: 'radial-gradient(circle, white 0%, #5A4FCF 0%, #D3D3D3 100%)',
  padding: '10px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
};

const topStyle = {
  display: 'flex',
  flexDirection: 'row',
  //flexWrap: 'wrap',
  //minHeight: '34vh',
  gap: '10px',
  margin: 'auto',
};

const profilePicStyle = {
  backgroundColor: 'white',
  padding: '10px',
  border: '1px solid #5A4FCF',
  //minWidth: '225px',
  width: '20%',
  borderRadius: '10px',
};

const profileDetailsStyle = {
  backgroundColor: 'white',
  padding: '10px',
  border: '1px solid #5A4FCF',
  width: '40%',
  borderRadius: '10px',
};

const bioStyle = {
  backgroundColor: 'white',
  padding: '10px',
  border: '1px solid #5A4FCF',
  //minWidth: '225px',
  width: '38%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
};

const bioContentStyle = {
  width: '100%',
  height: '100%',
  // overflowY: 'scroll',
  border: '1px solid black',
  borderRadius: '5px',
  padding: '10px',
  margin: '10px auto',
  resize: 'none',
};

const activeBioContentStyle = {
  width: '100%',
  height: '81%',
  border: '2px solid #5A4FCF',
  borderRadius: '5px',
  padding: '10px',
  margin: '10px auto',
  resize: 'none',
};

const bottomStyle = {
  marginBottom: '15px',
  padding: '10px',
  minHeight: '41vh',
};

const submitButtonStyle = {
  padding: '0px 20px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '30%',
};

const cancelButtonStyle = {
  padding: '0px 20px',
  backgroundColor: '#D86B6B',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '48%',
};

export default ViewPerson;
