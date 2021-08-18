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
      title: "Test API Documentation",
    },
    documentationPage: false,
    swaggerUI: false,
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
