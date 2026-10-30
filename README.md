# DigiRocket Technologies learning platform

A private, LMS-style learning site for the project management team. Each markdown file in
`content/courses/` becomes a course, each numbered chapter becomes a lesson, and each team member signs in
with a one-time code sent to their email. Only emails that an admin has added can sign in.

- **Stack:** Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui, Supabase (Auth and Postgres with Row Level Security), Resend (sign-in emails), MiniSearch, Vitest.
- **Content:** the markdown files are the source of truth. Edit a file, commit, redeploy. See [CONTENT.md](CONTENT.md).
- **Hosting:** Vercel.

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run, in order:
   1. [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql): tables, indexes and Row Level Security.
   2. [`supabase/seed.sql`](supabase/seed.sql): creates the first admin. **Edit the email in this file first** if the admin is not `apoorv79@gmail.com`.
3. Open **Authentication** and configure:
   - **Sign In / Providers, Email:** enabled. **Turn off "Allow new users to sign up"** (extra safety: accounts are created only by the app).
   - **Email OTP length:** `6`. **Email OTP expiry:** `600` seconds.
   - **URL Configuration:** set **Site URL** to your Vercel production URL, and add your preview URL pattern and `http://localhost:3000` to **Redirect URLs**.
   - Supabase's email templates and SMTP settings are **not used**. The app asks Supabase for a code and emails it itself through Resend (next step).
4. **Project Settings, API:** copy the project URL, the `anon` key and the `service_role` key.

## 2. Set up Resend (sign-in emails)

