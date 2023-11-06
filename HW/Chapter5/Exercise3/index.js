const { runQuery } = require('./database');

const express = require('express');
const app = express();
const port = 3000;

app.get('/fare', async (req, res, next) => {
    try {
	const { uid } = req.query;
	const sql =
	    "SELECT users.name, Sum(Round(types.fare_rate / 1000 * trains.distance, -2)) AS fare \
	    FROM users \
	    INNER JOIN tickets ON tickets.user = users.id AND users.id = ? \
	    INNER JOIN trains ON tickets.train = trains.id \
	    INNER JOIN types ON trains.type = types.id";
	const { name, fare } = (await runQuery(sql, [uid]))[0];
	return res.send(`Total fare of ${name} is ${fare} KRW.`);
    } catch (err) {
	console.error(err);
	return res.sendStatus(500);
    }
});

app.get('/train/status', async (req, res, next) => {
    try {
	const { tid } = req.query;
	const sql =
	    "SELECT Count(*) AS occupied, max_seats \
	    FROM tickets \
	    INNER JOIN trains ON trains.id = tickets.train AND trains.id = ? \
	    INNER JOIN types ON trains.type = types.id";
	const { occupied, max_seats } = (await runQuery(sql, [tid]))[0];
	return res.send(`Train ${tid} is ${occupied < max_seats ? 'not ' : ''}sold out`);
    } catch (err) {
	console.error(err);
	return res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
