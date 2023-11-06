const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "kwebuser",
    password: "kwebpw",
    database: "kwebdb1"
});

const runQuery = async sql => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(sql);
        return result;
    } finally {
        conn.release();
    }
};

module.exports = { runQuery };