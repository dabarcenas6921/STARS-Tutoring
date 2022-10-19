\echo 'Delete and recreate STAR db?'
\prompt 'Return for yes or control-c to cancel > ' answer

DROP DATABASE star;
CREATE DATABASE star;
\connect star;

\i star-schema.sql
\i star-seed.sql
