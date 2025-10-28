import React from 'react';
import type { IComment } from '../types';
import { formatDate } from '../helpers/formatDate';

type Props = {
  comment: IComment;
};

const CommentCard: React.FC<Props> = ({ comment }) => {
  const { author, content, createdAt } = comment;
  return (
    <div className="card mb-4">
      <div className="card-body shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-primary">{author}</span>
          <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
        </div>
        <p className="text-base">{content}</p>
      </div>
    </div>
  );
}
export default CommentCard;