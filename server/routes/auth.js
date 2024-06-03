const express = require('express');
const { register, login, getUserInfo, updateUserInfo, getUserAddress, updateUserAddress } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authMiddleware, getUserInfo);
router.put('/user', authMiddleware, updateUserInfo);
router.get('/user/address', authMiddleware, getUserAddress);
router.put('/user/address', authMiddleware, updateUserAddress);

module.exports = router;
