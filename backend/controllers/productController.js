const { api } = require("../helpers/api");
const {
  findById,
  insertProduk,
  findAll,
  insertNewProduk,
  deleteBySKU,
  updateProdukBySku,
} = require("../models/produk");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (request, h) => {
  try {
    // console.log(request.query);
    const data = await findAll(request.query);
    return {
      message: "Get data Sukses",
      data: data,
    };
  } catch (error) {
    return error;
  }
};

exports.addProduct = async (request, h) => {
  try {
    if (request.payload.sku == "null" || request.payload.sku == undefined) {
      return {
        status: false,
        message: "SKU tidak Boleh kosong",
      };
    }
    var checkingSku = await findById(request.payload.sku);
    if (checkingSku && checkingSku.sku == request.payload.sku) {
      return {
        status: false,
        message: "SKU Sudah Ada",
      };
    }
    return new Promise(async (resolve, reject) => {
      var filename = null;
      if (request.payload.image != "null") {
        const split = file.hapi.filename.split(".");
        filename = split[0] + "_" + uuidv4() + "." + split[1];
        const data = file._data;
        fs.writeFile(`./public/images/produk/${filename}`, data, (err) => {
          if (err) {
            reject(err);
          }
        });
      }
      const mapper = {
        name: request.payload.name,
        sku: request.payload.sku,
        description: request.payload.description,
        price: request.payload.price,
        image:
          request.payload.image != "null"
            ? `http://localhost:7000/products/images/${filename}`
            : null,
      };
      const newinsert = await insertNewProduk(mapper);
      if (newinsert && newinsert.false) {
        return newinsert;
      }
      const newdata = await findById(mapper.sku);
      return resolve(newdata);
    });
  } catch (error) {
    return error;
  }
};

exports.imageSpesificAccess = async (request, h) => {
  return h.file(`public/images/produk/${request.params.file}`);
};

exports.deleteProduk = async (request, h) => {
  await deleteBySKU(request.payload);
  return {
    message: "Success deleted data",
  };
};

exports.updateProduk = async (request, h) => {
  // console.log(request.params);
  try {
    var checkingSku = await findById(request.payload.sku);
    if (checkingSku && checkingSku.sku != request.payload.sku) {
      return {
        status: false,
        message: "SKU Harus Beda",
      };
    }
    const file = request.payload.image != "null" ? request.payload.image : null;
    if (request.payload.sku == "null") {
      return {
        status: false,
        message: "SKU tidak Boleh kosong",
      };
    }
    return new Promise(async (resolve, reject) => {
      if (
        request.payload.image != "null" &&
        typeof request.payload.image != "string"
      ) {
        const split = file.hapi.filename.split(".");
        filename = split[0] + "_" + uuidv4() + "." + split[1];
        const data = file._data;
        fs.writeFile(`./public/images/produk/${filename}`, data, (err) => {
          if (err) {
            reject(err);
          }
        });
      }
      const mapper = {
        name: request.payload.name,
        sku: request.payload.sku,
        description: request.payload.description,
        price: request.payload.price,
        image:
          request.payload.image != "null" &&
          typeof request.payload.image != "string"
            ? `http://localhost:7000/products/images/${filename}`
            : null,
      };
      // console.log(mapper);
      const newinsert = await updateProdukBySku(mapper, request.params.sku);
      if (newinsert && newinsert.false) {
        return newinsert;
      }
      const newdata = await findById(mapper.sku);
      return resolve(newdata);
    });
  } catch (error) {
    return error;
  }
};

exports.importsFromUrl = async (request, h) => {
  return api
    .get("products", {
      per_page: 100, // 20 products per page
    })
    .then(async (response) => {
      let dataSkuNil = [];
      let dataSkuNotNil = [];
      let duplicateData = [];
      await Promise.all(
        response.data.map(async (val) => {
          var find = await findById(val.sku);
          // console.log("Find ", find);
          if (val.sku != "") {
            if (find == null) {
              dataSkuNotNil.push(val);
              await insertProduk(val);
            } else {
              duplicateData.push(find);
            }
          } else {
            dataSkuNil.push(val);
          }
        })
      );
      return {
        sku_nil: dataSkuNil.length,
        sku_notnil: dataSkuNotNil.length,
        duplicate_sku: duplicateData.length,
      };
    })
    .catch((error) => {
      console.log(error.response.data);
      return error;
    });
};

exports.findOne = async (request, h) => {
  const data = await findById(request.params.sku);
  return data;
};
