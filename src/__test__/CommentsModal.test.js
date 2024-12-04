import { act, render, screen } from "@testing-library/react";
import axios from "axios";
import CommentsModal from "../components/CommentsModal/CommentsModal";

describe("test comments modal", () => {
  test("should show comments", async () => {
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
      render(<CommentsModal open={true} postId={1} />);
    });

    const commentCard = screen.getByTitle("commentCard1");

    expect(commentCard).toBeInTheDocument();
  });
});
