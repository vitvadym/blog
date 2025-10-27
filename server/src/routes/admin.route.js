import { Router } from 'express';
import * as postController from '../controllers/posts.controller.js';
import * as commentController from '../controllers/comments.controller.js';
import * as aiController from '../controllers/ai.controller.js';
import { getDashboardStats } from '../controllers/admin.controller.js';
import upload from '../middleware/multer.js';
import isAdmin from '../middleware/isAdmin.js';

const router = Router();

router.get('/dashboard', isAdmin, getDashboardStats);
router.get('/posts', isAdmin, postController.getAllPostsAdmin);
router.get('/comments', isAdmin, commentController.getAllComments);

router.post(
  '/create-post',
  isAdmin,
  upload.single('image'),
  postController.createPost,
);

router.post('/generate-content', isAdmin, aiController.generatePostContent)

router.delete('/delete-post', isAdmin, postController.deletePost);

router.patch('/toggle-publish', isAdmin, postController.togglePostPublishStatus);
// router.patch('/draft-post', isAdmin, postController.setPostToDraft);

export default router;
