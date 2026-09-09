const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const AppError = require("../utils/AppError");
const asyncWrapper = require("../utils/asyncWrapper");

// Get All Users - Admin only
const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// Get User By ID
const getUserById = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User - Owner or Admin
const updateUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Only owner or admin can update
  if (
    user._id.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new AppError("You are not allowed to update this user", 403)
    );
  }

  const { name, email, password, avatar } = req.body;

  if (name !== undefined) {
    user.name = name;
  }

  if (email !== undefined) {
    user.email = email;
  }

  if (password !== undefined) {
    user.password = await bcrypt.hash(password, 10);
  }

  if (avatar !== undefined) {
    user.avatar = avatar;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

// Delete User - Admin only
const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};