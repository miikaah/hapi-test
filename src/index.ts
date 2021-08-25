import Hapi from "@hapi/hapi";
import HapiInert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import ApiNameRoutes from "./api/name";

export const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

const init = async (): Promise<void> => {
  server.route(ApiNameRoutes);

  // Only serve /swagger.json so that Redoc can be used for docs UI
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: "HAPI API Documentation",
      version: "1.0.0",
      description:
        "Short description `asd` qweqwe \n\n" +
        "more lines\n\n" +
        "more lines\n\n" +
        "more lines\n\n" +
        "more lines\n\n",
    },
    documentationPage: false,
    swaggerUI: false,
    tags: [{ name: "Name", description: "Name routes description" }],
    grouping: "tags",
    consumes: ["application/json"],
    produces: ["application/json"],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
      plugin: HapiInert,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ];

  await server.register(plugins);

  server.route({
    method: "GET",
    path: "/docs",
    handler: (_req, h) => {
      return h.file("redoc.html");
    },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