1. Create a [Resend](https://resend.com) account and add your sending domain under **Domains**.
2. Add the DNS records Resend shows (SPF, DKIM) at your DNS host and wait until the domain says **Verified**. Until then Resend only delivers to your own address.
3. Create an API key under **API Keys**.
4. You will use the key as `RESEND_API_KEY`, and a sender on the verified domain as `EMAIL_FROM`, for example `DigiRocket Technologies <learn@your-domain.com>`.

## 3. Configure and run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key. Safe for the browser; Row Level Security protects the data |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret.** Server only. Used for member lookup, admin pages and creating sign-in accounts |
| `RESEND_API_KEY` | **Secret.** Server only |
| `EMAIL_FROM` | Sender on your verified Resend domain |
| `NEXT_PUBLIC_APP_NAME` | Brand text. Defaults to `DigiRocket Technologies` |
| `NEXT_PUBLIC_SITE_URL` | Production URL |
| `REVEAL_UNREGISTERED` | `true` (default) shows "This email is not registered"; `false` shows a generic message |

`.env.local` is git-ignored. Never put real values in `.env.example`, and never prefix a secret with `NEXT_PUBLIC_`.

Sign in with the seeded admin email. The code arrives by email and expires after 10 minutes.

## 4. Deploy on Vercel

1. Push the repository to GitHub and **import** it in Vercel (framework: Next.js, no custom settings).
2. Add every variable from the table above under **Settings, Environment Variables** (Production and Preview).
3. Deploy.
4. Copy the production URL into Supabase **Authentication, URL Configuration, Site URL**.

The build runs `scripts/build-content.ts` first (`prebuild`). If a markdown file is malformed the build fails with the file name and line.

## 5. Add members

- **First admin:** the row in `supabase/seed.sql`.
- **Everyone else:** sign in as an admin, open **Admin, Members**, then **Add member**, or **Import CSV** (`email,full_name,role`; paste or upload, check the preview, confirm).
- **Deactivate** blocks access immediately and reversibly. **Delete** removes the member and all of their progress.
- You cannot deactivate, demote or delete yourself, and the last active admin cannot be removed.

## 6. Update a course

Replace or edit the file in `content/courses/`, commit and redeploy. To add a new course, also add an entry to
[`content/courses.config.ts`](content/courses.config.ts). Read [CONTENT.md](CONTENT.md) first: renaming a chapter title resets its saved progress.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Build content, then start the dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm test` | Build content, then run the Vitest suite |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run build:content` | Regenerate `src/generated/*.json` from the markdown |

## Tests

`npm test` covers the content parser against the real course files, search and glossary, the sign-in throttle,
`requireMember`, the progress and admin server actions, guard rails, CSV handling and a static check that every table has Row Level Security.

**Row Level Security against a live database (optional).** Use a throwaway Supabase project, never production. Run the migration, then:

```bash
SUPABASE_TEST_URL=... SUPABASE_TEST_ANON_KEY=... SUPABASE_TEST_SERVICE_KEY=... npm test
```

This creates two temporary users, checks that user B cannot read, change, delete or insert user A's rows, and deletes both users. Without these variables those three tests are skipped.

**Manual end-to-end checklist**

1. Sign in with a code from your email. An unknown email is refused and nothing is sent.
2. Open a course, mark a chapter complete (it moves to the next chapter). Reload: the tick and the course percentage persist.
3. Tick two onboarding checklist items, reload, and confirm "2 of 8 done".
4. Answer a self-check question: show the guide, choose "Need to review", reload, and confirm the summary persists.
5. Press `Ctrl/Cmd+K`, search `ROAS`, open a result, and check it lands on the right section.
6. As admin, add a member. Sign in as that member (a second browser profile).
7. Complete a chapter as the member and confirm their percentage appears in **Admin, Overview**.
8. Deactivate the member. Reload their session: they are sent to the login page and cannot sign in again.

## Security notes

- Row Level Security is on for every table. The anon key can only touch the signed-in user's own rows. `otp_requests` and `admin_audit` have no client access at all.
- The service-role key is used only in files that import `server-only`, and never reaches the browser.
- Every server action and route handler calls `requireMember()` or `requireAdmin()` first, validates input with zod, and (for progress) checks the course, chapter or question against the real content. The user id comes from the session, never from the client.
- `requireMember()` re-reads the member row on every request, so deactivation and role changes apply immediately.
- Sign-in codes are throttled: 1 per email per minute, 5 per email per hour, 20 per IP per hour.
- Course content is never placed in `public/`. The search index is served only to signed-in members.
- Markdown is rendered without raw HTML. Response headers include a Content Security Policy, `X-Frame-Options: DENY`, `nosniff`, a strict referrer policy and HSTS. The site asks search engines not to index it.
- No analytics or third-party trackers. OTP codes and full email addresses are not logged.
- Every admin add, edit, deactivate, delete, import and export is written to `admin_audit`.

## Known limits

- The Supabase JS admin API cannot revoke a user's existing sessions by user id. Deactivation bans the sign-in account (so sessions cannot be refreshed) and `requireMember()` blocks every page and action at once.
- The admin overview loads every member's progress in one go. That is fine for a team, not for thousands of members.
- Knowledge checks are self-scored. Typed answers are not saved.
- Multiple-choice auto-scoring, certificates, reminder emails, notes and in-app editing are intentionally out of scope for version 1.

## Troubleshooting

- **"We could not send the code right now":** check `RESEND_API_KEY`, that `EMAIL_FROM` is on a verified domain, and the Resend dashboard logs.
- **Code arrives but is rejected:** codes expire after 10 minutes, and a newer code invalidates the older one. Check Supabase **Email OTP length** is `6`.
- **Everyone is sent to the login page:** check the three Supabase variables and that the Site URL matches the deployed URL.
- **A markdown edit breaks the build:** the message names the file and line. See [CONTENT.md](CONTENT.md).

## Project layout

```
content/courses/*.md       the seven course files (source of truth)
content/courses.config.ts  slug, order, badge, description per course
scripts/build-content.ts   markdown -> src/generated/*.json (git-ignored)
src/app/                   routes: (auth)/login, (app)/..., api/search-index
src/components/            UI (ui/ is shadcn)
src/lib/                   auth, content parser, progress, search, admin logic
supabase/                  migration and seed SQL
tests/                     Vitest suite
```

The Next.js version in this repo has breaking changes from older releases (for example `middleware.ts` is `proxy.ts`).
Read `node_modules/next/dist/docs/` before changing framework-level code.
