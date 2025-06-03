//envoie et lecture de messages
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {sendMessage, getConversation} = require("../controllers/messageController");

router.post("/", auth, sendMessage);

router.get("/:userID", auth, getConversation);
module.exports = router;