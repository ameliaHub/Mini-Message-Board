require("dotenv").config();
const { Client } = require("pg");

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const SQL_INSERT_SAMPLE = `
INSERT INTO messages (username, content)
SELECT 'Ana', 'Hola desde Render!'
WHERE NOT EXISTS (SELECT 1 FROM messages WHERE username = 'Ana' AND content = 'Hola desde Render!')
UNION ALL
SELECT 'Luis', 'Todo bien desde la nube.'
WHERE NOT EXISTS (SELECT 1 FROM messages WHERE username = 'Luis' AND content = 'Todo bien desde la nube.');
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log("Conectado a la base de datos");

    await client.query(SQL_CREATE_TABLE);
    console.log("Tabla 'messages' creada o ya existía");

    await client.query(SQL_INSERT_SAMPLE);
    console.log("Datos de prueba insertados si no existían");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
    console.log("Conexión cerrada");
  }
}

main();
