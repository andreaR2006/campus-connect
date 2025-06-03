const Message = require("../models/Message");

exports.sendMessage = async(req, res) => {
    try{
        const {receiver, content, attachments} = req.body;
        const sender = req.user.id;
        const message = new Message({sender, receiver, content, attachments});
        await message.save();

        res.status(201).json({message});

    }
    catch (err){
        res.status(500).json({error: "Erreur de l'envoie du message"});
    }
};

exports.getConversation = async(req, res) => {
    try{
        const userID = req.params.userID;
        const currentUser = req.user.id;

        const message = await Message.find({
            $or: [
                {sender: currentUser, receiver: userID},
                {sender: userID, receiver: currentUser},

            ],
        }).sort({createdAt: 1});

        res.status(200).json({message});

    }
    catch (err){
        res.status(500).json({error: "Erreur lors de la récupération de la conversation"});

    }
};