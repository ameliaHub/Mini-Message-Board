const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

router.get("/", messagesController.getAllMessages);
router.get("/new", messagesController.getNewMessageForm);
router.post("/new", messagesController.postNewMessage);
router.get("/message/:id", messagesController.getMessageById);

module.exports = router;
