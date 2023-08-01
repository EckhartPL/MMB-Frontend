import React, { useEffect, useState } from 'react';

import './CommentsCounter.css';
import { apiServer, endpoints } from '../../../services';
import { useAuth } from '../../../contexts';

interface Props {
  articleId: string;
}

interface ResponseData {
  count: number;
}

export function CommentsCounter(props: Props) {
  const { tokens } = useAuth();
  const { articleId } = props;
  const [commentsCount, setCommentsCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await apiServer.get(`${endpoints.countComments}/${articleId}`, tokens?.access_token);
      setCommentsCount((data as ResponseData).count);
    })();
  }, [articleId, tokens?.access_token]);

  return (
    <div className="comments-counter">
      <p>{commentsCount} comments</p>
    </div>
  );
}
