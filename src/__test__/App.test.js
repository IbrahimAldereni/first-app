import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import axios from "axios";
import App, { UserContext } from "../App";

describe("App", () => {
  test("should match snapshot", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          userId: 1,
        },
      ],
    });

    const setUser = jest.fn();

    await act(async () => {
      render(
        <UserContext.Provider
          value={{ user: { id: 1, email: "a@a.com" }, setUser }}
        >
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </UserContext.Provider>
      );
    });

    expect(screen).toMatchSnapshot();
  });
});
