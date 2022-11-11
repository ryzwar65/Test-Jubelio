const product = require("./products");

exports.allroutes = (server) => {
  server.route(product.delete);
  server.route(product.importsFromUrl);
  server.route(product.get);
  server.route(product.getbyid);
  server.route(product.imageSpesifik);
  server.route(product.post);
  server.route(product.updateProduk);
};
