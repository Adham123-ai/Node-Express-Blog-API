const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const AppError = require("../utils/AppError");
const asyncWrapper = require("../utils/asyncWrapper");

// Create Comment
const createComment = asyncWrapper(async (req, res, next) => {
  const { text } = req.body;
  const { postId } = req.params;

  // Check if post exists
  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  const comment = await Comment.create({
    text,
    user: req.user.id,
    post: postId,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    "user",
    "name email"
  );

  res.status(201).json({
    success: true,
    message: "Comment created successfully",
    comment: populatedComment,
  });
});

// Delete Comment
const deleteComment = asyncWrapper(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  // Only comment owner or admin can delete
  if (
    comment.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new AppError("You are not allowed to delete this comment", 403)
    );
  }

  await comment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});

module.exports = {
  createComment,
  deleteComment,
};