const Joi = require("joi");

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  avatar: Joi.string().optional(),
});

module.exports = {
  updateUserSchema,
};