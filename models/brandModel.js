const client = require("../db");

exports.getAllBrands = async () => {
  const result = await client.query("SELECT * FROM brand");
  return result.rows;
};

exports.createBrand = async (name, mobilephone, contact, description) => {
  const result = await client.query(
    "INSERT INTO brand (name, mobilephone, contact, description) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, mobilephone, contact, description]
  );
  return result.rows[0];
};

exports.updateBrand = async (id, name, mobilephone, contact, description) => {
  const result = await client.query(
    "UPDATE brand SET name = $1, mobilephone = $2, contact = $3, description = $4 WHERE id = $5 RETURNING *",
    [name, mobilephone, contact, description, id]
  );
  return result.rows[0];
};

exports.deleteBrand = async (id) => {
  const result = await client.query(
    "DELETE FROM brand WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
