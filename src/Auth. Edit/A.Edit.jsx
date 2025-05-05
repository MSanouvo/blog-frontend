import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";

const AuthorEdit = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPublished, setIsPublished] = useState(false)
  const [pending, setPending] = useState(false)

  // useEffect = () => {
  //     /* GET api data and use it to load articles */
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = { title, body, isPublished };

    fetch("API endpoint here", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    }).then(() => {
      console.log("Article uploaded");
    });
  };


  return (
    <div className="container">
      <NavBar header={"Author Edit"} button={true} />
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />

        {!pending && !isPublished && <button onClick={ ()=>setIsPublished(true) }>Publish</button>}
        {pending && !isPublished && <button disabled>Publishing</button>}

        {!pending && isPublished && <button onClick={ ()=>setIsPublished(false) }>Unpublish</button>}
        {pending && isPublished && <button disabled>Unpublishing</button>}
      </form>
    </div>
  );
};

export default AuthorEdit;
