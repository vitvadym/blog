import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { posts } from './post.js';

export const category = pgTable('category', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  posts: many(posts),
}));
