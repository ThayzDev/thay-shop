const {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../models/brandModel");

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await getAllBrands();
    res.json(brands);
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).send("Server error");
  }
};

exports.createBrand = async (req, res) => {
  const { name, mobilephone, contact, description } = req.body;
  try {
    const newBrand = await createBrand(name, mobilephone, contact, description);
    res.status(201).json(newBrand);
  } catch (err) {
    console.error("Error creating brand:", err);
    res.status(500).send("Server error");
  }
};

exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, mobilephone, contact, description } = req.body;
  try {
    const updatedBrand = await updateBrand(
      id,
      name,
      mobilephone,
      contact,
      description
    );
    res.json(updatedBrand);
  } catch (err) {
    console.error("Error updating brand:", err);
    res.status(500).send("Server error");
  }
};

exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await deleteBrand(id);
    res.json(deletedBrand);
  } catch (err) {
    console.error("Error deleting brand:", err);
    res.status(500).send("Server error");
  }
};
