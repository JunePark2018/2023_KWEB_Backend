-- 5.1.1
SELECT id, c3, c5 FROM crud WHERE c1=11 AND c2=2;

-- 5.1.2
SELECT * FROM crud WHERE c1>18 OR c2<2;

-- 5.1.3
INSERT INTO crud(c1, c2, c3, c5)
VALUES(7, 4, 'col101', 0);

-- 5.1.4
INSERT INTO crud VALUES(103, 3, 3, 'col103', DEFAULT, 1);

-- 5.1.5
SELECT * FROM crud WHERE id>100;

-- 5.1.6
UPDATE crud
SET c3='col0', c5=0
WHERE c1>4 AND c1<9 AND c2=1;

-- 5.1.7
SELECT * FROM crud WHERE c1>4 AND c1<9 AND c2=1;

-- 5.1.8
DELETE FROM crud WHERE c5=0;

-- 5.1.9
SELECT * FROM crud WHERE c5=0;