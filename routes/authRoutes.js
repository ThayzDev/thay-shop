const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Route đăng ký người dùng
router.post("/register", registerUser);

// Route đăng nhập người dùng
router.post("/login", loginUser);

// Route chỉ có admin mới truy cập được
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Chào mừng bạn đến với trang quản trị của admin." });
});

module.exports = router;
