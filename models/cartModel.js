const client = require("../db");

exports.addToCart = async (userId, productId, quantity) => {
  const existingProduct = await client.query(
    "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );

  if (existingProduct.rows.length > 0) {
    await client.query(
      "UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3",
      [quantity, userId, productId]
    );
  } else {
    await client.query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)",
      [userId, productId, quantity]
    );
  }
};

exports.removeFromCart = async (userId, productId) => {
  await client.query(
    "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );
};

exports.getCart = async (userId) => {
  const result = await client.query(
    `
    SELECT 
      p.*, 
      b.name AS brand_name,
      c.name AS category_name,
      ci.quantity
    FROM cart_items ci
    LEFT JOIN product p ON ci.product_id = p.id
    LEFT JOIN brand b ON p.brand_id = b.id
    LEFT JOIN category c ON p.category_id = c.id
    WHERE ci.user_id = $1
    `,
    [userId]
  );
  return result.rows;
};

exports.updateQuantity = async (userId, productId, quantity) => {
  await client.query(
    "UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3",
    [quantity, userId, productId]
  );
};
