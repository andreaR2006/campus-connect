const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/chat", verifyToken, (req, res) => {
  res.json({ message: "Bienvenue sur le chat sécurisé", user: req.user });
});

module.exports = router;
