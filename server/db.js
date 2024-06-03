const mysql = require("mysql2");

/**
 * Tworzy pulę połączeń do bazy danych MySQL.
 *
 * @type {Pool}
 * @property {string} host - Adres hosta bazy danych.
 * @property {string} user - Nazwa użytkownika bazy danych.
 * @property {string} password - Hasło użytkownika bazy danych.
 * @property {string} database - Nazwa bazy danych.
 */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sqlagent",
  database: "backend_app",
});

/**
 * Eksportuje pulę połączeń z możliwością użycia obietnic.
 *
 * @module db
 */
module.exports = pool.promise();
