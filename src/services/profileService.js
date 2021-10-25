import axios from "axios";

class ProfileService {
  async getPosts(userID) {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    try {
      const response = await axios.get(apiUrl);

      let filteredPosts = [];

      if (response.data) {
        filteredPosts = response.data?.filter((post) => {
          return post.userId === userID;
        });
      }
      return filteredPosts;
    } catch (error) {
      return error;
    }
  }

  async getComments(postId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

    try {
      const response = await axios.get(apiUrl);

      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export const profileService = new ProfileService();
