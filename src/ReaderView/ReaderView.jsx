import NavBar from "../NavBar/NavBar";
import Comment from "../Components/CommentView/Comment";
import { useState, useEffect } from "react";

const ArticleView = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [aritcleId, setArticleId] = useState("")
  const [allComments, setAllComments] = useState([]);
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState("");

  //NEED TO GET ID FOR ARTICLE LATER

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/articles/1", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        setTitle(json.article[0].title);
        setBody(json.article[0].content);
        setDate(json.article[0].date_created);
        setArticleId(json.article[0].id)
        setAllComments(json.comments);
        console.log(allComments);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    console.log(token);
    const content = { comment };
    try {
      console.log("try");
      const response = await fetch(
        "http://localhost:3000/api/articles/1/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(content),
        },
      );
      console.log(content);
      if (!response.ok) {
        console.log("not ok");
        throw new Error(`Error ${response.status}`);
      } else {
        const json = await response.json();
        console.log(json);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function likeArticle() {
    const token = localStorage.getItem("jwt");
    try {
      console.log("try");
      console.log(liked);
      if (!liked) {
        setLiked(true);
        console.log("article liked");
        const response = await fetch(
          `http://localhost:3000/api/articles/1/like`,
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
        console.log("article unliked");
        const response = await fetch(
          `http://localhost:3000/api/articles/1/like`,
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
    <div className="container">
      <NavBar header={"Reader View"} button={true} />
      {/* Make Component later */}
      <div className="article-container">
        <h2>{title}</h2>
        <p>{body}</p>
        <p>{date}</p>
        <button onClick={likeArticle}>Like</button>
      </div>

      <h3>Comments:</h3>
      {allComments.length != 0 &&
        allComments.map((comment) => {
          return (
              <Comment
                key={comment.id}
                id={comment.id}
              //Look into getting a username from prisma
                user={comment.user}
                body={comment.comment}
                date={comment.date_created}
              />
          );
        })}

      <form onSubmit={handleSubmit}>
        <label>Insert Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ArticleView;
