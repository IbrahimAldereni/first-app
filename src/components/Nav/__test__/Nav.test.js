import { render, screen } from "@testing-library/react";

import Nav from "../Nav";
import { UserContext } from "../../../App";

//////////////////////////// test nav title ////////////////////////////////////
test("render nav title", () => {
  render(
    <UserContext.Provider value={{}}>
      <Nav />
    </UserContext.Provider>
  );

  //   const title = screen.getByText(/first app/i);
  const title = screen.getByRole("heading", { name: /first app/i });

  expect(title).toBeInTheDocument();
});

//////////////////////////// test nav username ////////////////////////////////////
test("check nav username not displayed when not login", () => {
  const user = {};

  render(
    <UserContext.Provider value={{ user }}>
      <Nav />
    </UserContext.Provider>
  );

  const username = screen.getByTitle("navUsername", { name: " " });

  expect(username).toBeInTheDocument();
});

test("check nav username displayed when login", () => {
  const user = { name: "ahmad" };

  render(
    <UserContext.Provider value={{ user }}>
      <Nav />
    </UserContext.Provider>
  );

  const username = screen.getByTitle("navUsername", { name: /ahmad/i });

  expect(username).toBeInTheDocument();
});

//////////////////////////// test nav avatar ////////////////////////////////////
test("check nav avatar icon shown when not login", () => {
  const user = {};

  render(
    <UserContext.Provider value={{ user }}>
      <Nav />
    </UserContext.Provider>
  );

  const avatarLetter = screen.getByTitle("navAvatar", { name: " " });
  // avatar (svg) have testid = PersonIcon
  const avatarIcon = screen.getByTestId("PersonIcon");

  expect(avatarLetter).toBeInTheDocument();
  expect(avatarIcon).toBeInTheDocument();
});

test("check nav first letter avatar shown when login", () => {
  const user = { name: "ahmad" };

  render(
    <UserContext.Provider value={{ user }}>
      <Nav />
    </UserContext.Provider>
  );

  const avatarLetter = screen.getByTitle("navAvatar", { name: "A" });
  // I used query instead of get to return null if the element not found
  const avatarIcon = screen.queryByTestId("PersonIcon");

  expect(avatarLetter).toBeInTheDocument();
  expect(avatarIcon).toBeNull();
});
