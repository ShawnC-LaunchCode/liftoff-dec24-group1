import React, { useState } from 'react';
import { Modal, Box} from '@mui/material';
import AddPersonForm from './addPerson'; 

const ModalManager = ({ children, rootPerson }) => {

  rootPerson = 'PmW73lTDWEkbYIMA_luu8';
  console.log('rootperson ' + rootPerson);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000); 
  };



  return (
    <>
      {/* Pass the `handleOpen` function down to the child component */}
      {React.cloneElement(children, { onOpenModal: handleOpen })}

      {/* Material-UI Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '1px solid #5A4FCF',
            borderRadius: '10px',
            boxShadow: 24,
            p: 1.5,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AddPersonForm handleClose={handleClose} rootPerson={rootPerson}/>
        </Box>
      </Modal>
    </>
  );
};

export default ModalManager;