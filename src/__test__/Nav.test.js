import { render, screen } from "@testing-library/react";

import Nav from "../components/Nav/Nav";
import { UserContext } from "../App";

// mock nav
const MockNav = ({ user }) => {
  return (
    <UserContext.Provider value={{ user }}>
      <Nav />
    </UserContext.Provider>
  );
};

//////////////////////////// test nav hading ////////////////////////////////////
describe("test nav heading", () => {
  test("render nav title", () => {
    render(<MockNav user="" />);

    const title = screen.getByRole("heading");
    expect(title).toHaveTextContent(/first app/i);

    // other ways:
    // 1
    //   const title = screen.getByText(/first app/i);
    // expect(title).toBeInTheDocument();

    // 2
    //   const title = screen.getByRole("heading", { name: /first app/i });
    //   expect(title).toBeInTheDocument();

    // 3
    //   const title = screen.getByRole("heading");
    //   expect(title.textContent).toBe("First App");
  });
});

//////////////////////////// test nav username ////////////////////////////////////
describe("test nav username", () => {
  test("check nav username not displayed when not login", () => {
    const user = {};

    render(<MockNav user={user} />);

    const username = screen.getByTitle("navUsername");

    expect(username).toBeEmptyDOMElement();

    // other ways:

    // 1
    //   const username = screen.getByTitle("navUsername").textContent;
    //   expect(username).toBeFalsy();

    // 2
    //   const username = screen.getByTitle("navUsername", { name: " " });
    //   expect(username).toBeInTheDocument();
  });

  test("check nav username displayed when login", () => {
    const user = { name: "ahmad" };

    render(<MockNav user={user} />);

    const username = screen.getByTitle("navUsername");

    expect(username).toHaveTextContent(/ahmad/i);

    // other ways:
    // 1
    //   const username = screen.getByText(/ahmad/i);
    //   expect(username).toBeInTheDocument();

    // 2
    //   const username = screen.getByTitle("navUsername").textContent;
    //   expect(username).toEqual("ahmad");
  });
});

//////////////////////////// test nav avatar ////////////////////////////////////
describe("test nav avatar", () => {
  test("check nav avatar icon shown when not login", () => {
    const user = {};

    render(<MockNav user={user} />);

    const avatar = screen.getByTitle("navAvatar");

    // if the svg photo is exist so the user not logged in
    expect(avatar).toContainHTML("svg");
    expect(avatar).toHaveTextContent("");
  });

  test("check nav first letter avatar shown when login", () => {
    const user = { name: "ahmad" };

    render(<MockNav user={user} />);

    const avatar = screen.getByTitle("navAvatar");

    expect(avatar).not.toContainHTML("svg");
    expect(avatar).toHaveTextContent("A");
  });
});
