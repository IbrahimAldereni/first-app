import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../App";
import { profileService } from "../../services/profileService";
import PostCard from "../PostCard";

function ProfilePage() {
  // hooks
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    profileService.getPosts(user.id).then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return <PostCard data={post} />;
      })}
    </div>
  );
}

export default ProfilePage;
