import React, { useContext, useEffect, useState } from 'react';
import { TokensContext } from '../../../contexts/token.context';
import { UserContext } from '../../../contexts/user.context';

import './Like.css'

interface Prop {
  articleId: string;
  likes: number;
}

export const Like = (props: Prop) => {
  const { articleId, likes } = props;
  const { tokens } = useContext(TokensContext);
  const { user } = useContext(UserContext);
  const [likesCounter, setLikesCounter] = useState(likes);
  const [isLiked, setIsLiked] = useState<boolean>();
  let debounce: any;

  const addToLiked = () => {
    if (user.email !== '') {
      clearTimeout(debounce);
      debounce = setTimeout(async () => {
        await fetch('http://localhost:3001/article/like', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`,
          },
          body: JSON.stringify({ likedArticle: articleId }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.article === null) {
              setIsLiked(false);
              setLikesCounter(likesCounter - 1)
              console.log('Disliked');
            } else {
              user.likedArticles?.push(data.article);
              setLikesCounter(likesCounter + 1)
              setIsLiked(true);
              console.log('Liked');
            }
            console.log('article: ', data.article)
          });
      }, 300)
    }
  }

  useEffect(() => {
    user.likedArticles?.some(el => el.id === articleId) ? setIsLiked(true) : setIsLiked(false);
  }, [])

  useEffect(() => {
    console.log(isLiked);
  }, [isLiked])

  return <>
    <svg
      className={isLiked ? 'liked' : 'not-liked'}
      viewBox="0 0 24 24"
      onClick={addToLiked}
    >
      <path d="M7.99997 20H17.1919C17.9865 20 18.7058 19.5296 19.0243 18.8016L21.8323 12.3833C21.9429 12.1305 22 11.8576 22 11.5816V11C22 9.89543 21.1045 9 20 9H13.5L14.7066 4.5757C14.8772 3.95023 14.5826 3.2913 14.0027 3.00136V3.00136C13.4204 2.7102 12.7134 2.87256 12.3164 3.3886L8.41472 8.46082C8.14579 8.81044 7.99997 9.23915 7.99997 9.68024V20ZM7.99997 20H2V10H7.99997V20Z" stroke="#000000" strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
    <div className='likesCounter'>{likesCounter}</div>
  </>
}
