const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  updatedAt: { type: Date, default: Date.now },
  isGroup: { type: Boolean, default: false },
  groupName: { type: String },
  type: { type: String, enum: ['channel', 'direct', 'group'], required: true },
  name: { type: String },
  isStarred: { type: Boolean, default: false },
  unreadCount: { type: Number, default: 0 },
},  { timestamps: true });

DiscussionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
