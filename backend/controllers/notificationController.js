const Notification = require('../models/Notification');

// Créer une notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ error: "userId et content sont requis." });
    }

    const newNotification = new Notification({
      userId,
      content,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Récupérer toutes les notifications d'un utilisateur connecté
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // Assure-toi que req.user est défini

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Marquer une notification comme lue
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({ _id: notificationId, userId });
    if (!notification) {
      return res.status(404).json({ error: "Notification introuvable." });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: "Notification marquée comme lue." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Marquer toutes les notifications comme lues
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany({ userId, isRead: false }, { isRead: true });

    res.json({ message: "Toutes les notifications ont été marquées comme lues." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
