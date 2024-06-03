const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const getUserIdFromToken = (req) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    return decoded.userId;
};

exports.register = async (req, res) => {
    const { name, surname, email, password, street, city, buildingNo, localNo, postCode } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            `INSERT INTO users (name, surname, email, password, street, city, buildingNo, localNo, postCode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, surname, email, hashedPassword, street, city, buildingNo, localNo, postCode]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    const userId = getUserIdFromToken(req);

    try {
        const [rows] = await db.execute(`SELECT name, surname, email FROM users WHERE id = ?`, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserInfo = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { name, surname, email } = req.body;

    try {
        const [result] = await db.execute(`UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?`, [name, surname, email, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User info updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserAddress = async (req, res) => {
    const userId = getUserIdFromToken(req);

    try {
        const [rows] = await db.execute(`SELECT street, city, buildingNo, localNo, postCode FROM users WHERE id = ?`, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserAddress = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { street, city, buildingNo, localNo, postCode } = req.body;

    try {
        const [result] = await db.execute(`UPDATE users SET street = ?, city = ?, buildingNo = ?, localNo = ?, postCode = ? WHERE id = ?`, [
            street,
            city,
            buildingNo,
            localNo,
            postCode,
            userId,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User address updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
