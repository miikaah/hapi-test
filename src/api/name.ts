import type Hapi from "@hapi/hapi";
import { NameRequestSchema } from "../schemas/NameRequestSchema";

const routes: Hapi.ServerRoute[] = [
  {
    method: "GET",
    path: "/name/{name}",
    options: {
      validate: {
        params: NameRequestSchema,
      },
    },
    handler: async (req: Hapi.Request): Promise<string> => {
      return `Hello ${req.params.name}!`;
    },
  },
];

export default routes;
