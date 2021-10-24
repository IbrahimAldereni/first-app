import { render, screen, fireEvent } from "@testing-library/react";

import { UserContext } from "../App";
import LoginPage from "../components/pages/LoginPage/LoginPage";

// mocks
const mockSetUser = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

// mock login page component
const MockLoginPage = ({ setUser }) => {
  return (
    <UserContext.Provider value={{ mockSetUser }}>
      <LoginPage />
    </UserContext.Provider>
  );
};

/////////////////////////// read input values /////////////////////////////
describe("read input values", () => {
  test("should type on email input value", async () => {
    render(<MockLoginPage setUser={mockSetUser} />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@yahoo.com" } });
    expect(emailInput).toHaveValue("test@yahoo.com");
  });

  test("should type on password input value", () => {
    render(<MockLoginPage setUser={mockSetUser} />);

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "123" } });
    expect(passwordInput).toHaveValue("123");
  });
});

/////////////////////////// test correct emails and wrong emails /////////////////////////////
test("Form entering wrong email", () => {
  render(<MockLoginPage setUser={mockSetUser} />);

  const emailInput = screen.getByLabelText(/email/i);
  const form = screen.getByTitle(/loginForm/i);

  fireEvent.change(emailInput, { target: { value: "Sincere@april.biz" } }); // invoke handleChange
  fireEvent.submit(form);

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
});
