const Discussion = require("../models/Discussion");
const Message = require("../models/Message");

// Créer une nouvelle discussion
exports.createDiscussion = async (req, res) => {
  try {
    const { title, members } = req.body;
    const newDiscussion = new Discussion({ title, members });
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    res.status(500).json({ message: "Erreur création discussion", error });
  }
};

// Récupérer toutes les discussions d’un utilisateur
exports.getDiscussionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const discussions = await Discussion.find({ members: userId })
      .populate("members", "-password")
      .populate({
        path: "messages",
        populate: { path: "sender", select: "username email" }
      })
      .sort({ updatedAt: -1 });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération discussions", error });
  }
};

// Récupérer une discussion par son ID avec messages
exports.getDiscussionById = async (req, res) => {
  try {
    const discussionId = req.params.id;
    const discussion = await Discussion.findById(discussionId)
      .populate("members", "-password")
      .populate({
        path: "messages",
        populate: { path: "sender", select: "username email" }
      });
    if (!discussion) return res.status(404).json({ message: "Discussion non trouvée" });
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération discussion", error });
  }
};
