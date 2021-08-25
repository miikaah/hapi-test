import type Hapi from "@hapi/hapi";
import {
  NameRequestParamsSchema,
  NameRequestQuerySchema,
  NameRequestBodySchema,
} from "../schemas/NameRequestSchema";
import {
  Response200Schema,
  Response400Schema,
  Response401Schema,
} from "../schemas/CommonResponseSchema";
import { Response200 } from "../interfaces/CommonResponse";

const getPath = "/name/{name}";
const postPath = "/name";

const routes: Hapi.ServerRoute[] = [
  {
    method: "GET",
    path: getPath,
    options: {
      description: getPath,
      notes: "Get hello from server",
      validate: {
        params: NameRequestParamsSchema,
        query: NameRequestQuerySchema,
      },
      tags: ["api", "Name"],
      response: {
        status: {
          200: Response200Schema,
          400: Response400Schema,
          401: Response401Schema,
        },
      },
    },
    handler: async (req: Hapi.Request): Promise<Response200> => {
      return {
        message: `Hello ${req.params.name}!`,
      };
    },
  },
  {
    method: "POST",
    path: postPath,
    options: {
      description: postPath,
      notes: "Post your name to server",
      validate: {
        payload: NameRequestBodySchema,
      },
      tags: ["api", "Name"],
      response: {
        status: {
          200: Response200Schema,
          400: Response400Schema,
          401: Response401Schema,
        },
      },
    },
    handler: async (req: Hapi.Request): Promise<Response200> => {
      return {
        message: `Hello ${req.params.name}!`,
      };
    },
  },
];

export default routes;
