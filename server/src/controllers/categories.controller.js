import db from '../config/db.js';
import { category } from '../db/schema/category.js';

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await db.select().from(category);
    res.json({ message: 'Success', categories });
  } catch (error) {
    next(error);
  }
};

export { getAllCategories };
