const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client = require("../db");

exports.registerUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    const result = await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, password, role]
    );
    const newUser = result.rows[0];

    const payload = { userId: newUser.id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      token: token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    const user = result.rows[0];

    if (password !== user.password) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
