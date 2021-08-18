import Hapi from "@hapi/hapi";
import ApiNameRoutes from "./api/name";

export const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

const init = async (): Promise<void> => {
  server.route(ApiNameRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
