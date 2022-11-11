const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://codetesting.jubelio.store/",
  consumerKey: "ck_1cbb2c1902d56b629cd9a555cc032c4b478b26ce",
  consumerSecret: "cs_7be10f0328c5b1d6a1a3077165b226af71d8b9dc",
  version: "wc/v3",
});

module.exports = { api };
