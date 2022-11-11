const Joi = require("joi");
const {
  getAll,
  importsFromUrl,
  addProduct,
  imageSpesificAccess,
  deleteProduk,
  findOne,
  updateProduk,
} = require("../controllers/productController");

exports.get = {
  method: "GET",
  path: "/products",
  handler: getAll,
};

exports.getbyid = {
  method: "GET",
  path: "/products/{sku*}",
  handler: findOne,
};

exports.imageSpesifik = {
  method: "GET",
  path: "/products/images/{file*}",
  handler: imageSpesificAccess,
};

exports.post = {
  method: "POST",
  path: "/products",
  handler: addProduct,
  options: {
    payload: {
      parse: true,
      allow: "multipart/form-data",
      multipart: { output: "stream" },
    },
    validate: {
      payload: Joi.object({
        sku: Joi.string().required(),
        name: Joi.string(),
        price: Joi.number().min(1),
        description: Joi.string(),
        image: Joi.any(),
      }),
      failAction: (request, h, err) => {
        throw err;
        return;
      },
    },
  },
};

exports.delete = {
  method: "POST",
  path: "/products/delete",
  handler: deleteProduk,
};

exports.updateProduk = {
  method: "PUT",
  path: "/products/update/{sku*}",
  handler: updateProduk,
  options: {
    payload: {
      parse: true,
      allow: "multipart/form-data",
      multipart: { output: "stream" },
    },
    validate: {
      payload: Joi.object({
        sku: Joi.string().required(),
        name: Joi.string(),
        price: Joi.number().min(1),
        description: Joi.string(),
        image: Joi.any(),
      }),
      failAction: (request, h, err) => {
        throw err;
        return;
      },
    },
  },
};

exports.importsFromUrl = {
  method: "GET",
  path: "/products/imports",
  handler: importsFromUrl,
};
