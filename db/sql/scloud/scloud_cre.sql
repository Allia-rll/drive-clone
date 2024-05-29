Rem
Rem $Header: hop_cre.sql
Rem
Rem hop_cre.sql
Rem
Rem    NAME
Rem      hop_cre.sql - Create data objects for HR schema
Rem

SET FEEDBACK 1
SET NUMWIDTH 10
SET LINESIZE 80
SET TRIMSPOOL ON
SET TAB OFF
SET PAGESIZE 100
SET ECHO OFF 


REM ***********************
REM Create the USERS table.

Prompt ***** Creating USERS table .....

CREATE TABLE users (
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
	username VARCHAR2(25) NOT NULL,
	password VARCHAR2(60) NOT NULL,
	email VARCHAR2(25) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

REM ***********************
REM Create the FILES table.

Prompt ***** Creating files table .....

CREATE TABLE files (
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	filename VARCHAR2(40) NOT NULL,
	url VARCHAR2(60) NOT NULL,
	type VARCHAR2(25) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	owner integer NOT NULL,
    description VARCHAR2(100),
    id_project VARCHAR2(25) NOT NULL,
	FOREIGN KEY (owner) REFERENCES users(id)
);

CREATE INDEX id_project_index ON files (id_project);
CREATE INDEX id_Files_index ON files (id);
CREATE UNIQUE INDEX users_email_unique ON users (email);
CREATE UNIQUE INDEX users_username_unique ON users (username);
CREATE INDEX id_Users_index ON users (id);

COMMIT;
