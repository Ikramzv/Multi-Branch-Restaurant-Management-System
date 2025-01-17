## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd restaurant-management
   ```

````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the MySQL database:

   ```bash
   docker-compose up -d
   ```

5. Set up the database:
   ```bash
   npm run db:setup
   ```

## Running the Application

Development mode:

```bash
npm run dev
```

## Swagger documentation

```
http://localhost:3001/api
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database
- `npm run db:setup` - Complete database setup

## Environment Variables

```env
PORT=3001
MYSQL_DATABASE=<database_name>
MYSQL_ROOT_PASSWORD=<root_password>
MYSQL_USER=<user>
MYSQL_PASSWORD=<password>
DATABASE_URL="mysql://root:<MYSQL_ROOT_PASSWORD>@localhost:3306/<MYSQL_DATABASE>"
```
````
