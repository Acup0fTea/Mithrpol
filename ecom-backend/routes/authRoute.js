const express = require('express');
const { createUser, loginUserCtrl } = require('../controllers/User.ctrl');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
module.exports = router;