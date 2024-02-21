// controllers/postsController.ts

import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import { PostDocument } from "../models/post";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = req.query;
    const posts = await Post.find(filter);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
  return; // Add this line
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted post" });
  } catch (err) {
    next(err);
  }
};

export const suggestedPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find();
    const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 3);
    res.json(randomPosts);
  } catch (err) {
    next(err);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: PostDocument | null = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.addComment(req.body.text, req.user._id); // assuming req.user contains the authenticated user
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
  return;
};
