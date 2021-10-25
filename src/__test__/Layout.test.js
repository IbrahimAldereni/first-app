import { act, render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../App";
import Layout from "../components/Layout/Layout";

describe("test layout page", () => {
  test("should show navbar", () => {
    const user = {};
    render(
      <UserContext.Provider value={{ user }}>
        <Layout />
      </UserContext.Provider>
    );

    const layoutContainer = screen.getByTitle("layoutContainer");
    const navbar = screen.getByTitle("nav");

    expect(layoutContainer).toBeInTheDocument();
    expect(navbar).toBeInTheDocument();
  });
});
