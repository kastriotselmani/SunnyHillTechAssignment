SunnyHillTechAssignment

Project Overview

This is a full-stack application built with Angular 19 (frontend) and .NET 8 (backend). It includes authentication, product management, and a scalable architecture.

Prerequisites

Before setting up the project, ensure you have the following dependencies installed:

Backend Requirements

.NET SDK 8.0.x (Download from here)

Entity Framework Core Tools 8.0.x (Install with dotnet tool install --global dotnet-ef)

SQL Server 2019+ (or Azure SQL for cloud deployment)

Frontend Requirements

Node.js 18.x (LTS recommended) Download Node.js

Angular CLI 19.x (Install using npm install -g @angular/cli)

Installation and Setup

Backend Setup

Navigate to the backend folder:

cd back-end

Restore dependencies:

dotnet restore

Configure the database:

Update appsettings.json with your SQL Server connection string.

Apply migrations and seed roles:

dotnet ef database update

Run the API:

dotnet run

Frontend Setup

Navigate to the client folder:

cd client

Install dependencies:

npm install

Start the development server:

ng serve

Environment Variables

Backend (.NET 8)

Create an appsettings.Development.json file in back-end/ with:

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DB;User Id=YOUR_USER;Password=YOUR_PASSWORD;"
  },
  "JwtSettings": {
    "Key": "YourSuperSecretKey",
    "Issuer": "YourIssuer",
    "Audience": "YourAudience"
  }
}

Frontend (Angular 19)

Create an .env file in client/ with:

API_URL=http://localhost:5000/api
JWT_SECRET=YourFrontendSecret

API Documentation

Swagger is available at: http://localhost:5000/swagger

A Postman collection is also available in the repository.

Running Tests

Backend tests: dotnet test

Frontend tests: ng test

Deployment

CI/CD is configured using GitHub Actions.

Ensure proper .env variables for production settings.

Contributors

Kastriot Selmani

License

MIT License

