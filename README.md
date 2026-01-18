# Task Manager Next.js

A professional full-stack Task Manager application built with Next.js 14, TypeScript, Prisma, and PostgreSQL. Designed for easy deployment on Vercel with Vercel Postgres.

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Styling**: Tailwind CSS
- **Authentication**: Custom JWT (JOSE) + bcryptjs
- **Deployment**: Vercel

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd task-manager-nextjs-postgres
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file in the root directory (if not exists) and add your database URL and JWT secret:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager?schema=public"
   JWT_SECRET="your-secret-key"
   ```
   > Note: You need a running PostgreSQL instance locally.

4. **Initialize Database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. **Push to GitHub.**
2. **Import Project in Vercel:**
   - Select your repository.
   - Framework Preset: Next.js.
3. **Configure Storage (Vercel Postgres):**
   - Adding a Vercel Postgres store during import or in Storage tab.
   - This automatically sets `POSTGRES_PRISMA_URL` and others.
   - **Important**: Override `DATABASE_URL` in Vercel Environment Variables to use `POSTGRES_PRISMA_URL` or ensure your `schema.prisma` uses the correct env var if you switch to `POSTGRES_PRISMA_URL`. By default, this project uses `DATABASE_URL`.
   - Add `JWT_SECRET` to Environment Variables.
4. **Deploy.**
   - Vercel will build and deploy the application.
   - Connect your production database using Prisma (Vercel usually handles this if integrated).

## Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
- `npm run start`: Start production server.
- `npm run lint`: Run ESLint.
- `npx prisma studio`: Open database GUI.
