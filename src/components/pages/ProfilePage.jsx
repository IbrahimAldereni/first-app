import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../App";
import { profileService } from "../../services/profileService";

function ProfilePage() {
  // hooks
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    profileService.getPosts(user.id).then((data) => {
      console.log(data);
      setPosts(data);
    });
  }, []);

  return <div>{posts[0]?.title}</div>;
}

export default ProfilePage;
