const Post = require("../models/Post.model");
const AppError = require("../utils/AppError");
const asyncWrapper = require("../utils/asyncWrapper");

// Create Post
const createPost = asyncWrapper(async (req, res, next) => {
  const { title, content, category, tags, isPublished } = req.body;

  const post = await Post.create({
    title,
    content,
    category,
    tags,
    isPublished,
    author: req.user.id,
    coverImage: req.file ? req.file.path : null,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post,
  });
});

// Get All Posts - Advanced Features
const getAllPosts = asyncWrapper(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    author,
    sort = "-createdAt",
  } = req.query;

  const filter = {};

  // Search by title or content
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by author
  if (author) {
    filter.author = author;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const posts = await Post.find(filter)
    .populate("author", "name email")
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const totalPosts = await Post.countDocuments(filter);

  res.status(200).json({
    success: true,
    page: Number(page),
    limit: Number(limit),
    totalPosts,
    totalPages: Math.ceil(totalPosts / Number(limit)),
    count: posts.length,
    posts,
  });
});

// Get Single Post
const getPostById = asyncWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "name email"
  );

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// Update Post
const updatePost = asyncWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  if (
    post.author.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("You are not allowed to update this post", 403));
  }

  const { title, content, category, tags, isPublished } = req.body;

  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.category = category ?? post.category;
  post.tags = tags ?? post.tags;
  post.isPublished = isPublished ?? post.isPublished;

  if (req.file) {
    post.coverImage = req.file.path;
  }

  await post.save();

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    post,
  });
});

// Delete Post
const deletePost = asyncWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  if (
    post.author.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("You are not allowed to delete this post", 403));
  }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};