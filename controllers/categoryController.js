const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send("Server error");
  }
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await createCategory(name, description);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).send("Server error");
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await updateCategory(id, name, description);
    res.json(updatedCategory);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).send("Server error");
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await deleteCategory(id);
    res.json(deletedCategory);
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).send("Server error");
  }
};
