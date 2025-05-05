import NavBar from "../NavBar/NavBar";
import { useState } from "react";

const ArticleView = () => {
  const [comment, setComment] = useState("");

  const Article = {
    title: "Title",
    body: "Body",
    date: "1/20/2000",
  };

  const Comment = {
    user: "User",
    comment: "Comment body",
    date: "1/20/2000"
  }

  return (
    <div className="container">
      <NavBar header={"Reader View"} button={true} />
      <div className="article-container">
        <h2>{Article.title}</h2>
        <p>{Article.body}</p>
        <p>{Article.date}</p>
      </div>
      <form>
        <h3>Comments:</h3>
        <div>
            <p>{Comment.user}</p>
            <p>{Comment.comment}</p>
            <p>{Comment.date}</p>
        </div>
        <label>Insert Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ArticleView;
