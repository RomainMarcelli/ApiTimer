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

        console.log(req.params);
        await newTimer.save();

        res.status(201).json({ message: "Temps de l'utilisateur enregistré avec succès" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


exports.getUserTime = async (req, res) => {
    try {
        const { user_id } = req.params;

        console.log("User ID:", user_id); 

        if (req.user && req.user.id !== user_id) {
            res.status(403).json({ message: 'Interdit' });
            return;
        }

        const time = await Timer.find({ user_id });
        console.log("Timers:", time); 

        res.status(200).json(time);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Échec de l'opération" });
    }
};


exports.getAvgUserTime = async (req, res) => {
    try {
        const { user_id } = req.params;

        const timers = await Timer.find({ user_id });

        if (timers.length > 0) {
            const totalUserTime = timers.reduce((total, timer) => total + timer.time, 0);
            const averageUserTime = totalUserTime / timers.length;

            res.status(200).json({ averageUserTime });
        } else {
            res.status(404).json({ message: 'Aucun timer trouvé pour cet utilisateur' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};