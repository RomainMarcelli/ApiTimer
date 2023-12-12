// routes/timerRoute.js


const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.use(jwtMiddleware.verifyToken);

router.post('/:user_id/timers', timerController.storeUserTime);

module.exports = router;
