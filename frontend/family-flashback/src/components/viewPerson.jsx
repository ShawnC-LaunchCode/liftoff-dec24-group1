import {
  display,
  fontSize,
  fontWeight,
  height,
  margin,
  minHeight,
  minWidth,
  padding,
} from '@mui/system';
import React, { useState, useEffect } from 'react';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function ViewPerson() {

    const [isDisabled, setIsDisabled] = useState(true);

    const [formData, setFormData] = useState({
        age: '74',
        birthDate: '',
        deathDate: '',
        birthTown: '',
        bio: 'This is the test',
      });

      const [bio, setBio] = useState('');

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleBioChange = (e) => {
        setBio(e.target.value);
      };

      const handleEditClick = () => {
 setIsDisabled(false);
      };

      const handlleCancelClick = () => {
        setIsDisabled(true);
      };


          // Manually add the bio outside the form to the form data before submission
    const dataToSubmit = {
        ...formData,
        bio,  // Include the bio from the extra field here
      };
  
      console.log('Form data:', dataToSubmit);

    
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={{ ...boxStyle, ...topStyle }}>
          <div style={profilePicStyle}>
            <img src=''></img>
          </div>
          <div style={profileDetailsStyle}>
            <div style={profileHeadingStyle}>
              <h2 style={h2Style}>Lori Phillips</h2>
              <div style={buttonGroupStyle}>
                <button onClick={handleEditClick} title='Edit person'>&#9998;</button>
                <button title='Delete person'>&#10060;</button>
              </div>
            </div>
            <div style={personDetailsStyle}>
              <form style={formGroupStyle}>
                {/* <form onSubmit={handleSubmit}> */}
                <div style={inputGroupStyle}>
                  <label htmlFor='age'>Age:</label>
                  <input
                    style={inputStyle}
                    type='text'
                    id='age'
                    name='age'
                    disabled={isDisabled}
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label htmlFor='birthDate'>Birth Date:</label>
                  <input
                    style={inputStyle}
                    type='date'
                    id='birthDate'
                    name='birthDate'
                    disabled={isDisabled}
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label htmlFor='deathDate'>Death Date:</label>
                  <input
                    style={inputStyle}
                    type='date'
                    id='deathDate'
                    name='deathDate'
                    disabled={isDisabled}
                    value={formData.deathDate}
                    onChange={handleChange}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label htmlFor='birthTown'>Birth Town:</label>
                  <input
                    style={inputStyle}
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
          <button type="submit" style={submitButtonStyle}>
            Save
          </button>
          <button type="button" style={cancelButtonStyle} onClick={handlleCancelClick}>
            Discard Changes
          </button>
        </div>
      )}
              </form>
            </div>
          </div>
          <div style={bioStyle}>
            <h2 style={h2Style}>Biography</h2>
            {/* <label htmlFor='bioExtra'>Additional Bio:</label> */}
            <textarea
              id='bio'
              value={formData.bio} 
              disabled={isDisabled}
              onChange={handleBioChange} 
              style={bioContentStyle} 
            />
          </div>
        </div>
        <div style={{ ...boxStyle, ...bottomStyle }}>images</div>
      </div>
    </div>
  );
}

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignContent: 'center',
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
 // backgroundColor: 'cyan',
};

const personDetailsStyle = {
  border: '1px solid black',
  padding: '10px',
  margin: '10px auto',
  height: '80%',
  //backgroundColor: 'cyan',
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
    justifyContent: 'space-between',
    //gap: '5px',
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
  minHeight: '34vh',
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
  borderRadius: '10px',
};

const bioContentStyle = {
  width: '100%',
  height: '81%',
  // overflowY: 'scroll',
  border: '1px solid black',
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
    //alignSelf: 'center',
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
