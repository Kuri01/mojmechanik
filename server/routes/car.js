const express = require("express");
const {
  addCar,
  updateCar,
  deleteCar,
  getCars,
  getBrands,
  getModelsByBrand,
} = require("../controllers/carController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @module routes/car
 */

/**
 * Dodaje nowy samochód.
 *
 * @name POST /cars
 * @function
 * @memberof module:routes/car
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} addCar - Kontroler dodający nowy samochód.
 */
router.post("/", authMiddleware, addCar);

/**
 * Aktualizuje dane samochodu.
 *
 * @name PUT /cars
 * @function
 * @memberof module:routes/car
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} updateCar - Kontroler aktualizujący dane samochodu.
 */
router.put("/", authMiddleware, updateCar);

/**
 * Usuwa samochód.
 *
 * @name DELETE /cars/:id
 * @function
 * @memberof module:routes/car
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} deleteCar - Kontroler usuwający samochód.
 */
router.delete("/:id", authMiddleware, deleteCar);

/**
 * Pobiera listę samochodów użytkownika.
 *
 * @name GET /cars
 * @function
 * @memberof module:routes/car
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} getCars - Kontroler pobierający listę samochodów.
 */
router.get("/", authMiddleware, getCars);

/**
 * Pobiera listę marek samochodowych.
 *
 * @name GET /cars/brands
 * @function
 * @memberof module:routes/car
 * @param {function} getBrands - Kontroler pobierający listę marek samochodowych.
 */
router.get("/brands", getBrands);

/**
 * Pobiera listę modeli samochodowych na podstawie identyfikatora marki.
 *
 * @name GET /cars/models/:brand_id
 * @function
 * @memberof module:routes/car
 * @param {function} getModelsByBrand - Kontroler pobierający listę modeli samochodowych na podstawie identyfikatora marki.
 */
router.get("/models/:brand_id", getModelsByBrand);

module.exports = router;
