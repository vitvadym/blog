import Joi from 'joi';
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { posts } from './post.js';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey().notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const createCommentValidation = Joi.object({
  content: Joi.string().min(2).required(),
  author: Joi.string().min(3).required(),
  postId: Joi.number().integer().required(),
});
