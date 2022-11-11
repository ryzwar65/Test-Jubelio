const {
  altercoulumnproductTable,
} = require("./alter_column_to_nullable_produk");
const { productTable } = require("./produk_table");

const main = async () => {
  await productTable();
  await altercoulumnproductTable();
};

main();
