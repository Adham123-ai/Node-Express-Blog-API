const express = require("express");

const {
  register,
  login,
} = require("../controllers/auth.controller");

const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");

const validate = require("../middlewares/validate.middleware");

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

module.exports = router;