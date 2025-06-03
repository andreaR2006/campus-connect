const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware'); // middleware pour authentification

// Toutes les routes ci-dessous nécessitent que l'utilisateur soit authentifié
router.use(authMiddleware);

// Créer une notification (optionnel, souvent fait côté serveur automatiquement)
router.post('/', notificationController.createNotification);

// Récupérer toutes les notifications de l'utilisateur connecté
router.get('/', notificationController.getUserNotifications);

// Marquer une notification comme lue
router.patch('/:notificationId/read', notificationController.markAsRead);

// Marquer toutes les notifications comme lues
router.patch('/read/all', notificationController.markAllAsRead);

module.exports = router;
