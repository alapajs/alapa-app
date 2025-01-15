# Backend

A new Alapa project.

## Getting Started

This project serves as a starting point for an Alapa application. Follow the steps below to set up and run the project on your local machine.

For help with Alapa development, visit the [online documentation](https://github.com/alapajs/alapa/), which offers tutorials, samples, guidance on web development, and a full API reference.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js (v18 or later)**: [Download Node.js](https://nodejs.org/en/download/package-manager)
- **npm** (comes with Node.js)

## Installation and Setup

### 1. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 2. Build the Application

Build the application for production:

```bash
npm run build
```

### 3. Run Migrations

Generate and run the database migrations:

```bash
npm run migration:generate
npm run migration:run
```

### 4. Start the Application

Start the application in development mode:

```bash
npm run dev
```

For production, use:

```bash
npm start
```

### 5. Access the Application

Once the application is running, open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

Replace `<PORT>` with the value specified in your `.env` file (default is 3000).

## Troubleshooting

If you encounter issues, follow these steps:

1. Ensure all environment variables are correctly set up in the `.env` file.
2. Verify that your database is running and accessible.
3. Check the database URL in your `.env` file to ensure it is valid and has the proper schema setup.
4. If migration issues persist, confirm your database setup matches the migration requirements.

## Additional Commands

### Run Tests

Run the test suite:

```bash
npm test
```

### Lint the Code

Check your code for linting errors:

```bash
npm run lint
```

### Clean Build Files

Remove build files and clean up the project directory:

```bash
npm run clean
```

---

Enjoy working on your Alapa project!
