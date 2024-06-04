const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const workshopRoutes = require('./routes/workshop');
const setupSwagger = require('./swagger');

const app = express();

/**
 * Middleware do parsowania JSON.
 */
app.use(bodyParser.json());

/**
 * Opcje konfiguracji CORS.
 * @type {Object}
 * @property {string} origin - Dopuszczalny adres pochodzenia.
 * @property {number} optionsSuccessStatus - Status dla opcji zapytań.
 */
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

/**
 * Middleware do obsługi CORS.
 */
app.use(cors(corsOptions));

/**
 * Trasy autoryzacyjne.
 * @name /api/auth
 * @memberof module:routes/auth
 */
app.use('/api/auth', authRoutes);

/**
 * Trasy samochodowe.
 * @name /api/cars
 * @memberof module:routes/car
 */
app.use('/api/cars', carRoutes);

/**
 * Trasy warsztatowe.
 * @name /api/workshops
 * @memberof module:routes/workshops
 */
app.use('/api/workshops', workshopRoutes);

/**
 * Dokumentacja API.
 * @name /api-docs
 * @memberof module:swagger
 */

setupSwagger(app);

const PORT = process.env.PORT || 3001;

/**
 * Uruchomienie serwera na danym porcie.
 * @param {number} PORT - Numer portu, na którym nasłuchuje serwer.
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
