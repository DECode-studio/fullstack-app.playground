# Fusstack Playground

This repository contains two independent implementations of the same blogging experience, built to showcase parity across Laravel and Next.js stacks. Both deliver authentication (sign up / sign in / sign out), full CRUD management for posts, pagination on the listing view, and a DaisyUI-powered interface.

## Project Structure

- `laravel/` – Laravel 12 application using Breeze for authentication, Tailwind, and DaisyUI components.
- `nextjs/` – Next.js 16 (App Router) application using Prisma (PostgreSQL via Neon), NextAuth credentials authentication, Tailwind, and DaisyUI components.

## Prerequisites

- PHP 8.2+ with Composer
- Node.js 18+ with npm
- Access to PostgreSQL (the Neon connection string provided below works out of the box for the Next.js stack)

---

## Laravel Stack

1. **Install dependencies**
   ```bash
   cd laravel
   composer install
   npm install
   ```
2. **Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   Update the database connection in `.env`. For quick local testing you can use SQLite by setting:
   ```dotenv
   DB_CONNECTION=sqlite
   DB_DATABASE=/absolute/path/to/laravel/database/database.sqlite
   ```
   then create the file:
   ```bash
   touch database/database.sqlite
   ```
3. **Run migrations**
   ```bash
   php artisan migrate
   ```
4. **Start dev servers** (run in separate terminals)
   ```bash
   php artisan serve
   npm run dev
   ```
   Visit `http://localhost:8000` to access the app.

### Laravel Notes
- Authentication scaffolding is provided by Laravel Breeze and styled with DaisyUI via Tailwind.
- Posts are scoped per user; only the author can edit or delete their entries.
- Pagination is enabled on the post index (10 per page).

---

## Next.js Stack

1. **Install dependencies**
   ```bash
   cd nextjs
   npm install
   ```
2. **Environment**
   ```bash
   cp .env.example .env
   ```
   Set a secure `NEXTAUTH_SECRET` value (e.g. `openssl rand -base64 32`). The sample `.env` points to the provided Neon PostgreSQL instance:
   ```
   postgresql://***:***@***/neondb?sslmode=require&channel_binding=require
   ```
3. **Database setup**
   ```bash
   npx prisma migrate deploy
   ```
   Prisma will apply the migrations to the remote PostgreSQL database (requires SSL, already enabled in the URL).
4. **Run development server**
   ```bash
   npm run dev
   ```
   The app is available at `http://localhost:3000`.

### Next.js Notes
- Uses Prisma with PostgreSQL (Neon) and NextAuth (credentials provider) for authentication.
- Server Actions secure create/update/delete operations and automatically revalidate the post list.
- DaisyUI components deliver a consistent look with the Laravel implementation.
- Run `npm run lint` to check code quality (ESLint is configured).

---

## Docker Compose (Optional)

A development-friendly Docker Compose setup is available to run both stacks together:

1. Make sure you have copied and configured environment files:
   - `cp laravel/.env.example laravel/.env` then set `APP_KEY` (`php artisan key:generate --ansi`).
   - `cp nextjs/.env.example nextjs/.env` and set a strong `NEXTAUTH_SECRET`.
2. From the repository root, start the services:
   ```bash
   docker compose up --build
   ```
   - Laravel API: http://localhost:8000  
   - Laravel Vite dev server: http://localhost:5173  
   - Next.js app: http://localhost:3000

Environment variables `DATABASE_URL` and `NEXTAUTH_SECRET` can be overridden by creating a root `.env` file before running compose. The default `DATABASE_URL` points to the provided Neon instance; override it if you need a different database.

To stop the stack, run `docker compose down`. Use `docker compose logs -f <service>` to inspect service logs.

---

## Additional Information

- DaisyUI is wired into both Tailwind pipelines, so you can rely on its components without extra setup.
- Database migrations for both stacks live in their respective directories (`database/migrations` for Laravel, `prisma/migrations` for Next.js).
- The provided Docker Compose stack is aimed at local development; adapt the Dockerfiles if you need a production-ready image.

Enjoy exploring, and feel free to extend either implementation further!
