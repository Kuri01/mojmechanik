const db = require('../db');

exports.getAllWorkshops = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM workshops');
        const workshops = rows.map((row) => ({
            id: row.id,
            name: row.name,
            address: {
                street: row.street,
                city: row.city,
                buildingNo: row.buildingNo,
                postCode: row.postCode,
                localNo: row.localNo,
            },
            image: row.image,
            rate: row.rate,
            opinionsNumber: row.opinionsNumber,
            description: row.description,
        }));
        res.json(workshops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
