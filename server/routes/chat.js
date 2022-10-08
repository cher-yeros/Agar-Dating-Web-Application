const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/send", authMiddleware, ChatController.sendMessage);
router.post("/get-chats", authMiddleware, ChatController.getMessages);

module.exports = router;
