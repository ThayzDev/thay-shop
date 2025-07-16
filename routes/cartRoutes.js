const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.delete("/remove", cartController.removeFromCart);
router.get("/view", cartController.getCart);
router.put("/update-quantity", cartController.updateQuantity);

module.exports = router;
