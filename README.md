# ims-project
## Incident Management System

# Setup using docker
## Prerequisites
- Install docker
- Docker compose

## Step 1: Clone the git repository
https://github.com/snehalchavann/ims-project.git

## Step 2: Add .env file at project root directory
Example:
### PostgreSQL
DB_HOST=postgres
DB_PORT=5432
DB_NAME=ims_incident
DB_USERNAME=ims_user
DB_PASSWORD=ims_pass

### Redis
REDIS_HOST=redis
REDIS_PORT=6379

### App port
SERVER_PORT=8082

### JWT Secret
JWT_SECRET=YourJWTSecret

## Step 3: Run the Application using following command
docker-compose up --build

## Step 4: Access the application
Frontend: http://localhost:4200

Auth Service: http://localhost:8081

Incident Service: http://localhost:8082

## Step 5: Stop the application
docker-compose down