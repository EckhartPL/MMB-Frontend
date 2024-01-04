import React from 'react';
import { Link } from 'react-router-dom';
import { getCreatedAtArticle } from '../../utils';
import { CommentsCounter } from '../Comment/CommentsCounter/CommentsCounter';
import { Avatar } from '../common/Avatar/Avatar';
import { Like } from '../common/Like/Like';

import './SingleArticle.css';
import { ArticleInterface } from '@backendTypes';
import { DoubleArrow } from '../../assets';

export function SingleArticle({ id, createdAt, description, title, user, likes }: ArticleInterface) {
  // const doubleArrowSvg = document.querySelector(`div[class^="article-${id}"] .double-arrow-svg`) as HTMLDivElement;
  console.log(user);

  // const svgOnMouseEnter = () => {
  //   doubleArrowSvg.style.animation = 'doubleArrow 1.3s infinite';
  //   doubleArrowSvg.style.zIndex = '0';
  // };
  // const svgOnMouseLeave = () => {
  //   doubleArrowSvg.style.animation = '';
  // };
  const createdAtArticleDate = getCreatedAtArticle(createdAt);

  return (
    // <div className={`article-${id}`} onMouseEnter={svgOnMouseEnter} onMouseLeave={svgOnMouseLeave}>
      <div className="title-bar-container">
        <Link to={`/user/${user.name}`}>
          <Avatar userName={user.name} userProfilePictureUrl={user?.profilePicture?.url || null} />
        </Link>
        <Link to={`/user/${user.name}/${title}`}>
          <div className="title">{title.length > 25 ? `${title.slice(0, 24)}\n${title.slice(25, -1)}` : title}</div>
        </Link>
        <div className="created-at">{createdAtArticleDate}</div>
      </div>
      <Link to={`/${user.name}/${title}`}>
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
