const { db } = require("../database/connection");

exports.findAll = async ({ limit, offset }) => {
  return await db.any("SELECT * FROM produk LIMIT $<limit> OFFSET $<offset>", {
    limit: limit,
    offset: offset,
  });
};

exports.deleteBySKU = async (data) => {
  return await db.oneOrNone("DELETE FROM produk WHERE sku = $<sku>", {
    sku: data.sku,
  });
};

exports.updateProdukBySku = async (data, params) => {
  try {
    if (data.image != null) {
      return await db.oneOrNone(
        "UPDATE produk SET image = $<image>, sku = $<sku>, price = $<price>, description = $<description>, name = $<name> WHERE sku = $<paramssku>",
        {
          paramssku: params,
          name: data.name,
          sku: data.sku,
          image: data.image,
          price: data.price,
          description: data.description,
        }
      );
    } else {
      return await db.oneOrNone(
        "UPDATE produk SET sku = $<sku>, price = $<price>, description = $<description>, name = $<name> WHERE sku = $<paramssku>",
        {
          paramssku: params,
          name: data.name,
          sku: data.sku,
          price: data.price,
          description: data.description,
        }
      );
    }
  } catch (error) {
    return error;
  }
};

exports.insertNewProduk = async (data) => {
  try {
    return await db.oneOrNone(
      "INSERT INTO produk(name,sku,image,price,description) VALUES($<name>, $<sku>,$<image>,$<price>,$<description>)",
      {
        name: data.name,
        sku: data.sku,
        image: data.image,
        price: data.price,
        description: data.description,
      }
    );
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

exports.insertProduk = async (data) => {
  return await db.oneOrNone(
    "INSERT INTO produk(name,sku,image,price,description) VALUES($<name>, $<sku>,$<image>,$<price>,$<description>)",
    {
      name: data.name,
      sku: data.sku,
      image: data.images[0].src,
      price: data.price,
      description: data.description,
    }
  );
};
exports.findById = (sku) => {
  return db
    .oneOrNone("SELECT * FROM produk WHERE sku = $1", sku)
    .then((response) => {
      return response;
    });
};
