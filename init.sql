CREATE DATABASE ims_incident;

-- Create users
CREATE USER ims_user WITH PASSWORD 'ims_pass';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ims_auth TO ims_user;
GRANT ALL PRIVILEGES ON DATABASE ims_incident TO ims_user;