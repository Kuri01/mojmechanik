const express = require('express');
const { addCar, updateCar, deleteCar, getCars, getBrands, getModelsByBrand } = require('../controllers/carController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addCar);
router.put('/', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);
router.get('/', authMiddleware, getCars);

router.get('/brands', getBrands);
router.get('/models/:brand_id', getModelsByBrand);

module.exports = router;
