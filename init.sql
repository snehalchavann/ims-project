CREATE DATABASE ims_incident;

-- Create users
CREATE USER ims_user WITH PASSWORD 'ims_pass';
CREATE USER ims_username WITH PASSWORD 'ims_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ims_auth TO ims_user;
GRANT ALL PRIVILEGES ON DATABASE ims_incident TO ims_username;

-- Switch to ims_auth DB and configure schema/table permissions
\connect ims_auth

-- Schema permissions
GRANT USAGE, CREATE ON SCHEMA public TO ims_user;

-- Table/sequence permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO ims_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON SEQUENCES TO ims_user;

-- Switch to ims_incident DB
\connect ims_incident

-- Schema permissions
GRANT USAGE, CREATE ON SCHEMA public TO ims_username;

-- Table/sequence permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO ims_username;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON SEQUENCES TO ims_username;