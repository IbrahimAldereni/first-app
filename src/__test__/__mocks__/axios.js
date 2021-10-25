const mockResponse = {
  data: [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
    },
  ],
};

const axios = {
  get: jest.fn().mockResolvedValue(mockResponse),
};

export default axios;
