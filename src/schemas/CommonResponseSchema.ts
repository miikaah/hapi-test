import Joi from "joi";

const commonResponse = {
  message: Joi.string(),
};
const commonResponseSchema = Joi.object(commonResponse);

export const Response200Schema = commonResponseSchema
  .label("Ok")
  .meta({ className: "Response200" });

export const Response400Schema = Joi.object({
  ...commonResponse,
  statusCode: Joi.number(),
  error: Joi.string(),
})
  .label("Bad Request")
  .meta({ className: "Response400" });

export const Response401Schema = commonResponseSchema
  .label("Unauthorized")
  .meta({ className: "Response401" });

export const Response403Schema = commonResponseSchema
  .label("Forbidden")
  .meta({ className: "Response403" });
