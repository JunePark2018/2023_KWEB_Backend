-- 5.2.1
SELECT user, name, seat_number
FROM tickets INNER JOIN users ON user=users.id AND train=11
ORDER BY seat_number ASC;

-- 5.2.2
SELECT users.id, users.name, COUNT(*) AS trains_count, SUM(trains.distance) / 10 AS total_distance
FROM users INNER JOIN tickets ON users.id=tickets.user INNER JOIN trains ON tickets.train=trains.id
GROUP BY users.id
ORDER BY total_distance DESC
LIMIT 6;

-- 5.2.3
SELECT
	trains.id,
	types.name AS type, 
	src.name AS src_stn,
	dst.name AS dst_stn,
	Timediff(arrival, departure) AS travel_time
FROM
	trains
	INNER JOIN types ON trains.type=types.id
	INNER JOIN stations AS src ON trains.source=src.id
	INNER JOIN stations AS dst ON trains.destination=dst.id
ORDER BY travel_time DESC
LIMIT 6;

-- 5.2.4
SELECT
	types.name AS type,
	src.name AS src_stn,
	dst.name AS dst_stn,
	departure,
	arrival,
	Round(fare_rate / 1000 * distance, -2) AS fare
FROM
	trains
	INNER JOIN types ON trains.type=types.id
	INNER JOIN stations AS src ON source=src.id
	INNER JOIN stations AS dst ON destination=dst.id
ORDER BY departure ASC;

-- 5.2.5
SELECT
	trains.id,
	types.name AS type, 
	src.name AS src_stn,
	dst.name AS dst_stn,
	Count(tickets.train) AS occupied,
	types.max_seats AS maximum
FROM
	trains
	INNER JOIN types ON trains.type=types.id
	INNER JOIN stations AS src ON source=src.id
	INNER JOIN stations AS dst ON destination=dst.id
	INNER JOIN tickets ON trains.id=tickets.train
GROUP BY tickets.train
ORDER BY trains.id ASC;

-- 5.2.6
SELECT
	trains.id,
	types.name AS type, 
	src.name AS src_stn,
	dst.name AS dst_stn,
	Count(tickets.train) AS occupied,
	types.max_seats AS maximum
FROM
	trains
	INNER JOIN types ON trains.type=types.id
	INNER JOIN stations AS src ON source=src.id
	INNER JOIN stations AS dst ON destination=dst.id
	LEFT OUTER JOIN tickets ON trains.id=tickets.train
GROUP BY tickets.train
ORDER BY trains.id ASC;