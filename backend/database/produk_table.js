const { db } = require("./connection");

exports.productTable = async () => {
  await db.any(
    `CREATE TABLE produk (
        id serial PRIMARY KEY, 
        sku VARCHAR (100) UNIQUE NOT NULL, 
        name VARCHAR (150) NOT NULL,
        image VARCHAR (150) NOT NULL, 
        price INT NOT NULL,
        description TEXT NOT NULL )`
  );
};
