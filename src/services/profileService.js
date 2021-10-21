import axios from "axios";

class ProfileService {
  apiUrl = "https://jsonplaceholder.typicode.com/posts";

  async getPosts(userID) {
    try {
      const response = await axios.get(this.apiUrl);

      let filteredPosts = [];

      if (response.data) {
        filteredPosts = response.data?.filter((post) => {
          return post.userId === userID;
        });
      }
      return filteredPosts;
    } catch (error) {
      return error.message;
    }
  }
}

export const profileService = new ProfileService();
