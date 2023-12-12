// controllers/userController.js

const User = require('../models/userModel');
const Timer = require('../models/timerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
require('dotenv').config();
const JWT_KEY = 'gfieznd';

exports.hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};


exports.userRegister = async (req, res) => {
    try {
        let newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json({ message: `User créé : ${user.email}` });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Requête invalide" });
    }
};

exports.loginRegister = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(500).json({ message: 'User non trouvé' });
            return;
        }

        if (user.email === req.body.email && user.password === req.body.password) {
            const userData = {
                id: user._id,
                email: user.email,
                role: 'admin',
            };

            const token = await jwt.sign(userData, JWT_KEY, { expiresIn: '10h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Impossible de générer le token" });
    }
};

exports.storeUserTime = async (req, res) => {
    try {
        const {user_id} = req.params;
        const {time} = req.body;

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



exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.updateUserPartially = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true, overwrite: true });
        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params._id);
        res.status(200);
        res.json({message: 'User supprimée'});
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" })
    }
}