import { NextFunction, Request, Response, Router } from "express";
import * as postsController from "../controllers/postsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Get all posts
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  postsController.getAllPosts(req, res, next);
});

// Get suggested posts
router.get("/suggested", postsController.suggestedPosts);

// Add a comment to a post
router.post("/:id/comments", authMiddleware, postsController.addComment);

// Get a single post by ID
router.get("/:id", postsController.getPostById);

// Create a new post
router.post("/", authMiddleware, postsController.createPost);

// Update a post
router.put("/:id", authMiddleware, postsController.updatePost);

// Delete a post
router.delete("/:id", authMiddleware, postsController.deletePost);

export default router;
