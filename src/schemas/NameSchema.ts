import Joi from "joi";

export const NameRequest = Joi.object({
  name: Joi.string().min(1).max(10).required(),
});
