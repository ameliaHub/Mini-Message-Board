const express = require("express");
const router = express.Router();

// Mensajes simulados
const messages = [
  {
    text: "Hola, ¿cómo estás?",
    user: "Usuario1",
    added: new Date(),
  },
  {
    text: "¡Hola! Estoy bien, gracias. ¿Y tú?",
    user: "Usuario2",
    added: new Date(),
  },
];

//Ruta principal
router.get("/", (req, res) => {
  res.render("index", {
    title: "Chat",
    messages: messages.map((msg, i) => ({ ...msg, id: i })),
  });
});

// Formulario para enviar un nuevo mensaje
router.get("/new", (req, res) => {
  res.render("form", { title: "Nuevo Mensaje" });
});

// Ruta para enviar un nuevo mensaje
router.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

//Ruta para ver un mensaje específico
router.get("/message/:id", (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const message = messages[messageId];
  if (!message) {
    return res.status(404).send("Mensaje no encontrado");
  }
  res.render("message", { title: "Mensaje", message });
});

module.exports = router;

//¿Qué hemos hecho aquí?
// Ruta	        Qué hace
// /(GET)	    Muestra todos los mensajes en index.ejs
// /new (GET)	Muestra el formulario para crear mensaje
// /new (POST)	Añade un nuevo mensaje al array y redirige al inicio
