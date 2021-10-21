import React, { useEffect, useState } from "react";

import { Modal, Button, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { makeStyles } from "@mui/styles";

import Comment from "./Comment";
import { profileService } from "../services/profileService";

// style
const useStyles = makeStyles({
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    boxShadow: 24,
    padding: "25px 50px",
    height: 700,
    overflow: "auto",
  },
  skeleton: {
    width: "100%",
    height: "130px !important",
    marginBottom: 20,
  },
});

function CommentsModal({ open, handleClose, postId }) {
  // hooks
  const [comments, setComments] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setComments([]);

    // to fetch the data once the modal open (not twice when open/close)
    if (open) {
      profileService.getComments(postId).then((data) => {
        setComments(data);
      });
      console.log("open");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.box}>
        {comments.length > 1
          ? comments.map((comment) => {
              return <Comment key={comment.id} data={comment} />;
            })
          : [1, 2, 3, 4].map(() => {
              return (
                <Skeleton variant="rectangular" className={classes.skeleton} />
              );
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
