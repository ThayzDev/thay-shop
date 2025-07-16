const client = require("../db");

exports.getAllProducts = async () => {
  const result = await client.query(
    `SELECT p.*, b.name AS brand_name, c.name AS category_name FROM product p 
      LEFT JOIN brand b ON p.brand_id = b.id
      LEFT JOIN category c ON p.category_id = c.id`
  );
  return result.rows;
};

exports.getProductById = async (id) => {
  const result = await client.query(
    `SELECT p.*, b.name AS brand_name, c.name AS category_name 
     FROM product p 
     LEFT JOIN brand b ON p.brand_id = b.id
     LEFT JOIN category c ON p.category_id = c.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0]; // Trả về sản phẩm tìm thấy
};
exports.createProduct = async (
  name,
  description,
  image,
  price,
  stock,
  category_id,
  brand_id
) => {
  const result = await client.query(
    "INSERT INTO product (name, description, image, price, stock, category_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [name, description, image, price, stock, category_id, brand_id]
  );
  return result.rows[0];
};

exports.updateProduct = async (
  id,
  name,
  description,
  image,
  price,
  stock,
  category_id,
  brand_id
) => {
  const result = await client.query(
    "UPDATE product SET name = $1, description = $2, image = $3, price = $4, stock = $5, category_id = $6, brand_id = $7 WHERE id = $8 RETURNING *",
    [name, description, image, price, stock, category_id, brand_id, id]
  );
  return result.rows[0];
};

exports.deleteProduct = async (id) => {
  const result = await client.query(
    "DELETE FROM product WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
