const express = require('express');
const { getAllWorkshops } = require('../controllers/workshopController');

const router = express.Router();

router.get('/', getAllWorkshops);

module.exports = router;
