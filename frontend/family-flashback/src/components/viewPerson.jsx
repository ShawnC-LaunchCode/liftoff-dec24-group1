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
import { useNavigate } from 'react-router-dom';


function ViewPerson() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [rootPersonData, setRootPersonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    deathDate: '',
    birthTown: '',
    bio: '',
  });

  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const [imgFilesData, setImageFilesData] = useState({
    url: '',
    userId: '',
  });
  const [file, setFile] = useState(null);

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
        console.log(data);
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
      age = deathDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = deathDate.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && deathDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    } else {
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
      [name]: value ? value : '',
    }));
  };

  const handleBioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      bio: e.target.value,
    }));
  };

  const handleNameChange = (e) => {
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

  const handleDeleteUser = () => {
    navigate('/tree');
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.name === null || formData.name === '') {
      alert('Name is required');
      return;
    }

    // Request to Patch rootPerson
    const requestData = JSON.stringify(formData);

    fetch(`http://localhost:8080/persons/${rootPerson}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update ${rootPerson}`);
        }
        return response.json();
      })
      .then((data) => {
        setRootPersonData(data);
        setSuccessIsOpen(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    console.log(requestData);

    console.log(formData); // For testing
    setIsDisabled(true);
  };



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
    //   setImage(URL.createObjectURL(selectedFile)); // Preview image
      setFile(selectedFile); // Store file for upload
      console.log(selectedFile);
    }
  };

  const handleFileUpload = () => {
    if (rootPersonData?.user.id){
        console.log("user is" + rootPersonData.user.id);
        if (!file) {
            alert('Please select an image file.');
            return;
          }
          console.log("file to be uploaded" + file);  
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={{ ...boxStyle, ...topStyle }}>
          <div style={profilePicStyle}>
            <div style={profilePicInnerStyle}>
              <img src=''></img>
            </div>
          </div>
          <div style={profileDetailsStyle}>
            <div style={profileHeadingStyle}>
              <input
                style={{
                  ...h2Style,
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
                  <button onClick={handleDeleteClick} title='Delete person'>
                    &#10060;
                  </button>
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

                {(rootPersonData?.deathDate !== null || !isDisabled) && (
                  <div style={inputGroupStyle}>
                    <label htmlFor='deathDate'>Death Date:</label>
                    <input
                      style={isDisabled ? inputStyle : activeInputStyle}
                      type='date'
                      id='deathDate'
                      name='deathDate'
                      disabled={isDisabled}
                      value={formData.deathDate || ''}
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
              disabled={isDisabled}
              onChange={handleBioChange}
              style={isDisabled ? bioContentStyle : activeBioContentStyle}
            />
          </div>
        </div>
        <div style={{ ...boxStyle, ...bottomStyle }}>
          <div style={imgBoxStyle}>
            <div style={imgBoxHeaderStyle}>
              {/* <label for='images'>Images</label> */}
              <input
                type='file'
                id='images'
                name='images'
                accept='image/png, image/jpeg'
                onChange={handleFileChange}
              />
              <Button variant='outlined' size='small' onClick={handleFileUpload}>
                Upload
              </Button>
            </div>
            <div style={imgContentStyle}>Images will be here</div>
          </div>
        </div>
      </div>
      {(successIsOpen || warningIsOpen) && (
        <Stack
          sx={{
            width: '50%',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
          }}
          spacing={2}
        >
          {warningIsOpen && (
            <Alert
              severity='warning'
              action={
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    color='error'
                    size='small'
                    variant='outlined'
                    onClick={() => handleDeleteUser()}
                  >
                    DELETE
                  </Button>
                  <Button
                    color='inherit'
                    size='small'
                    variant='outlined'
                    onClick={() => setWarningIsOpen(false)}
                  >
                    CANCEL
                  </Button>
                </div>
              }
            >
              Are you sure you want to permanently delete {rootPersonData?.name}
              ? <br />
              This action CANNOT be undone.
            </Alert>
          )}

          {successIsOpen && (
            <Alert severity='success' onClose={() => setSuccessIsOpen(false)}>
              Person profile for {rootPersonData?.name} has been updated.
            </Alert>
          )}
        </Stack>
      )}
    </div>
  );
}

const profilePicInnerStyle = {
  border: '1px solid black',
  borderRadius: '5px',
  padding: '10px',
  margin: '10px auto',
};

const imgBoxHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const imgContentStyle = {
  backgroundColor: 'grey',
  margin: '10px auto',
  width: '100%',
};

const imgBoxStyle = {
  border: '1px solid #5A4FCF',
  borderRadius: '5px',
  padding: '10px',
  margin: '3px auto',
  backgroundColor: 'white',
  height: '98%',
  display: 'flex',
  flexDirection: 'column',
};

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
  minWidth: '150px',
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
