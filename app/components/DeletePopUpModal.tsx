import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { RxCross2 } from "react-icons/rx";

// Define the styles object for the modal
const style = {
  position: "absolute" as const, // Use 'as const' to ensure this value is treated as a constant
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

// Define props interface for DeletePopUpModal component
interface DeletePopUpModalProps {
  deleteOpen: boolean; // Boolean to control the modal open state
  setDeleteOpen: (open: boolean) => void; // Function to set the modal open state
  selectedRowId: string | number; // ID of the selected row, can be a string or number
}

// Define the DeletePopUpModal component
const DeletePopUpModal: React.FC<DeletePopUpModalProps> = ({
  deleteOpen,
  setDeleteOpen,
  selectedRowId,
}) => {
  const handleClose = () => setDeleteOpen(false);

  return (
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
          <RxCross2 className="h-4 w-4 cursor-pointer" onClick={handleClose} />
        </div>

        <p className="text-sm">
          Are you sure you want to delete this Members details? This action
          cannot be undone.
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-primary-light py-2 px-4 font-medium text-white rounded-md"
            onClick={() => {
              // Perform delete action here, passing the selectedRowId
              console.log(`Deleting member with ID: ${selectedRowId}`);
              handleClose();
            }}
          >
            DELETE
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeletePopUpModal;
