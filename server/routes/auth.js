const express = require("express");
const {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  getUserAddress,
  updateUserAddress,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @module routes/auth
 */

/**
 * Rejestruje nowego użytkownika.
 *
 * @name POST /register
 * @function
 * @memberof module:routes/auth
 * @param {function} register - Kontroler obsługujący rejestrację użytkownika.
 */
router.post("/register", register);

/**
 * Loguje użytkownika.
 *
 * @name POST /login
 * @function
 * @memberof module:routes/auth
 * @param {function} login - Kontroler obsługujący logowanie użytkownika.
 */
router.post("/login", login);

/**
 * Pobiera informacje o użytkowniku.
 *
 * @name GET /user
 * @function
 * @memberof module:routes/auth
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} getUserInfo - Kontroler pobierający informacje o użytkowniku.
 */
router.get("/user", authMiddleware, getUserInfo);

/**
 * Aktualizuje informacje o użytkowniku.
 *
 * @name PUT /user
 * @function
 * @memberof module:routes/auth
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} updateUserInfo - Kontroler aktualizujący informacje o użytkowniku.
 */
router.put("/user", authMiddleware, updateUserInfo);

/**
 * Pobiera adres użytkownika.
 *
 * @name GET /user/address
 * @function
 * @memberof module:routes/auth
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} getUserAddress - Kontroler pobierający adres użytkownika.
 */
router.get("/user/address", authMiddleware, getUserAddress);

/**
 * Aktualizuje adres użytkownika.
 *
 * @name PUT /user/address
 * @function
 * @memberof module:routes/auth
 * @param {function} authMiddleware - Middleware do autoryzacji użytkownika.
 * @param {function} updateUserAddress - Kontroler aktualizujący adres użytkownika.
 */
router.put("/user/address", authMiddleware, updateUserAddress);

module.exports = router;
