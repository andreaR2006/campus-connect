const mongoose = require("mongoose");
require("dotenv").config();
const DB_connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Vous êtes connecté avec une base de données MongoDB!");
    }
    catch (err){
        console.error("❌Erreur de connexion avec la base de données: ", err.message);
        process.exit(1); //pour arrêter immédiatement l'application
    }
    
}

module.exports = DB_connection;