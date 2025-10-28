import {
  posts,
  category as categoryTable,
  comments as commentsTable,
} from '../db/schema/index.js';
import ik from '../config/imageKit.js';
import db from '../config/db.js';
import { eq, and, count, not, sql } from 'drizzle-orm';
import { createPostValidation } from '../db/schema/post.js';
import createSlug from '../utils/slugify.js';
import ApiError from '../utils/apiError.js';
import isPostExist from '../utils/isPostExist.js';
import { generateText } from '../utils/generateText.js';
import { convert } from 'html-to-text';
import { calculateReadingTime } from '../utils/calculateReadingTime.js';

const createPost = async (req, res, next) => {
  try {
    const image = req.file;
    const { userId: authorId } = req.user;
    const { title, category, content } = req.body;

    const uploadImageResponse = await ik.upload({
      file: image.buffer,
      fileName: image.originalname,
      folder: '/blog_images',
    });

    const { url } = uploadImageResponse;
    const [categoryFromDb] = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.slug, category.toLowerCase()));

    const prompt = `Create an excerpt for a blog post based on the following title: "${title}"
                      The excerpt should be 2-3 sentences long.
                      The tone should be engaging and informative.
                    `;

    const excerpt = await generateText(prompt);
    const slug = createSlug(title);
    const plainTextContent = convert(content);
    const time = calculateReadingTime(plainTextContent);

    const newPostRecord = {
      ...req.body,
      authorId,
      excerpt,
      slug,
      readingTime: time,
      image: url,
      categoryId: categoryFromDb.id,
    };

    const { error, value } = createPostValidation.validate(newPostRecord);
    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    const [createdPost] = await db.insert(posts).values(value).returning();

    return res.status(201).json({ message: 'Success', post: createdPost });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return next(new ApiError(400, 'Post ID is required'));
    }

    const postFromDb = await isPostExist(id);

    if (!postFromDb) {
      return next(new ApiError(404, 'Post not found'));
    }

    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    return res.status(200).json({ message: 'Success', post: deletedPost });
  } catch (error) {
    next(error);
  }
};

const togglePostPublishStatus = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return next(new ApiError(400, 'Post ID is required'));
    }

    const postFromDb = await isPostExist(id);

    if (!postFromDb) {
      return next(new ApiError(404, 'Post not found'));
    }

    const newStatus = !postFromDb.isPublished;

    const [updatedPost] = await db
      .update(posts)
      .set({ isPublished: newStatus })
      .where(eq(posts.id, id))
      .returning();

    return res.status(200).json({ message: 'Success', post: updatedPost });
  } catch (error) {
    next(error);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return next(new ApiError(400, 'Post slug is required'));
    }

    const [postFromDb] = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug));

    if (!postFromDb) {
      return next(new ApiError(404, 'Post not found'));
    }

    const postComments = await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.postId, postFromDb.id));

    postFromDb.comments = postComments;

    return res.status(200).json({ message: 'Success', post: postFromDb });
  } catch (error) {
    next(error);
  }
};

const getAllPostsAdmin = async (req, res, next) => {
  try {
    const postsFromDb = await db.select().from(posts);
    return res.status(200).json({ message: 'Success', posts: postsFromDb });
  } catch (error) {
    next(error);
  }
};

const getPostsClient = async (req, res, next) => {
  try {
    const { category, page, search } = req.query;
    const pageSize = 6;

    let whereClause = eq(posts.isPublished, true);

    if (search) {
      whereClause = and(
        whereClause,
        sql`to_tsvector('english', ${posts.title}) @@ plainto_tsquery('english', ${search})`,
      );
    }

    if (category) {
      whereClause = and(whereClause, eq(posts.categoryId, Number(category)));
    }

    const [postsCount] = await db
      .select({ count: count(posts.id) })
      .from(posts)
      .where(whereClause);

    const postsFromDb = await db
      .select()
      .from(posts)
      .where(whereClause)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalPosts = postsCount.count;
    const totalPages = Math.ceil(totalPosts / pageSize);

    return res
      .status(200)
      .json({ message: 'Success', posts: postsFromDb, pages: totalPages });
  } catch (error) {
    next(error);
  }
};

const getFeaturedPosts = async (req, res, next) => {
  try {
    const featuredPosts = await db
      .select()
      .from(posts)
      .where(and(eq(posts.isFeatured, true), eq(posts.isPublished, true)));
    return res.status(200).json({ message: 'Success', posts: featuredPosts });
  } catch (error) {
    next(error);
  }
};

const getRelatedPosts = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const [currentPost] = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug));

    if (!currentPost) {
      return next(new ApiError(404, 'Post not found'));
    }

    const relatedPosts = await db
      .select()
      .from(posts)
      .where(
        and(
          eq(posts.categoryId, currentPost.categoryId),
          not(eq(posts.id, currentPost.id)),
          eq(posts.isPublished, true),
        ),
      )
      .limit(3);

    return res.status(200).json({ message: 'Success', posts: relatedPosts });
  } catch (error) {
    next(error);
  }
};

export {
  createPost,
  getAllPostsAdmin,
  deletePost,
  togglePostPublishStatus,
  getPostsClient,
  getFeaturedPosts,
  getSinglePost,
  getRelatedPosts,
};
