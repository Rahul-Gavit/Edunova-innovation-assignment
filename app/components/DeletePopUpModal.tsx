import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { RxCross2 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

const DeletePopUpModal = ({ deleteOpen, setDeleteOpen, selectedRowId }) => {
  const handleClose = () => setDeleteOpen(false);
  return (
    <div>
      <Modal
        open={deleteOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between mb-4">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              fontWeight={600}
            >
              Delete Member Details
            </Typography>
            <RxCross2 className="h-4 w-4" onClick={handleClose} />
          </div>

          <p className="text-sm">
            Are you sure you want to delete this Member details? This action
            cannot be undone.
          </p>
          <div className="flex justify-end mt-4">
            <button className="bg-primary-light py-2 px-4 font-medium text-white rounded-md">
              DELETE
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeletePopUpModal;
