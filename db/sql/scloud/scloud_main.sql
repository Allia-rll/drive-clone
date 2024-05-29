rem
rem Header: scloud_main.sql
rem
rem Owner  : Aldair Rivera
rem
rem NAME
rem   hop_main.sql - Main script for HOP schema
rem   
rem NOTES
rem   Run as SYS or SYSTEM
rem

SET ECHO OFF
SET VERIFY OFF

PROMPT 
PROMPT specify password for SCLOUD as parameter 1:
DEFINE pass     = &1
PROMPT 
PROMPT specify default tablespeace for SCLOUD as parameter 2:
DEFINE tbs      = &2
PROMPT 
PROMPT specify temporary tablespace for SCLOUD as parameter 3:
DEFINE ttbs     = &3
PROMPT 
PROMPT specify password for SYS as parameter 4:
DEFINE pass_sys = &4
PROMPT 
PROMPT specify log path as parameter 5:
DEFINE log_path = &5
PROMPT

DEFINE spool_file = &log_path.hop_main.log
SPOOL &spool_file

REM =======================================================
REM cleanup section
REM =======================================================

DROP USER prueba CASCADE;

REM =======================================================
REM create user
REM three separate commands, so the create user command 
REM will succeed regardless of the existence of the 
REM DEMO and TEMP tablespaces 
REM =======================================================

alter session set "_ORACLE_SCRIPT"=true;
CREATE USER scloud IDENTIFIED BY &pass;

ALTER USER scloud DEFAULT TABLESPACE &tbs
              QUOTA UNLIMITED ON &tbs;

ALTER USER scloud TEMPORARY TABLESPACE &ttbs;


REM =======================================================
REM grants for scloud (allmost all)
REM =======================================================

GRANT CREATE SESSION, CREATE VIEW, ALTER SESSION, CREATE SEQUENCE TO scloud;
GRANT CREATE SYNONYM, CREATE DATABASE LINK, RESOURCE TO scloud;

REM =======================================================
REM grants from sys schema
REM =======================================================

CONNECT sys/&pass_sys AS SYSDBA;
GRANT execute ON sys.dbms_stats TO scloud;


REM =======================================================
REM create scloud schema objects
REM =======================================================

CONNECT scloud/&pass
ALTER SESSION SET NLS_LANGUAGE=American;
ALTER SESSION SET NLS_TERRITORY=America;

---
--- Create tables
---

@?/demo/schema/scloud/scloud_cre

---
--- Populate tables
---

@?/demo/schema/scloud/scloud_popul

spool off
