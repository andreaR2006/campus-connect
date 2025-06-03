const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optionnel
  content: { type: String, required: true },
  type: { type: String, enum: ["message", "invitation", "system", "other"], default: "other" },
  discussionId: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion" }, // optionnel
  url: { type: String }, // pour une redirection rapide
  metadata: { type: mongoose.Schema.Types.Mixed }, // pour des infos supplémentaires
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
