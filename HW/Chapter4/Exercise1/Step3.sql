CREATE TABLE `students` (
	`name` VARCHAR(20) NOT NULL,
	`admission_year` YEAR NOT NULL,
	`major` VARCHAR(20) NOT NULL,
	`student_num` INT NOT NULL,
	`phone_num` INT,
	`address` VARCHAR(100),
	`total_credit` INT NOT NULL DEFAULT 0,
	`avg_credit` DOUBLE NOT NULL DEFAULT 0.0,
	`is_attending` TINYINT(1) NOT NULL DEFAULT 1,
	PRIMARY KEY (`admission_year`, `major`, `student_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;