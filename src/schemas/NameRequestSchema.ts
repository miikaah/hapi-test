import Joi from "joi";

export const NameRequestParamsSchema = Joi.object({
  name: Joi.string().min(1).max(10).required(),
}).meta({ className: "NameRequestParams" });

export const NameRequestQuerySchema = Joi.object({
  otherName: Joi.string().min(1),
}).meta({ className: "NameRequestQuery" });

const nameRequestBodyLabel = "NameRequestBody";
export const NameRequestBodySchema = Joi.object({
  name: Joi.string().min(1).max(10).required(),
  metadata: Joi.object().label(`${nameRequestBodyLabel}Metadata`),
})
  .label(nameRequestBodyLabel)
  .meta({ className: nameRequestBodyLabel });
