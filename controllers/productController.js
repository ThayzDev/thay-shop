const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Server error");
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params; // Lấy id từ params trong URL
  try {
    const product = await getProductById(id); // Gọi hàm trong model để lấy sản phẩm theo ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Nếu không tìm thấy sản phẩm
    }
    res.json(product); // Trả về thông tin chi tiết sản phẩm
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.status(500).send("Server error");
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, image, price, stock, category_id, brand_id } =
    req.body;
  try {
    const newProduct = await createProduct(
      name,
      description,
      image,
      price,
      stock,
      category_id,
      brand_id
    );
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send("Server error");
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, stock, category_id, brand_id } =
    req.body;
  try {
    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      image,
      price,
      stock,
      category_id,
      brand_id
    );
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Server error");
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id);
    res.json(deletedProduct);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Server error");
  }
};
