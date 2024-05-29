rem
rem Header: hop_popul.sql
rem
rem   hop_popul.sql - Populate script for HOP schema
rem

SET VERIFY OFF
ALTER SESSION SET NLS_LANGUAGE=American; 

REM ********************** insert data into the USERS table

Prompt ***** Populating USERS table .....

INSERT INTO users (username, password, email) VALUES ('CR7', 'HalaMadrid', 'cr7@madrid.com');

COMMIT;
