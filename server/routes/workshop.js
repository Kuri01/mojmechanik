const express = require('express');
const { getAllWorkshops } = require('../controllers/workshopController');

const router = express.Router();

/**
 * @typedef {object} Address
 * @property {string} street.required - Street name - eg: ul. Mechaników
 * @property {string} city.required - City name - eg: Warszawa
 * @property {string} buildingNo.required - Building number - eg: 12A
 * @property {string} postCode.required - Post code - eg: 01-234
 * @property {string} localNo.required - Local number - eg: 5
 */

/**
 * @typedef {object} Workshop
 * @property {integer} id - Workshop ID - eg: 1
 * @property {string} name.required - Workshop name - eg: Auto Serwis Kowalski
 * @property {Address} address.required - Workshop address
 * @property {string} image - Workshop image URL - eg: https://t1.pixers.pics/img-1fb6f67c/obrazy-na-plotnie-stary-amerykanski-samochod.jpg
 * @property {number} rate - Workshop rate - eg: 4.7
 * @property {integer} opinionsNumber - Number of opinions - eg: 34
 * @property {string} description - Workshop description - eg: Auto Serwis Kowalski specjalizuje się w kompleksowej naprawie pojazdów...
 */

/**
 * GET /api/workshops
 * @summary Get all workshops
 * @tags workshops
 * @return {array<Workshop>} 200 - Success response - application/json
 */

router.get('/', getAllWorkshops);

module.exports = router;
