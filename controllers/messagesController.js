const db = require("../db/queries");

// Mostrar todos los mensajes
async function getAllMessages(req, res) {
  try {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Chat", messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar los mensajes");
  }
}

// Mostrar formulario para nuevo mensaje
function getNewMessageForm(req, res) {
  res.render("form", { title: "Nuevo Mensaje" });
}

// Procesar el nuevo mensaje
async function postNewMessage(req, res) {
  const { messageText, messageUser } = req.body;

  if (!messageText || !messageUser) {
    return res.status(400).send("Faltan datos del mensaje");
  }

  try {
    await db.insertMessage(messageUser, messageText);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al guardar el mensaje");
  }
}

// Mostrar mensaje individual por ID
async function getMessageById(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send("ID inválido");
  }

  try {
    const messages = await db.getAllMessages();
    const message = messages.find((msg) => msg.id === id);

    if (!message) {
      return res.status(404).send("Mensaje no encontrado");
    }

    res.render("message", { title: "Mensaje", message });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar el mensaje");
  }
}

module.exports = {
  getAllMessages,
  getNewMessageForm,
  postNewMessage,
  getMessageById,
};
