// controllers/timerController.js


const Timer = require('../models/timerModel');

exports.storeUserTime = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { time } = req.body;

        const newTimer = new Timer({
            user_id,
            time,
        });

        await newTimer.save();

        res.status(201).json({ message: "Temps de l'utilisateur enregistré avec succès" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
