import { GetPaginatedListOfArticlesResponse } from '@backendTypes';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SingleArticle } from '../../components';
import { apiServer, endpoints } from '../../services';

export const Articles = () => {
  const [article, setArticle] = useState<GetPaginatedListOfArticlesResponse>({
    articles: [],
    pagesCount: 0,
    currentPage: 1,
  });
  const { articles } = article;
  const params = useParams();
  const pageId = Number(params.pageId);
  const { pagesCount } = article;

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
      {articles ? (
        articles.map((item) => (
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

      <div className="btn-container">
        {pageId > 1 ? <Link to={`/article/${pageId - 1}`}>{'<'}</Link> : null}
        {pageId !== pagesCount ? <Link to={`/article/${pageId + 1}`}>{'>'}</Link> : null}
      </div>
    </>
  );
};
