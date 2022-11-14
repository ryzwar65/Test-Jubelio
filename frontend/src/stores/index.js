const { ProdukStore } = require("./produkstore");

const produkstore = new ProdukStore();

const rootStore = {
  produkstore,
};

export default rootStore;
