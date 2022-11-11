"use strict";

const product = require("./routes/products");

const Hapi = require("@hapi/hapi");
const { allroutes } = require("./routes");
const Path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: 7000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  });

  await server.register(require("@hapi/inert"));

  allroutes(server);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
