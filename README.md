SunnyHillTech Assignment

Overview

This is a full-stack web application built using Angular 19 for the frontend and .NET 8 for the backend. It features authentication, role-based access control, product management, and a dashboard with analytics.

Tech Stack

Frontend: Angular 19, Angular Material, NgRx, Bootstrap, ngx-translate

Backend: .NET 8, ASP.NET Core, Entity Framework Core, SQL Server

Authentication: JWT-based authentication with role-based access (Admin, StandardUser)

State Management: NgRx Store

Database: SQL Server with EF Core migrations

Installation & Setup

Backend (.NET 8 API)

Install required dependencies:

cd back-end
dotnet restore

Set up the database and apply migrations:

dotnet ef database update

Run the API:

dotnet run

Frontend (Angular 19)

Install dependencies:

cd client
npm install

Run the frontend application:

ng serve

Environment Variables Setup

Backend (appsettings.json)

Modify back-end/appsettings.json to configure JWT and database:

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=SunnyHillDB;User Id=YOUR_USER;Password=YOUR_PASSWORD;"
  },
  "Jwt": {
    "Issuer": "https://yourdomain.com",
    "Audience": "https://yourdomain.com",
    "Key": "YOUR_SECRET_KEY",
    "TokenExpiryInMinutes": 60
  }
}

Frontend (environment.ts)

Modify client/src/environments/environment.ts:

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api',
};

API Documentation

Swagger UI: http://localhost:5000/swagger

Postman Collection: [Provide Link Here]

Authentication & User Roles

Admin: Full access to product management & user actions

StandardUser: Read-only access to products

Deployment

Backend: Deploy to Azure/AWS with dotnet publish

Frontend: Deploy to Firebase, Netlify, or an Nginx server

Common Issues & Troubleshooting

Database not found?

Ensure SQL Server is running and credentials are correct in appsettings.json.

Frontend not connecting to API?

Check environment.ts API base URL and CORS settings in the backend.

License

MIT License

