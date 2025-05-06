import "./Comment.css";
import { useState } from "react";

const Comment = ({ id, user, body, date }) => {
  const [liked, setLiked] = useState(false);

  async function likeComment() {
    const token = localStorage.getItem("jwt");

    try {
      console.log("try");
      console.log(liked);
      if (!liked) {
        setLiked(true);
        console.log("comment liked");
        const response = await fetch(
          `http://localhost:3000/api/articles/1/comment/${id}/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          console.log("not ok");
          throw new Error(`Error ${response.status}`);
        }
      } else {
        console.log("already liked");
        setLiked(false);
        console.log("comment unliked");
        const response = await fetch(
          `http://localhost:3000/api/articles/1/comment/${id}/like`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          console.log("not ok");
          throw new Error(`Error ${response.status}`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="comment-container">
      <h2>{user}</h2>
      <p>{body}</p>
      <p>{date}</p>
      <p>{id}</p>
      <button onClick={likeComment}>Like</button>
    </div>
  );
};

export default Comment;
