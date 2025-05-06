import Preview from "../Components/ArticlePreview/ArticlePreview";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";

const ReaderDashboard = () => {
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
      <NavBar header={"Reader Dashboard"} button={true} />

      {data.map((article) => {
        return (
          <Preview
            key={article.id}
            id={article.id}
            title={article.title}
            body={article.content}
            date={article.date_created}
          />
        );
      })}
    </div>
  );
};

export default ReaderDashboard;
