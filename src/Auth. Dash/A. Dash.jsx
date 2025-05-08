import Preview from "../Components/ArticlePreview/ArticlePreview";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";

const AuthorDashboard = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/articles",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const json = await response.json();
        console.log(json.articles);
        setData(json.articles);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  //ADD CONFIRMATION
  async function deleteArticle(article_id) {
    alert(`delete article ${article_id}`);
    try {
      const response = await fetch(
        `http://localhost:3000/api/articles/${article_id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      console.log('article deleted')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <NavBar header={"Author Dashboard"} button={true} />

      {data.map((article) => {
        return (
          <div key={article.id}>
            <Preview
              id={article.id}
              title={article.title}
              body={article.content}
              date={article.date_created}
            />
            <button
              onClick={() => {
                deleteArticle(article.id);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AuthorDashboard;
