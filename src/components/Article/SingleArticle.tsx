import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../common/Avatar/Avatar";
import { Like } from "../common/Like/Like";
import { days, months } from "../../utils";
import { ArticleInterface } from "types";

import './SingleArticle.css'

export const SingleArticle = (props: ArticleInterface) => {
  const { id, createdAt, description, title, user, likes } = props;

  const moveLeft = () => {
    const art = document.querySelector(`.article-${id}`) as HTMLDivElement;

    if (window.getComputedStyle(art).width === '350px') {
      art?.classList.toggle('move-left');
      const ext = document.querySelector(`.extended-description-${id}`) as HTMLDivElement;
      ext.style.display === 'flex'
        ? ext.style.display = 'none'
        : ext.style.display = 'flex';
      const desc = document.querySelector(`.article-${id} .description p`);
      desc?.classList.toggle('blur');
    }
  }
  const svgOnMouseEnter = () => {
    if ((document.querySelector('div[class^="article-"]') as HTMLDivElement).style.width === '350px') {
      (document.querySelector('.description svg') as HTMLDivElement).style.transform = 'translateX(1.5rem)';
      (document.querySelector('.description svg') as HTMLDivElement).style.zIndex = '0';
    }
  }
  const svgOnMouseLeave = () => {
    (document.querySelector('.description svg') as HTMLDivElement).style.transform = 'translateX(0)';
  }
  const getCreatedAtDate = () => {
    return ((new Date()).getTime()) - ((new Date(createdAt)).getTime()) < (1000 * 60 * 60 * 24)
      ? 'Today'
      : ((new Date()).getTime()) - ((new Date(createdAt)).getTime()) > (1000 * 60 * 60 * 24)
        &&
        ((new Date()).getTime()) - ((new Date(createdAt)).getTime()) < (1000 * 60 * 60 * 24 * 2)
        ? 'Yesterday'
        : ((new Date()).getTime()) - ((new Date(createdAt)).getTime()) > (1000 * 60 * 60 * 24 * 2)
          &&
          ((new Date()).getTime()) - ((new Date(createdAt)).getTime()) < (1000 * 60 * 60 * 24 * 7)
          ? (days[(new Date(createdAt)).getDay()]).toString()
          : ((new Date(createdAt)).getDay() + ' ' + months[(new Date(createdAt)).getMonth()]).toString()
  }

  return <>
    <div
      className={`article-${id}`}
      onMouseEnter={svgOnMouseEnter}
      onMouseLeave={svgOnMouseLeave}>
      <div className="title-bar-container">
        <Link to={`/user/${user.name}`}>
          <Avatar
            userName={user.name}
            userProfilePictureUrl={user.profilePictureUrl}
          />
        </Link>
        <Link to={`/user/${user.name}/${title}`}>
          <div className="title">
            {title.length > 24
              ? title.slice(0, 24) + '\n' + title.slice(25, -1)
              : title
            }
          </div>
        </Link>
        <div className="created-at">
          {getCreatedAtDate()}
        </div>
      </div>
      <div className="description" onClick={() => moveLeft()}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="angle-double-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
        >
          <g className="fa-group">
            <path
              fill="currentColor"
              d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
              className="fa-primary"
            ></path>
          </g>
        </svg>
        <p>{description}</p>
      </div>
      <div className={`extended-description-${id}`}>
        <p>{description}</p>
      </div>
      <div className="social">
        <Like articleId={id} likes={likes} />
        {/* <Comment/> */}
      </div>
    </div>
  </>
}