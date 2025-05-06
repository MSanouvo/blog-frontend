import NavBar from "../NavBar/NavBar";
import { useState } from "react";

const WriteArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    console.log(token);
    const content = { title, body, published };
    try {
      console.log("try");
      const response = await fetch("http://localhost:3000/api/articles/new", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(content),
      });
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
  //Like Articles/Comments
  //Button/checkbox to toggle like/unliked
  //Onchange triggers request to API
  //First request creates the instance, 
  // subsequent will just edit the liked boolean


  return (
    <div className="container">
      <NavBar header={"Write Article"} button={true} />
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />

        <label>Publish Article</label>
        <input
          type="checkbox"
          defaultChecked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />

        <button>Submit</button>

        {/* {!pending && !isPublished && <button type="submit" onClick={ ()=>setIsPublished(true) }>Publish</button>}
        {pending && !isPublished && <button disabled>Publishing</button>}

        {!pending && isPublished && <button type="submit" onClick={ ()=>setIsPublished(false) }>Unpublish</button>}
        {pending && isPublished && <button disabled>Unpublishing</button>} */}
      </form>
    </div>
  );
};

export default WriteArticle;
