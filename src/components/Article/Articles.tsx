import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SingleArticle } from "./SingleArticle";
import { Header } from "../Header/Header";
import { GetPaginatedListOfArticlesResponse } from "types";

import './Articles.css';

export const Article = () => {
  const [article, setArticle] = useState<GetPaginatedListOfArticlesResponse>();
  const params = useParams();
  const pageId = params.pageId;

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/article/${pageId}`);
      const data = await res.json();
      setArticle(data);
    })()
  }, [pageId]);

  return <>

    <div className="articles-container">
      <div className="articles-header">
        <Header />
      </div>
      {article?.items
        ? article.items.map(item =>
          <SingleArticle
            id={item.id}
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
            likes={item.likes}
            user={item.user}
            key={item.id}
          />
        )
        : <h1>No articles to display</h1>
      }
    </div>

    <div className="btn-container">
      <Link to={`/article/${pageId ? Number(pageId) - 1 : 1}`}>{`<`}</Link>
      <Link to={`/article/${pageId ? Number(pageId) + 1 : 1}`}>{`>`}</Link>
    </div>
  </>
}