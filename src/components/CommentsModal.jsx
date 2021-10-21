import React, { useEffect, useState } from "react";

import { Modal, Button } from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";

import Comment from "./Comment";
import { profileService } from "../services/profileService";

// style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",

  boxShadow: 24,
  p: 4,
  height: 700,
  overflow: "auto",
};

function CommentsModal({ open, handleClose, postId }) {
  // hooks
  const [comments, setComments] = useState([]);

  useEffect(() => {
    profileService.getComments(postId).then((data) => {
      setComments(data);
    });
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {comments.map((comment) => {
          return <Comment data={comment} />;
        })}
        <Button
          onClick={handleClose}
          color="error"
          variant="contained"
          startIcon={<CancelIcon />}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default CommentsModal;
