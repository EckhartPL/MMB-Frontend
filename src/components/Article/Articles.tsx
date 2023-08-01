import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SingleArticle } from './SingleArticle';
import { apiServer, endpoints } from '../../services';
import { Header } from '../Header/Header';

import './Articles.css';
import { GetPaginatedListOfArticlesResponse } from '@backendTypes';

export function Article() {
  const [article, setArticle] = useState<GetPaginatedListOfArticlesResponse>();
  const params = useParams();
  const pageId = params.pageId as string;

  useEffect(() => {
    (async () => {
      const response = await apiServer.get(`${endpoints.articles}/${pageId}`);
      if (response.ok && response.statusCode === 200) {
        setArticle(response.data as GetPaginatedListOfArticlesResponse);
      } else {
        alert("Something's went wrong");
        console.log(response);
      }
    })();
  }, [pageId]);

  return (
    <>
      <div className="articles-container">
        <div className="articles-header">
          <Header />
        </div>
        {article?.items ? (
          article.items.map((item) => (
            <SingleArticle
              id={item.id}
              title={item.title}
              description={item.description}
              createdAt={item.createdAt}
              likes={item.likes}
              user={item.user}
              key={item.id}
            />
          ))
        ) : (
          <h1>No articles to display</h1>
        )}
      </div>

      <div className="btn-container">
        <Link to={`/article/${pageId ? Number(pageId) - 1 : 1}`}>{'<'}</Link>
        <Link to={`/article/${pageId ? Number(pageId) + 1 : 1}`}>{'>'}</Link>
      </div>
    </>
  );
}
