const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");

// Créer une discussion
router.post("/", discussionController.createDiscussion);

// Récupérer les discussions d’un utilisateur
router.get("/user/:userId", discussionController.getDiscussionsByUser);

// Récupérer une discussion par id
router.get("/:id", discussionController.getDiscussionById);

module.exports = router;
