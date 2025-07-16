const jwt = require("jsonwebtoken");

// Xác thực token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Không tìm thấy token, vui lòng đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user vào request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

// Kiểm tra quyền admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
