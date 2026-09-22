# Sandbooks

![Static Badge](https://img.shields.io/badge/REACT-blue?style=for-the-badge&logo=react&logoColor=blue&labelColor=black)
![Static Badge](https://img.shields.io/badge/nodejs-5FA04E?style=for-the-badge&logo=nodedotjs&labelColor=gray)

Sandbooks is a digital library platform for discovering, organizing, and saving books. The project is split into a React web application and a Node.js REST API backed by MySQL.

## Features

- Browse books in grid or list views.
- Search and explore books by category, author, and publisher.
- View curated, recommended, newest, and most-reviewed books.
- Open a detailed book page with rating, metadata, availability, and description.
- Register, log in, refresh sessions, and log out.
- Save books to the authenticated user's personal library.
- Create books, authors, and publishers as an administrator.
- Upload book images and serve them from local storage or Vercel Blob.
- Responsive user interface with loading skeletons for asynchronous content.

### Frontend

The frontend is located in `sb-ui/` and uses:

- React 19 and TypeScript
- Vite
- React Router
- Tailwind CSS
- Remix Icon React
- Cookie-based authentication requests with `credentials: include`

Main UI areas include authentication pages, user-facing discovery pages, book details, saved books, and administrator book management.

### Backend

The API is located in `sb-node/` and uses:

- Node.js and Express
- MySQL through `mysql2`
- JWT access and refresh tokens
- `httpOnly` cookies for authentication
- `bcrypt` for password hashing
- `multer` for multipart book image uploads
- CORS with credential support
- Vercel Node deployment through `api/index.js`

The authenticated user is taken from the verified access token (`req.user.id`). Clients do not provide a user ID when requesting saved books.

## Project Structure

```text
sb-node/
├── api/                 Vercel entry point
├── config/              Runtime configuration helpers
├── database/            Database-related files
├── scripts/             Maintenance scripts
├── src/
│   ├── config/          Environment, database, schema, and migrations
│   ├── controllers/     HTTP request handlers
│   ├── middlewares/     Authentication, validation, uploads, and errors
│   ├── models/          MySQL data access
│   ├── routes/          API route definitions
│   ├── services/        Application and business logic
│   └── utils/           Tokens, cookies, passwords, and helpers
└── server.js            Local server entry point

sb-ui/
├── public/              Static assets
└── src/
	├── components/      Shared user and admin components
	├── contexts/        Authentication context and hooks
	├── layout/          User and admin layouts
	├── pages/           Route-level screens
	└── services/        API client and TypeScript types
```

## Requirements

- Node.js 20 or newer
- MySQL 8 or a compatible MySQL service
- npm

## Local Setup

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd sandbooks

cd sb-node
npm install

cd ../sb-ui
npm install
```

### 2. Configure the backend

Create `sb-node/.env` with the required database and authentication settings:

```env
NODE_ENV=development
PORT=8000

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=sandbooks

JWT_SECRET=replace_with_a_long_random_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
```

`JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` may be provided separately. When they are omitted, the API falls back to `JWT_SECRET`.

Import the database schema using the backend script:

```bash
cd sb-node
npm run db:schema
```

### 3. Start the applications

Start the API in one terminal:

```bash
cd sb-node
npm run dev
```

Start the frontend in another terminal:

```bash
cd sb-ui
npm run dev
```

## Available Scripts

### Frontend (`sb-ui`)

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

### Backend (`sb-node`)

```bash
npm start              # Start the API server
npm run dev            # Start the API with Node watch mode
npm run check          # Check server.js syntax
npm run db:schema      # Apply the database schema
npm run db:migrate-images  # Migrate book images to Vercel Blob
```

## Security

- Never commit `.env` files, JWT secrets, database passwords, or production credentials.
- Use different secrets and database credentials for development and production.
- Keep authentication cookies `httpOnly` and `secure` in production.
- Restrict `CORS_ORIGIN` to trusted frontend origins.
