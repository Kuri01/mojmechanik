const express = require('express');
const { addCar, updateCar, deleteCar, getCars, getBrands, getModelsByBrand } = require('../controllers/carController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @typedef {object} Car
 * @property {integer} id - Car ID - eg: 1
 * @property {string} brand - Car brand - eg: BMW
 * @property {string} model - Car model - eg: X5
 * @property {string} registrationNumber - Registration number - eg: XYZ789
 * @property {string} firstRegistrationDate - First registration date - eg: 2018-09-25
 * @property {string} icon - Car icon URL - eg: https://example.com/icon.jpg
 */

/**
 * @typedef {object} CarInput
 * @property {integer} brand_id.required - Brand ID - eg: 1
 * @property {integer} model_id.required - Model ID - eg: 1
 * @property {string} registrationNumber.required - Registration number - eg: XYZ789
 * @property {string} firstRegistrationDate.required - First registration date - eg: 2018-09-25
 * @property {string} icon - Car icon URL - eg: https://example.com/icon.jpg
 */

/**
 * @typedef {object} Brand
 * @property {integer} id - Brand ID - eg: 1
 * @property {string} name - Brand name - eg: BMW
 */

/**
 * @typedef {object} Model
 * @property {integer} id - Model ID - eg: 1
 * @property {integer} brand_id - Brand ID - eg: 1
 * @property {string} name - Model name - eg: X5
 */

/**
 * POST /api/cars
 * @summary Add a new car
 * @tags cars
 * @param {CarInput} request.body.required - Car information
 * @return {string} 201 - Success response - application/json
 * @example response - 201 - Example success response
 * {
 *   "message": "Car added successfully"
 * }
 */
router.post('/', authMiddleware, addCar);

/**
 * PUT /api/cars
 * @summary Update a car
 * @tags cars
 * @param {CarInput} request.body.required - Car information
 * @return {string} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * {
 *   "message": "Car updated successfully"
 * }
 */
router.put('/', authMiddleware, updateCar);

/**
 * DELETE /api/cars/{id}
 * @summary Delete a car
 * @tags cars
 * @param {integer} id.path.required - Car ID
 * @return {string} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * {
 *   "message": "Car deleted successfully"
 * }
 */
router.delete('/:id', authMiddleware, deleteCar);

/**
 * GET /api/cars
 * @summary Get all cars for the user
 * @tags cars
 * @return {array<Car>} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * [
 *   {
 *     "id": 1,
 *     "brand": "BMW",
 *     "model": "X5",
 *     "registrationNumber": "XYZ789",
 *     "firstRegistrationDate": "2018-09-25",
 *     "icon": "https://example.com/icon.jpg"
 *   }
 * ]
 */
router.get('/', authMiddleware, getCars);

/**
 * GET /api/cars/brands
 * @summary Get all car brands
 * @tags cars
 * @return {array<Brand>} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * [
 *   {
 *     "id": 1,
 *     "name": "BMW"
 *   }
 * ]
 */
router.get('/brands', getBrands);

/**
 * GET /api/cars/models/{brand_id}
 * @summary Get all models for a specific brand
 * @tags cars
 * @param {integer} brand_id.path.required - Brand ID
 * @return {array<Model>} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * [
 *   {
 *     "id": 1,
 *     "brand_id": 1,
 *     "name": "X5"
 *   }
 * ]
 */
router.get('/models/:brand_id', getModelsByBrand);

module.exports = router;
