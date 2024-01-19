import React, { useEffect, useReducer } from 'react';

import './Like.css';
import { useAuth } from '../../../contexts';
import { apiServer, endpoints } from '../../../services';
import { ClientApiResponse, LikesResponse, UserResponse } from '@backendTypes';

interface Prop {
  articleId: string;
  likes: number;
}

interface LikeAction {
  type: 'addLike' | 'removeLike' | 'toggleLike';
  payload?: number | boolean;
}

interface LikeState {
  likesCounter: number;
  isLiked: boolean;
}

const likeReducer = (state: LikeState, action: LikeAction) => {
  switch (action.type) {
    case 'addLike':
      return {
        ...state,
        likesCounter: state.likesCounter + 1,
      };
    case 'removeLike':
      return {
        ...state,
        likesCounter: state.likesCounter - 1,
      };
    case 'toggleLike':
      return {
        ...state,
        isLiked: !!action.payload,
      };
  }
};

export function Like(props: Prop) {
  const { articleId, likes } = props;
  const { tokens, currentUser, setCurrentUser } = useAuth();
  const [state, dispatch] = useReducer(likeReducer, {
    likesCounter: likes,
    isLiked: false,
  });
  let debounce: NodeJS.Timeout;

  const like = (user: UserResponse, flag: boolean) => {
    setCurrentUser(user);
    flag ? dispatch({ type: 'addLike' }) : dispatch({ type: 'removeLike' });
  };

  const toggleLike = (payload: boolean) => {
    dispatch({ type: 'toggleLike', payload });
  };

  const handleLike = async () => {
    if (currentUser && tokens) {
      clearTimeout(debounce);
      debounce = setTimeout(async () => {
        const fetchLikeArticle: ClientApiResponse<LikesResponse> = await apiServer.post(
          `${endpoints.likeArticle}/${articleId}`,
          { articleId },
          tokens.access_token,
        );
        const { data: likeResponseData } = fetchLikeArticle;
        if (likeResponseData && likeResponseData.article && likeResponseData.isLiked) {
          like(likeResponseData?.user, true);
          toggleLike(true);
          console.log(likeResponseData);
        } else {
          like(likeResponseData?.user, false);
          toggleLike(false);
          console.log(likeResponseData);
        }
      }, 300);
    }
  };

  useEffect(() => {
    toggleLike(currentUser?.likedArticles?.find((el) => el.id === articleId) !== undefined);
  }, [articleId, currentUser?.likedArticles]);

  return (
    <div className="likes-container">
      <svg className={state.isLiked ? 'liked' : 'not-liked'} viewBox="0 0 24 24" onClick={handleLike}>
        <path
          d="M7.99997 20H17.1919C17.9865 20 18.7058 19.5296 19.0243 18.8016L21.8323 12.3833C21.9429 12.1305 22 11.8576 22 11.5816V11C22 9.89543 21.1045 9 20 9H13.5L14.7066 4.5757C14.8772 3.95023 14.5826 3.2913 14.0027 3.00136V3.00136C13.4204 2.7102 12.7134 2.87256 12.3164 3.3886L8.41472 8.46082C8.14579 8.81044 7.99997 9.23915 7.99997 9.68024V20ZM7.99997 20H2V10H7.99997V20Z"
          stroke="#000000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="likes-counter">{state.likesCounter}</div>
    </div>
  );
}
