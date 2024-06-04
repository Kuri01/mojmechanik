const express = require('express');
const { register, login, getUserInfo, updateUserInfo, getUserAddress, updateUserAddress } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @typedef {object} User
 * @property {string} name.required - User's first name - eg: Jan
 * @property {string} surname.required - User's last name - eg: Kowalski
 * @property {string} email.required - User's email - eg: jan.kowalski@example.com
 * @property {string} password.required - User's password - eg: password
 * @property {string} street.required - Street name - eg: ul. Ulica 1
 * @property {string} city.required - City name - eg: Miasto
 * @property {string} buildingNo.required - Building number - eg: 10
 * @property {string} localNo.required - Local number - eg: 1
 * @property {string} postCode.required - Post code - eg: 00-000
 */

/**
 * @typedef {object} AuthResponse
 * @property {string} token - JWT token - eg: abcdef123456
 */

/**
 * @typedef {object} UserInfo
 * @property {integer} id - User ID - eg: 1
 * @property {string} name - User's first name - eg: Jan
 * @property {string} surname - User's last name - eg: Kowalski
 * @property {string} email - User's email - eg: jan.kowalski@example.com
 * @property {string} street - Street name - eg: ul. Ulica 1
 * @property {string} city - City name - eg: Miasto
 * @property {string} buildingNo - Building number - eg: 10
 * @property {string} localNo - Local number - eg: 1
 * @property {string} postCode - Post code - eg: 00-000
 */

/**
 * POST /api/auth/register
 * @summary Register a new user
 * @tags auth
 * @param {User} request.body.required - User registration information
 * @return {string} 201 - Success response - application/json
 * @example response - 201 - Example success response
 * {
 *   "message": "User registered successfully"
 * }
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * @summary Login a user
 * @tags auth
 * @param {object} request.body.required - User login information
 * @param {string} request.body.email - User's email - eg: jan.kowalski@example.com
 * @param {string} request.body.password - User's password - eg: password
 * @return {AuthResponse} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * {
 *   "token": "abcdef123456"
 * }
 */
router.post('/login', login);

/**
 * GET /api/auth/user
 * @summary Get user info
 * @tags auth
 * @return {UserInfo} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * {
 *   "id": 1,
 *   "name": "Jan",
 *   "surname": "Kowalski",
 *   "email": "jan.kowalski@example.com",
 *   "street": "ul. Ulica 1",
 *   "city": "Miasto",
 *   "buildingNo": "10",
 *   "localNo": "1",
 *   "postCode": "00-000"
 * }
 */
router.get('/user', authMiddleware, getUserInfo);

/**
 * PUT /api/auth/user
 * @summary Update user info
 * @tags auth
 * @param {User} request.body.required - User information to update
 * @return {string} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * {
 *   "message": "User info updated successfully"
 * }
 */
router.put('/user', authMiddleware, updateUserInfo);

/**
 * GET /api/auth/user/address
 * @summary Get user address
 * @tags auth
 * @return {Address} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * {
 *   "street": "ul. Ulica 1",
 *   "city": "Miasto",
 *   "buildingNo": "10",
 *   "localNo": "1",
 *   "postCode": "00-000"
 * }
 */
router.get('/user/address', authMiddleware, getUserAddress);

/**
 * PUT /api/auth/user/address
 * @summary Update user address
 * @tags auth
 * @param {Address} request.body.required - User address information to update
 * @return {string} 200 - Success response - application/json
 * @example response - 200 - Example success response
 * {
 *   "message": "User address updated successfully"
 * }
 */
router.put('/user/address', authMiddleware, updateUserAddress);

module.exports = router;
