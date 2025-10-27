import db from '../../config/db.js';
import { categories } from './categories.js';
import { posts } from './posts.js';
import { posts as postsTable } from '../schema/post.js';
import { category } from '../schema/category.js'
import { user } from '../schema/user.js';

const run = async () => {
  try {
    const adminDefault = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    };

    // await db.insert(user).values(adminDefault).onConflictDoNothing();
    // await db.insert(category).values(categories).onConflictDoNothing();
    await db.insert(postsTable).values(posts).onConflictDoNothing();

    console.log('Seeding completed successfully.');

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();