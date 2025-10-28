import React from 'react';
import CommentCard from './CommentCard';
import type { IComment } from '../types';


type Props = {
  comments: IComment[];
};

const Comments: React.FC<Props> = ({ comments }) => (
  <div className="space-y-4">
    {comments.length === 0 ? (
      <div className="text-center">No comments yet.</div>
    ) : (
      comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))
    )}
  </div>
);

export default Comments;