import db from '../config/db.js';
import { comments, createCommentValidation } from '../db/schema/comment.js';
import { posts } from '../db/schema/post.js';
import { eq } from 'drizzle-orm';
import ApiError from '../utils/apiError.js';

const getAllComments = async (req, res, next) => {
  try {
    const commentsWithPosts = await db
      .select({
        id: comments.id,
        content: comments.content,
        author: comments.author,
        createdAt: comments.createdAt,
        postId: comments.postId,
        postTitle: posts.title,
      })
      .from(comments)
      .leftJoin(posts, eq(comments.postId, posts.id));

    return res
      .status(200)
      .json({ message: 'Success', comments: commentsWithPosts });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { content, author, postId } = req.body;
    const { error } = createCommentValidation.validate({
      content,
      author,
      postId,
    });

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }
    const newComment = await db
      .insert(comments)
      .values({ content, author, postId });
    return res.status(201).json({ message: 'Success', comment: newComment });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.body;
    const deletedCommentId = await db
      .delete(comments)
      .where(eq(comments.id, id))
      .returning({
        id: comments.id,
      });
    return res
      .status(200)
      .json({ message: 'Success', comment: deletedCommentId });
  } catch (error) {
    next(error);
  }
};

export { getAllComments, createComment, deleteComment };
