const express = require("express");
const { getAllWorkshops } = require("../controllers/workshopController");

const router = express.Router();

/**
 * @module routes/workshops
 */

/**
 * Pobiera listę wszystkich warsztatów.
 *
 * @name GET /workshops
 * @function
 * @memberof module:routes/workshops
 * @param {function} getAllWorkshops - Kontroler pobierający listę wszystkich warsztatów.
 */
router.get("/", getAllWorkshops);

module.exports = router;
