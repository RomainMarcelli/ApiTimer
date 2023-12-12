// 

const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.route("/register").post(async (req, res) => {
    try {
        req.body.password = await userController.hashPassword(req.body.password);
        await userController.userRegister(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


router.route("/login").post(userController.loginRegister);

router.route("/:_id")
    .all(jwtMiddleware.verifyToken)
    .put(userController.updateUser)
    .patch(userController.updateUserPartially)
    .delete(userController.deleteUser);


router.route("/:_id/timers").post(userController.storeUserTime);

module.exports = router;
