import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Button, Skeleton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { makeStyles } from "@mui/styles";

import { UserContext } from "../../App";
import { profileService } from "../../services/profileService";
import CommentsModal from "../CommentsModal";
import PostCard from "../PostCard";

// style
const useStyles = makeStyles({
  skeleton: {
    width: "100%",
    height: "150px !important",
    marginBottom: 20,
  },
});

function ProfilePage() {
  // hooks
  const { user } = useContext(UserContext);

  const history = useHistory();

  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    profileService.getPosts(user.id).then((data) => {
      setPosts(data);
    });
  }, []);

  // functions
  const closeModal = () => {
    setShow(false);
  };

  const openModal = (id) => {
    setPostId(id);
    setShow(true);
  };

  return (
    <div>
      <Button
        onClick={() => history.push("/")}
        startIcon={<KeyboardBackspaceIcon />}
        sx={{ marginY: "30px" }}
      >
        Back to login page
      </Button>

      {posts.length > 1
        ? posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                data={post}
                handleOpen={(id) => openModal(id)}
              />
            );
          })
        : [1, 2, 3, 4, 5].map((num, index) => {
            return (
              <Skeleton
                key={index}
                variant="rectangular"
                className={classes.skeleton}
              />
            );
          })}

      {/* modal */}
      <CommentsModal open={show} handleClose={closeModal} postId={postId} />
    </div>
  );
}

export default ProfilePage;
