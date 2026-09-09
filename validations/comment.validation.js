const Joi = require("joi");

const createCommentSchema = Joi.object({
  text: Joi.string().min(1).required(),
});

module.exports = {
  createCommentSchema,
};