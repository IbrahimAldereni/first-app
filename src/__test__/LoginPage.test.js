import { render, screen, fireEvent, act } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { UserContext } from "../App";
import LoginPage from "../components/pages/LoginPage/LoginPage";

// mocks
const setUser = jest.fn();

// mock login page component
const MockLoginPage = () => {
  return (
    <UserContext.Provider value={{ setUser }}>
      <LoginPage />
    </UserContext.Provider>
  );
};

/////////////////////////// read input values /////////////////////////////
describe("read input values", () => {
  test("should type on email input value", async () => {
    await act(async () => {
      render(<MockLoginPage />);
    });

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@yahoo.com" } });
    expect(emailInput).toHaveValue("test@yahoo.com");
  });

  test("should type on password input value", async () => {
    await act(async () => {
      render(<MockLoginPage />);
    });

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "123" } });
    expect(passwordInput).toHaveValue("123");
  });
});

/////////////////////////// test correct emails and wrong emails /////////////////////////////
describe("test redirect after login", () => {
  test("Form entering wrong email", async () => {
    const history = createMemoryHistory();

    await act(async () => {
      render(
        <Router history={history}>
          <MockLoginPage />
        </Router>
      );
    });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByTitle(/loginForm/i);

    fireEvent.change(emailInput, { target: { value: "a@a" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.submit(form);

    expect(history.location.pathname).toBe("/");
  });

  test("Form entering correct email", async () => {
    const history = createMemoryHistory();

    await act(async () => {
      render(
        <Router history={history}>
          <MockLoginPage />
        </Router>
      );
    });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByTitle(/loginForm/i);

    fireEvent.change(emailInput, { target: { value: "Sincere@april.biz" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.submit(form);

    expect(history.location.pathname).toBe("/profile");
  });
});
