import Preview from "../Components/ArticlePreview/ArticlePreview";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";

const AuthorDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/articles/", {
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
        setData(json);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <NavBar header={"Author Dashboard"} button={true} />

      {data.map((article) => {
        return (
          <div key={article.id}>
            <Preview
              title={article.title}
              body={article.content}
              date={article.date_created}
            />
            <button>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default AuthorDashboard;
