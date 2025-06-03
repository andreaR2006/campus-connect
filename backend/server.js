const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const DB_connection = require("./config/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");
const discussionRoutes = require('./routes/discussionRoutes');
const Message = require("./models/Message");
const User = require("./models/User");

require("dotenv").config();

const app = express();

// Créer le serveur HTTP
const server = http.createServer(app);

// Initialiser Socket.IO avec CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Connexion à la base MongoDB
DB_connection();

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/discussions", discussionRoutes);

// Endpoint racine
app.get("/", (req, res) => {
  res.send("API Campus Connect est en ligne!");
});

// Socket.IO - Gestion temps réel
io.on("connection", (socket) => {
  console.log("📡 Utilisateur connecté:", socket.id);

  // Rejoindre une room de discussion
  socket.on("joinDiscussion", ({ discussionId }) => {
    socket.join(discussionId);
    console.log(`Utilisateur ${socket.id} rejoint discussion ${discussionId}`);
  });

  // Quitter une room de discussion
  socket.on("leaveDiscussion", ({ discussionId }) => {
    socket.leave(discussionId);
    console.log(`Utilisateur ${socket.id} quitte discussion ${discussionId}`);
  });

  // Envoyer un message dans une discussion
  socket.on("sendMessage", async ({ discussionId, senderId, content }) => {
    try {
      const newMessage = new Message({
        sender: senderId,
        content,
        discussion: discussionId,
      });
      await newMessage.save();

      // Mettre à jour la discussion pour y ajouter le message
      const Discussion = require("./models/Discussion");
      await Discussion.findByIdAndUpdate(discussionId, {
        $push: { messages: newMessage._id },
        updatedAt: new Date(),
      });

      // Émettre le message à tous les clients dans la room
      io.to(discussionId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔌 Utilisateur déconnecté:", socket.id);
  });
});

// Routes supplémentaires (exemple)
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/messages/:senderId/:receiverId', async (req, res) => {
  const { senderId, receiverId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Serveur actif sur le port ${PORT}`));
