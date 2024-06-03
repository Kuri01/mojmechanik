const db = require("../db");
const jwt = require("jsonwebtoken");

/**
 * Pobiera identyfikator użytkownika z tokenu JWT.
 *
 * @param {Object} req - Obiekt żądania HTTP.
 * @returns {number} Identyfikator użytkownika.
 */
const getUserIdFromToken = (req) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, "your_jwt_secret");
  return decoded.userId;
};

/**
 * Dodaje nowy samochód.
 *
 * @param {Object} req - Obiekt żądania HTTP.
 * @param {Object} res - Obiekt odpowiedzi HTTP.
 */
exports.addCar = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const {
    brand_id,
    model_id,
    registrationNumber,
    firstRegistrationDate,
    icon,
  } = req.body;

  try {
    const formattedDate = new Date(firstRegistrationDate)
      .toISOString()
      .split("T")[0];
    const [result] = await db.execute(
      `INSERT INTO cars (user_id, brand_id, model_id, registrationNumber, firstRegistrationDate, icon)
             VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, brand_id, model_id, registrationNumber, formattedDate, icon]
    );

    res.status(201).json({ message: "Car added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Aktualizuje dane samochodu.
 *
 * @param {Object} req - Obiekt żądania HTTP.
 * @param {Object} res - Obiekt odpowiedzi HTTP.
 */
exports.updateCar = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const {
    id,
    brand_id,
    model_id,
    registrationNumber,
    firstRegistrationDate,
    icon,
  } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE cars SET brand_id = ?, model_id = ?, registrationNumber = ?, firstRegistrationDate = ?, icon = ?
             WHERE id = ? AND user_id = ?`,
      [
        brand_id,
        model_id,
        registrationNumber,
        firstRegistrationDate,
        icon,
        id,
        userId,
      ]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Car not found or not authorized" });
    }

    res.json({ message: "Car updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Usuwa samochód.
 *
 * @param {Object} req - Obiekt żądania HTTP.
 * @param {Object} res - Obiekt odpowiedzi HTTP.
 */
exports.deleteCar = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      `DELETE FROM cars WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Car not found or not authorized" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Pobiera listę samochodów użytkownika.
 *
 * @param {Object} req - Obiekt żądania HTTP.
 * @param {Object} res - Obiekt odpowiedzi HTTP.
 */
exports.getCars = async (req, res) => {
  const userId = getUserIdFromToken(req);

  try {
    const [rows] = await db.execute(
      `SELECT cars.id, brands.name as brand, models.name as model, cars.registrationNumber, cars.firstRegistrationDate, cars.icon
             FROM cars
             JOIN brands ON cars.brand_id = brands.id
             JOIN models ON cars.model_id = models.id
             WHERE cars.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Pobiera listę marek samochodowych.
 *
 * @param {Object} req - Obiekt żądania HTTP.
 * @param {Object} res - Obiekt odpowiedzi HTTP.
 */
exports.getBrands = async (req, res) => {
  try {
    const [brands] = await db.execute(`SELECT * FROM brands`);
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Pobiera listę modeli samochodowych na podstawie identyfikatora marki.
 *
 * @param {Object} req - Obiekt żądania HTTP.
 * @param {Object} res - Obiekt odpowiedzi HTTP.
 */
exports.getModelsByBrand = async (req, res) => {
  const { brand_id } = req.params;

  try {
    const [models] = await db.execute(
      `SELECT * FROM models WHERE brand_id = ?`,
      [brand_id]
    );
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
