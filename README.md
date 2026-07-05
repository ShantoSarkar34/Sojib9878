# Merajul Islam Sojib — Portfolio

A production-ready developer portfolio with a full CMS-driven admin dashboard, built with Next.js 16, TypeScript, Prisma, and Neon Postgres.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base UI primitives)
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Database:** Prisma ORM 7 + Neon Postgres (via `@prisma/adapter-neon`)
- **Auth:** Better Auth (email/password, single admin account)
- **Image storage:** Vercel Blob
- **Email:** Resend
- **Analytics:** Vercel Analytics + Speed Insights
- **Tooling:** ESLint, Prettier, Husky, lint-staged

## Features

- Fully responsive public portfolio: Hero, About, Skills, Experience, Education, Projects (with detail pages, category filter, and search), Certificates, Contact, Footer
- Sections with no data (Experience/Education/Certificates) render conditionally — nothing fake ever ships
- Working contact form with honeypot + rate-limiting spam protection, saved to the database, optional email notification via Resend
- Secure admin dashboard (`/admin`) with full CRUD for Profile, Social Links, Skills, Projects, Experience, Education, Certificates, Messages, and Settings
- Image and resume (PDF) uploads via Vercel Blob
- Dark / light / system theme, SEO metadata driven by the Settings table, sitemap, robots.txt, JSON-LD structured data
- Maintenance mode toggle

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Pooled Neon Postgres connection string (runtime) |
| `DIRECT_URL` | Direct/unpooled Neon connection string (migrations) |
| `BETTER_AUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Base URL of the app (e.g. `http://localhost:3000`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Used once by `prisma/seed.ts` to create the single admin account |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (from your Vercel project's Storage tab) |
| `RESEND_API_KEY` | Resend API key (optional — contact form works without it, just skips the email notification) |
| `EMAIL_FROM` / `CONTACT_NOTIFICATION_EMAIL` | Sender and recipient for contact notifications |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used in metadata and OG tags |

### 3. Set up the database

```bash
npm run db:migrate   # applies migrations (prompts for a name on first run in dev)
npm run db:seed      # creates the admin user + seeds initial content
```

### 4. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the admin dashboard (sign in with `ADMIN_EMAIL`/`ADMIN_PASSWORD`).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:migrate` | Create and apply a new migration (dev) |
| `npm run db:deploy` | Apply pending migrations (production) |
| `npm run db:seed` | Run the seed script |
| `npm run db:studio` | Open Prisma Studio |

## Folder Structure

```
prisma/            Prisma schema, migrations, seed script
src/
  app/              Next.js App Router routes
    admin/          Admin dashboard (protected route group + login)
    api/            Route handlers (auth, upload)
    projects/[slug] Project detail pages
  components/
    ui/             shadcn/ui primitives
    site/           Public-facing section components
    admin/          Admin dashboard components (tables, forms)
    shared/         Cross-cutting components (theme, container, etc.)
  features/         Server actions, Zod schemas, and Prisma queries, grouped by domain
  lib/              Singletons: Prisma client, Better Auth, Blob, Resend, rate-limit
  constants/        Static config (nav links, admin nav)
  generated/prisma/ Generated Prisma client (gitignored, regenerated on install)
```

## Content Management

All portfolio content is managed through `/admin` — there is no need to touch code to update your profile, projects, skills, experience, education, certificates, or site settings. Sections with no content simply don't render on the public site.

## Deployment (Vercel)

1. Push this repository to GitHub (or your Git provider of choice).
2. Import the project into Vercel.
3. Add all environment variables from `.env.example` in the Vercel project's Settings → Environment Variables (use production values — a production Neon branch, a real `BETTER_AUTH_SECRET`, your Vercel Blob token, etc.).
4. Enable **Vercel Blob** storage for the project (Storage tab) and copy its token into `BLOB_READ_WRITE_TOKEN`.
5. Deploy. The `postinstall` script runs `prisma generate` automatically.
6. After the first deploy, run the migration against production once (locally, pointed at the production `DIRECT_URL`, or via a Vercel deployment hook):
   ```bash
   npm run db:deploy
   npm run db:seed
   ```
7. Visit `/admin/login` on your production URL and sign in with the admin credentials you configured.

## License

Private project — all rights reserved.
