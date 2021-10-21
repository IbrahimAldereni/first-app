import axios from "axios";

class LoginService {
  apiUrl = "https://jsonplaceholder.typicode.com/users";

  async getAllUsers() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
}

export const loginService = new LoginService();
