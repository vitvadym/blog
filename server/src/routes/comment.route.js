import { Router } from "express"
import * as commentController from "../controllers/comments.controller.js"

const router = Router()

router.post("/create", commentController.createComment)

export default router