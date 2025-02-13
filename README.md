# SunnyHillTechAssignment

## Project Overview
This is a full-stack application built with **Angular 19** (frontend) and **.NET 8** (backend).  
It includes authentication, product management, and a scalable architecture.

---

## Prerequisites
Before setting up the project, ensure you have the following dependencies installed:

### Backend Requirements
- **.NET SDK 8.0.x**
- **Entity Framework Core Tools 8.0.x** (Install with:)  
  ```
  dotnet tool install --global dotnet-ef
  ```
- **SQL Server 2019+** (or Azure SQL for cloud deployment)

### Frontend Requirements
- **Node.js 18.x** (LTS recommended)
- **Angular CLI 19.x** (Install using npm:)  
  ```
  npm install -g @angular/cli
  ```

---

## Installation and Setup

### Backend Setup
1. Navigate to the backend folder:  
   ```
   cd back-end
   ```
2. Restore dependencies:  
   ```
   dotnet restore
   ```
3. Configure the database: 
  ``` 
  Update `appsettings.json` with your SQL Server connection string.
  ```
4. Apply migrations and seed roles:  
   ```
   dotnet ef database update
   ```

### Frontend Setup
1. Navigate to the client folder:  
   ```
   cd client
   ```
2. Install dependencies:  
   ```
   npm install
   ```
3. Start the frontend:  
   ```
   ng serve
   ```
4 . Open the application in your browser:
  ```
  Frontend URL: http://localhost:4200
  Backend API URL: http://localhost:5000/api
  ````
---

## Folder Structure
```
SunnyHillTechAssignment/
│── back-end/   # .NET 8 API Solution
│   ├── Controllers/     # Handles API requests and responses
│   ├── Models/          # Database models and DTOs
│   ├── Repositories/    # Implements Repository Pattern for database access
│   ├── Services/        # Business logic and service layer
│   ├── Migrations/      # EF Core database migrations
│   ├── appsettings.json # Configuration file (database, JWT, etc.)
│── client/    # Angular 19 Frontend
│   ├── src/
│   │   ├── app/          # Main Angular application logic (components, services, etc.)
│   │   ├── assets/       # Static assets (images, icons, etc.)
│   │   ├── environments/ # Environment-specific settings (dev/prod)
│── README.md  # Project documentation
```

---

## Environment Variables

### Backend (`appsettings.json`):
```json
{
  "JwtSettings": {
    "Secret": "your-secret-key",
    "Issuer": "your-issuer",
    "Audience": "your-audience",
    "ExpiryInMinutes": 60
  }
}
```

### Frontend (`.env`):
```env
API_BASE_URL=http://localhost:5000/api
```

---
