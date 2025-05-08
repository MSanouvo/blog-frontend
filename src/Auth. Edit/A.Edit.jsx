import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";

const AuthorEdit = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(null);
  // const [pending, setPending] = useState(false);

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
        setPublished(json.article[0].published);
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
    const content = { title, body, published };
    try {
      console.log("try");
      const response = await fetch("http://localhost:3000/api/articles/1", {
        method: "PUT",
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

export default AuthorEdit;
