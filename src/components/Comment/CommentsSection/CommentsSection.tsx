import React from 'react';

interface Props {
  articleId: string;
}

export function CommentsSection(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { articleId } = props;

  return (
    <>
      {/* {comments.map(comment => {
          <div className={`comment-${comment.id}`}></div>
        })} */}
    </>
  );
}
