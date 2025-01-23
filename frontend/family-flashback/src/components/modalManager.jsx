import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import AddPersonForm from './addPerson'; 

const ModalManager = ({ children, rootPerson }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            border: '2px solid #000',
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