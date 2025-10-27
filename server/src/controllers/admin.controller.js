import db from '../config/db.js';
import { count, eq } from 'drizzle-orm';
import { posts } from '../db/schema/post.js';
import { comments } from '../db/schema/comment.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [postsCount] = await db
      .select({ count: count(posts.id) })
      .from(posts);
    const [commentsCount] = await db
      .select({ count: count(comments.id) })
      .from(comments);
    const [draftPostsCount] = await db
      .select({ count: count(posts.id) })
      .from(posts)
      .where(eq(posts.isPublished, false));

    const stats = {
      posts: postsCount?.count,
      comments: commentsCount?.count,
      drafts: draftPostsCount?.count,
    };

    return res.status(200).json({ message: 'Success', stats });
  } catch (error) {
    next(error);
  }
};
