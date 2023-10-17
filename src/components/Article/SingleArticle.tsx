import React from 'react';
import { Link } from 'react-router-dom';
import { getCreatedAtArticle } from '../../utils';
import { CommentsCounter } from '../Comment/CommentsCounter/CommentsCounter';
import { Avatar } from '../common/Avatar/Avatar';
import { Like } from '../common/Like/Like';

import './SingleArticle.css';
import { ArticleInterface } from '@backendTypes';
import { DoubleArrow } from '../../assets';
import { endpoints } from '../../services';

export function SingleArticle(props: ArticleInterface) {
  const { id, createdAt, description, title, user, likes } = props;

  const svgOnMouseEnter = () => {
    (document.querySelector(`div[class^="article-${id}"] .double-arrow-svg`) as HTMLDivElement).style.transform =
      'translateX(1.5rem)';
    (document.querySelector(`div[class^="article-${id}"] .double-arrow-svg`) as HTMLDivElement).style.zIndex = '0';
  };
  const svgOnMouseLeave = () => {
    (document.querySelector(`div[class^="article-${id}"] .double-arrow-svg`) as HTMLDivElement).style.transform =
      'translateX(0)';
  };
  const createdAtArticleDate = getCreatedAtArticle(createdAt);

  return (
    <div className={`article-${id}`} onMouseEnter={svgOnMouseEnter} onMouseLeave={svgOnMouseLeave}>
      <div className="title-bar-container">
        <Link to={`/user/${user.name}`}>
          <Avatar userName={user.name} userProfilePictureUrl={user?.profilePicture?.url || null} />
        </Link>
        <Link to={`/user/${user.name}/${title}`}>
          <div className="title">{title.length > 24 ? `${title.slice(0, 24)}\n${title.slice(25, -1)}` : title}</div>
        </Link>
        <div className="created-at">{createdAtArticleDate}</div>
      </div>
      <Link to={endpoints.userArticle}>
        <div className="description">
          <img src={DoubleArrow} className="double-arrow-svg" alt="Double Arrow" />
          <p>{description}</p>
        </div>
      </Link>

      <div className="social">
        <Like articleId={id} likes={likes} />
        <CommentsCounter articleId={id} />
      </div>
    </div>
  );
}
