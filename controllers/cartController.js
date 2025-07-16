const cartModel = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    await cartModel.addToCart(userId, productId, quantity);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await cartModel.removeFromCart(userId, productId);
    res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    console.error("Error removing product from cart:", err);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await cartModel.getCart(userId);
    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

exports.updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    await cartModel.updateQuantity(userId, productId, quantity);
    res.status(200).json({ message: "Product quantity updated" });
  } catch (err) {
    console.error("Error updating product quantity:", err);
    res.status(500).json({ message: "Error updating product quantity" });
  }
};
