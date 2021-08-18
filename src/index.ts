import Hapi from "@hapi/hapi";
import { NameRequestSchema } from "./schemas/NameRequestSchema";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/{name}",
    options: {
      validate: {
        params: NameRequestSchema,
      },
    },
    handler: (req) => {
      return `Hello ${req.params.name}!`;
    },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
