const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    //pour l'utilisateur qui envoie le message
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    //pour le destinataire
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    //contenu (textuel) du message
    content: {
        type: String,
        required: true,
        trim: true,
    },

    //indique si le message est en vu
    isRead: {
        type: Boolean,
        default: false,
    },

    //joindre un fichier
    attachments: [
        {
            fileName: String,   // nom du fichier
            fileURL: String,    //URL du fichier
        }
    ]
},
{timestamps: true}
);
module.exports = mongoose.model("Message", messageSchema);