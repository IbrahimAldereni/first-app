import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../App";
import { profileService } from "../../services/profileService";
import CommentsModal from "../CommentsModal";
import PostCard from "../PostCard";

function ProfilePage() {
  // hooks
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [postId, setPostId] = useState(0);

  // functions
  const closeModal = () => {
    setShow(false);
  };

  const openModal = (id) => {
    setPostId(id);
    setShow(true);
  };

  useEffect(() => {
    profileService.getPosts(user.id).then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            data={post}
            handleOpen={(id) => openModal(id)}
          />
        );
      })}

      {/* modal */}
      <CommentsModal open={show} handleClose={closeModal} postId={postId} />
    </div>
  );
}

export default ProfilePage;
