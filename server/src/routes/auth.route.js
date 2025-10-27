import { Router } from 'express';
import { validateBody } from '../middleware/validateBody.js';
import * as loginController from '../controllers/auth.controller.js';
import { userLoginValidation } from '../db/schema/user.js';
const router = Router();

router.post('/login', validateBody(userLoginValidation), loginController.login);
router.post('/logout', loginController.logout);
router.get('/me', loginController.me);

export default router;
