const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY timestamp DESC"
  );
  return rows;
}

async function insertMessage(username, content) {
  await pool.query("INSERT INTO messages (username, content) VALUES ($1, $2)", [
    username,
    content,
  ]);
}

module.exports = {
  getAllMessages,
  insertMessage,
};
