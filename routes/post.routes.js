const express = require("express");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createPostSchema,
  updatePostSchema,
} = require("../validations/post.validation");

const upload = require("../middlewares/upload.middleware");

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes
router.post(
  "/",
  authMiddleware,
  upload.single("coverImage"),
  validate(createPostSchema),
  createPost
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("coverImage"),
  validate(updatePostSchema),
  updatePost
);

router.delete("/:id", authMiddleware, deletePost);

module.exports = router;