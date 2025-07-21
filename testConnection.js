const pool = require("./db/pool");

async function test() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa, hora del servidor:", res.rows[0].now);
  } catch (err) {
    console.error("Error en la conexión:", err);
  } finally {
    await pool.end();
  }
}

test();
