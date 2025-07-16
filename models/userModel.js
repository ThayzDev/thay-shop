const bcrypt = require("bcryptjs");

async function addUser(name, email, password, role = "user") {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await client.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
}

module.exports = {
  findUserByEmail,
  addUser,
};
