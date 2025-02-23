#### Project Setup Guide

- Environment Configuration

Create a .env file in the src directory of your project and configure the following environment variables:

POSTGRES_HOST=`localhost`
POSTGRES_DBNAME=`postgres`
POSTGRES_USERNAME=`postgres`
POSTGRES_PASSWORD=`postgres`
SAMPLE_SECRET_JWT_KET=`YOUR_SECRET_KEY`

If you already have PostgreSQL installed and running, use the credentials for your existing setup. Otherwise, follow the steps below to install and configure PostgreSQL using Docker.

##### Installing Docker
If Docker is not installed, you can install it by following the steps for your operating system:

- For macOS:
`brew install --cask docker`

- For Ubuntu/Linux:
`sudo apt-get update`
`sudo apt-get install -y docker.io`

- For Windows:
Download and install Docker Desktop from Docker's official website.

I have attached one docker-compose.yml file use below command 
`docker-compose up -d`

#### Running the Application
To run the application, use the following commands:
1) `cd src`
2) `yarn` 
3) `yarn build && yarn start` 


# Dummy Data for Testing
The project includes functionality to seed dummy data. To enable this, uncomment the following line in the code:
// Uncomment to populate dummy data
// await populateDummyData();
in server.ts file in src 

API Endpoints
1) `Register a new user`
URL: http://localhost:9000/api/auth/register
Method: POST
Description: Creates a new user account.

2) `Login`
URL: http://localhost:9000/api/auth/login
Method: POST
Description: Authenticates a user and generates a JWT.

3) `Get Contacts`
URL: http://localhost:9000/api/contacts
Method: GET
Description: Retrieves all contacts from the database.

4) `Search by Phone Number`
URL: http://localhost:9000/api/search/phone?phoneNumber=9876
Method: GET
Description: Searches for users or contacts by partial or full phone number.

5) `Mark as Spam`
URL: http://localhost:9000/api/spam/
Method: POST
Description: Marks a user or contact as spam.

### Testing the APIs
Use Postman or any HTTP client to test the APIs.

Example Postman Requests
- Register a User
URL: http://localhost:9000/api/auth/register
Method: POST
body
{
    "name": "Aman goyal",
    "phoneNumber": "1122334455",
    "email": "aman.goyal9643@gmail.com",
    "password": "Amangoyal1@"
}
