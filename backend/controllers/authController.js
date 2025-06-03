const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    try
    {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "Adresse email introuvable"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Mot de passe incorrecte"});


        /**
         * le  ^\d+$ est une expression régulière (regex)
         * Décomposition :
            ^ → début de la chaîne

            \d → un chiffre (équivalent à [0-9])

            + → un ou plusieurs chiffres

            $ → fin de la chaîne
            
         */
        let role = "";
        if(user.userID && /^\d+$/.test(user.userID))
        {
            role = "student";    
        }
        else if (email.includes("admin"))
        {
            role = "admin";
        }
        else if (email.includes("teacher"))
        {
            role = "teacher";
        }
        else
        {
            return res.status(400).json({message: "Rôle utilisateur inconnu"});

        }

        const token = jwt.sign({id: user._id, role}, process.env.JWT_SECRET, {expiresIn: "1d",});
        res.status(200).json({
            token,
            user: 
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role,
            },

        });
    }
    catch(err)
    {
        res.status(500).json({error: "Erreur lors de la connexion"});
    }
};