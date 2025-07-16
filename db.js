require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST, // Host của cơ sở dữ liệu PostgreSQL
  port: process.env.DB_PORT, // Cổng kết nối PostgreSQL
  user: process.env.DB_USER, // Tên người dùng (username)
  password: process.env.DB_PASSWORD, // Mật khẩu của người dùng
  database: process.env.DB_NAME, // Tên cơ sở dữ liệu
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Nếu sử dụng SSL (chỉ cần thiết cho kết nối an toàn)
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = client;
