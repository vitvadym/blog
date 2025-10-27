import { posts } from '../db/schema/post.js';
import { eq } from 'drizzle-orm';
import db from '../config/db.js';

const isPostExist = async (id) => {
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

  return post;
};

export default isPostExist;
