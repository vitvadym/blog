import Joi from 'joi';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, text, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { posts } from './post.js';

export const role = pgEnum('role', 'admin');

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  password: text('password').notNull(),
  role: role('role').default('admin').notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(posts),
}));

export const userLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
