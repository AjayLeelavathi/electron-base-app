const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./local_database.db');

function getConnection() {
	return db;
}

module.exports = { getConnection };