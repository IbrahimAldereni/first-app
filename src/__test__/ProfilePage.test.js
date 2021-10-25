import { act, render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { UserContext } from "../App";
import CommentsModal from "../components/CommentsModal/CommentsModal";
import ProfilePage from "../components/pages/ProfilePage/ProfilePage";

// mock profile page
const MockProfilePage = ({ user }) => {
  return (
    <UserContext.Provider value={{ user }}>
      <ProfilePage />
    </UserContext.Provider>
  );
};

////////////////////////////// test page render posts and skeleton////////////////////////////////
describe("test posts and skeleton renders", () => {
  test("should render skeleton", async () => {
    const user = {};

    axios.get.mockResolvedValueOnce({
      data: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ],
    });

    await act(async () => {
      render(<MockProfilePage user={user} />);
    });

    const postSkeleton = screen.getByTestId("postSkeleton0");

    expect(postSkeleton).toBeInTheDocument();
  });

  test("should render posts", async () => {
    const user = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    };

    axios.get.mockResolvedValueOnce({
      data: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ],
    });

    await act(async () => {
      render(<MockProfilePage user={user} />);
    });

    const postCard = screen.getByTitle("postCard1");

    expect(postCard).toBeInTheDocument();
  });
});

////////////////////////////// test comment modal ////////////////////////////////
describe("test comment modal", () => {
  test("should not show the comment modal", async () => {
    const user = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    };

    axios.get.mockResolvedValueOnce({
      data: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ],
    });

    await act(async () => {
      render(<MockProfilePage user={user} />);
    });

    const commentModal = screen.queryByTitle("commentModal");

    expect(commentModal).not.toBeInTheDocument();
  });

  test("should show the comment modal", async () => {
    const user = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    };

    axios.get.mockResolvedValueOnce({
      data: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ],
    });

    await act(async () => {
      render(<MockProfilePage user={user} />);
    });

    const commentButton = screen.getByTitle("commentsBtn");

    //  comments api data
    axios.get.mockResolvedValueOnce({
      data: [
        {
          postId: 1,
          id: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
        },
      ],
    });

    await act(async () => {
      fireEvent.click(commentButton);
    });

    const commentModal = screen.queryByTitle("commentModal");

    expect(commentModal).toBeInTheDocument();
  });

  test("should close the comment modal when press on close button", async () => {
    const user = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    };

    axios.get.mockResolvedValueOnce({
      data: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ],
    });

    await act(async () => {
      render(<MockProfilePage user={user} />);
    });

    const commentButton = screen.getByTitle("commentsBtn");

    //  comments api data
    axios.get.mockResolvedValueOnce({
      data: [
        {
          postId: 1,
          id: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
        },
      ],
    });

    await act(async () => {
      fireEvent.click(commentButton);
    });

    const commentModal = screen.queryByTitle("commentModal");
    const closeModalBtn = screen.getByTitle("closeModalBtn");
    fireEvent.click(closeModalBtn);

    expect(commentModal).not.toBeInTheDocument();
  });
});

////////////////////////////// test back to login page button ////////////////////////////////
test("should return to home page when click on the back button", async () => {
  const history = createMemoryHistory();

  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  };

  axios.get.mockResolvedValueOnce({
    data: [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
    ],
  });

  await act(async () => {
    render(
      <Router history={history}>
        <MockProfilePage user={user} />
      </Router>
    );
  });

  const backBtn = screen.getByTitle("backBtn");
  fireEvent.click(backBtn);

  expect(history.location.pathname).toBe("/");
});

///////////////////////////////// test error api request /////////////////////////////
describe("test wrong request", () => {
  test("should return error message from get posts request", async () => {
    const user = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    };

    axios.get.mockRejectedValueOnce();

    await act(async () => {
      render(<MockProfilePage user={user} />);
    });
  });

  test("should return error message from get comments request", async () => {
    axios.get.mockRejectedValueOnce();

    await act(async () => {
      render(<CommentsModal open={true} postId={1} />);
    });
  });
});
