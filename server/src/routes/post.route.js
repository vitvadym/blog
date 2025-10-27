import { Router } from 'express';
import * as postController from '../controllers/posts.controller.js';

const router = Router();

router.get('/', postController.getPostsClient);
router.get('/featured', postController.getFeaturedPosts);
router.get('/related/:slug', postController.getRelatedPosts);
router.get('/:slug', postController.getSinglePost);

export default router;
