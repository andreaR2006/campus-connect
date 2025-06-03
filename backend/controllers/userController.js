const User = require("../models/User");

exports.getAllUsersExceptMe = async(req, res) => {
    try{
        const users = await User.find({_id: {$ne: req.user.id}}).select("-password");
        res.status(200).json(users);
    }
    catch (err){
        res.status(500).json({error: "Erreur lors de la récupération des autres utilisateurs"});

    }
};

exports.getUserByID = async(req, res) => {
    try{
        const user = await User.findById(req.params.id).select("password");
        if(!user) return res.status(404).json({message: "Nous n'avons pas trouvé cet utilisateur"});
        res.status(200).json(user);

    }
    catch (err){
        res.status(500).json({error: "Erreur lors de la récupération de l'utilisateur"});
    }
}