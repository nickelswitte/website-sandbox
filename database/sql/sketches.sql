CREATE DATABASE IF NOT EXISTS sketches;

USE sketches;

CREATE TABLE IF NOT EXISTS Sketches (
    sketchID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description varchar(1000), 
    path varchar(300) NOT NULL,
    PRIMARY KEY (sketchID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO sketches VALUES (NULL, 'testname', 'Eine Beschreibungßü', './sketches/bouncing/2.0');