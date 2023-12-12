// 

const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.route("/register").post(userController.userRegister);

router.route("/login").post(userController.loginRegister);

router.route("/:_id")
    .all(jwtMiddleware.verifyToken)
    .put(userController.updateUser)
    .patch(userController.updateUserPartially)
    .delete(userController.deleteUser);


router.route("/:_id/timers").post(userController.storeUserTime);

module.exports = router;
