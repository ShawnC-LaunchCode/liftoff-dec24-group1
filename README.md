# Family Flashback

Family Flashback is a genealogy application that helps users track and manage their family history. The application provides a secure platform for creating, storing, and visualizing family trees with interactive features like geographical mapping of family origins.

## Features

- User authentication with Google Sign-In
- Interactive family tree visualization
- Geographical mapping of family origins using Mapbox
- Photo upload and management
- Family history blog
- Secure user account management
- Full CRUD operations for family records

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- Java 17 or higher
- MySQL (version 8.0 recommended)
- Maven
- Git

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/ShawnC-LaunchCode/liftoff-dec24-group1.git
cd liftoff-dec24-group1
```

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE family_flashback;
```

2. Create a database user and grant privileges:
```sql
CREATE USER 'ff_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON family_flashback.* TO 'ff_user'@'localhost';
FLUSH PRIVILEGES;
```

### Backend Setup (Java/Spring Boot)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create an `application.properties` file in `src/main/resources/`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/family_flashback
spring.datasource.username=ff_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

3. Build and run the backend:
```bash
./mvnw clean install
./mvnw spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup (React)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create a `.env` file in the frontend root directory:
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

3. Install dependencies and start the development server:
```bash
npm install
npm start
```

The frontend development server will start on `http://localhost:3000`

## Development Workflow

1. Always pull the latest changes before starting work:
```bash
git pull origin main
```

2. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them:
```bash
git add .
git commit -m "Description of your changes"
```

4. Push your changes and create a pull request:
```bash
git push origin feature/your-feature-name
```

## Project Structure

```
liftoff-dec24-group1/
├── frontend/                 # React application
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   ├── package.json         # Dependencies and scripts
│   └── .env                 # Environment variables
│
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Java source files
│   │   │   └── resources/  # Configuration files
│   ├── pom.xml             # Maven configuration
│   └── .gitignore
│
└── README.md
```

## Team Members

- Nick: User Authentication & Account Management
- Lori: Family Records & Photo Management
- Tori: Database & Blog Features
- Grayson: Visualization & Mapping

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
