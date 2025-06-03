const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {getAllUsersExceptMe, getUserByID} = require("../controllers/userController");
const User = require("../models/User");

router.get("/", auth, getAllUsersExceptMe);

router.get("/:id", auth, getUserByID);

const app = express();
app.get('/users', async (req, res) =>{
    const users = await User.find();
    res.json(users);
});

module.exports = router;