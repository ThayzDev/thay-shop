const client = require("../db");

exports.getAllCategories = async () => {
  const result = await client.query("SELECT * FROM category");
  return result.rows;
};

exports.createCategory = async (name, description) => {
  const result = await client.query(
    "INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
};

exports.updateCategory = async (id, name, description) => {
  const result = await client.query(
    "UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return result.rows[0];
};

exports.deleteCategory = async (id) => {
  const result = await client.query(
    "DELETE FROM category WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
