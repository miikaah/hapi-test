import Joi from "joi";

export const NameRequestSchema = Joi.object({
  name: Joi.string().min(1).max(10).required(),
}).meta({ className: "NameRequest" });
