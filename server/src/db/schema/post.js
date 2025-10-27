import Joi from 'joi';
import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './user.js';
import { category } from './category.js';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey().notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => user.id),
  category: text('category').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => category.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  slug: text('slug').notNull(),
  image: text('image').notNull(),
  excerpt: text('excerpt').notNull(),
  readingTime: integer('reading_time').notNull(),
});

export const postRelations = relations(posts, ({ one }) => ({
  author: one(user, {
    fields: [posts.authorId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [posts.categoryId],
    references: [category.id],
  }),
}));

export const createPostValidation = Joi.object({
  title: Joi.string().min(5).max(120).required(),
  content: Joi.string().min(10).required(),
  excerpt: Joi.string().min(10).required(),
  authorId: Joi.string().uuid().required(),
  category: Joi.string().required(),
  categoryId: Joi.number().integer().required(),
  slug: Joi.string().required(),
  image: Joi.string().required(),
  isPublished: Joi.boolean().required(),
  isFeatured: Joi.boolean().required(),
  readingTime: Joi.number().integer().required(),
});
