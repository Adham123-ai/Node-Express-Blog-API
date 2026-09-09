const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  updateUserSchema,
} = require("../validations/user.validation");

const router = express.Router();

// Get all users - Admin only
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

// Get user by ID - Authenticated users
router.get(
  "/:id",
  authMiddleware,
  getUserById
);

// Update user - Owner or Admin
router.put(
  "/:id",
  authMiddleware,
  validate(updateUserSchema),
  updateUser
);

// Delete user - Admin only
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

module.exports = router;