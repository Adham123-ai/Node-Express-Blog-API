const express = require("express");

const {
  createComment,
  deleteComment,
} = require("../controllers/comment.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createCommentSchema,
} = require("../validations/comment.validation");

const router = express.Router();

router.post(
  "/:postId/comments",
  authMiddleware,
  validate(createCommentSchema),
  createComment
);

router.delete(
  "/comments/:id",
  authMiddleware,
  deleteComment
);

module.exports = router;