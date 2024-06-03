const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const workshopRoutes = require('./routes/workshop');

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/workshops', workshopRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
