const { db, pgp } = require("./connection");

exports.altercoulumnproductTable = async () => {
  await db.any(
    `ALTER TABLE produk  
      ALTER COLUMN description DROP NOT NULL,
      ALTER COLUMN image DROP NOT NULL,
      ALTER COLUMN price TYPE DECIMAL(10,2) ,      
      ALTER COLUMN price DROP NOT NULL`
  );
};
