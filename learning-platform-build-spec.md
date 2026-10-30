# Learning Platform: Build Specification

A private, LMS-style learning site for the DigiRocket Technologies project management team. Each training module (a markdown file) becomes a course, each numbered chapter becomes a lesson, and each team member signs in with a one-time code (OTP) sent to their email. Only emails that already exist in the database can sign in.

This document is the full brief for Claude Code. Read all of it before writing code. Build in the phases listed in section 17 and check each phase's "done when" list before moving on.

---

## 1. Goals and non-goals

**Goals**

1. Turn the seven markdown training modules into courses with chapters, progress tracking and self-check knowledge checks.
2. Sign-in by emailed OTP only, restricted to emails in a `members` table that an admin controls.
3. Per-chapter progress, resume where you left off, and per-course completion percentages.
4. Self-scored knowledge checks built from each module's "Knowledge check" and "Answer guide".
5. Search across all courses, and one combined glossary.
6. An admin area to manage members and see team progress.
7. Markdown files stay the source of truth. Editing a `.md` file and redeploying updates the course.
8. Deploy on Vercel, with Supabase for authentication and data.

**Non-goals for version 1**

- Editing course content inside the app
- Payments, certificates, comments, discussion boards or multiple organisations
- Auto-graded multiple-choice quizzes (the knowledge checks are open-ended, see section 9)
- Native mobile apps (the site must work well in a mobile browser)

---

## 2. Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js, latest stable, App Router, TypeScript |
| Styling | Tailwind CSS, with `@tailwindcss/typography` for lesson text |
| Auth and database | Supabase (Auth with email OTP, Postgres with Row Level Security) |
| Supabase client | `@supabase/supabase-js` and `@supabase/ssr` |
| Markdown | `unified` pipeline: `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-slug`, `rehype-stringify`, or `react-markdown` with `remark-gfm` and `rehype-slug` |
| Search | `minisearch` (client-side, index built at build time) |
| Validation | `zod` |
| Tests | `vitest` |
| Hosting | Vercel |
| Email delivery | Custom SMTP configured in Supabase (for example Resend or Brevo), see section 5.6 |

Follow the Supabase "server-side auth with Next.js" guide for the installed Next.js version to set up the cookie-based session refresh (it is `middleware.ts` in some Next.js versions and `proxy.ts` in newer ones). Use whichever the installed version expects.

---

## 3. Source content

Seven markdown files are supplied alongside this spec. Copy them to `content/courses/`:

| Order | File | Course title | Role |
| --- | --- | --- | --- |
| 1 | `project-management-onboarding-module.md` | Project Management Team Onboarding | Start here: process, timelines, tools, ten services |
| 2 | `seo-basics-for-pms.md` | SEO Basics for Project Managers | Basics |
| 3 | `performance-marketing-basics-for-pms.md` | Performance Marketing Basics for Project Managers | Basics |
| 4 | `shopify-ecommerce-basics-for-pms.md` | Shopify and E-commerce Basics for Project Managers | Basics |
| 5 | `social-media-basics-for-pms.md` | Social Media Marketing Basics for Project Managers | Basics |
| 6 | `content-marketing-basics-for-pms.md` | Content Marketing Basics for Project Managers | Basics |
| 7 | `analytics-reporting-basics-for-pms.md` | Analytics and Reporting Basics for Project Managers | Basics |

Course metadata that is not in the markdown (slug, short description, order, badge) lives in `content/courses.config.ts`. Write a one-sentence description for each course, taken from the first paragraph of the file.

The markdown files will be edited by the owner over time (often after being round-tripped through Word). The parser must be tolerant and must fail the build with a clear message, naming the file and line, when it cannot understand a file.

---

## 4. Markdown structure the parser must understand

All seven files follow the same conventions.

**Document shape**

```
# Course title                      (exactly one, first line)
Intro paragraph(s)                  (before the first ##)
## 1. Chapter title                 (chapters; the number prefix is optional in the parser)
### Subheading                      (sections inside a chapter)
...
## N. Glossary and knowledge check  (last chapter in most files)
```

**Elements used**

- Headings `#`, `##`, `###`, sometimes `###` with numbers such as `### 2.1 Team and who to ask`
- Paragraphs with `**bold**` and `` `code` ``
- GFM tables (`| a | b |` with a separator row)
- Bullet lists, numbered lists, checkbox lists (`- [ ] item`)
- Blockquotes (`>`) and fenced code blocks
- Bold lines acting as sub-labels, for example `**Glossary**`, `**Knowledge check**`, `**Answer guide**`, `**Worked example**`

**Special structures (detect and render with custom components)**

1. **Glossary.** A bold line `**Glossary**` followed by a two-column table (`Term | Meaning`).
2. **Knowledge check.** A bold line `**Knowledge check**` followed by a numbered list of questions.
3. **Answer guide.** A bold line `**Answer guide**` followed by a numbered list whose numbers match the questions. The main onboarding module has a knowledge check **without** an answer guide. Treat the guide as optional.
4. **Client Q&A chapters.** Chapters whose title matches `/client questions/i`. Content is a series of `**N. Question text?**` lines, each followed by one or more answer paragraphs until the next numbered bold line. Render as an accordion (first item closed, "expand all" control). If parsing finds fewer than 3 questions, fall back to normal rendering.
5. **Checkbox lists.** Render each `- [ ]` item as an interactive checkbox whose state is saved per user (section 8.4).

**Chapter identity (important)**

Chapters get renumbered when content is added (this has already happened). So:

- The chapter **slug** is derived from the title **without** the leading number, for example `## 13. Data quality checks` becomes `data-quality-checks`.
- The displayed number comes from the chapter's position in the file, not from the number typed in the heading.
- Progress is stored against the slug. Renaming a chapter title resets its progress, which is acceptable and should be documented in `CONTENT.md`.
- If two chapters in one file produce the same slug, fail the build.

**Build-time content pipeline**

Write `scripts/build-content.ts`, run by the `prebuild` and `predev` npm scripts. It reads `content/courses/*.md` and writes `src/generated/content.json` containing, per course:

```ts
type Course = {
  slug: string; title: string; description: string; order: number; badge?: string;
  intro: string;                     // markdown before first ##
  chapters: Chapter[];
  glossary: { term: string; meaning: string }[];
  knowledgeCheck: { number: number; key: string; question: string; answer?: string }[];
  stats: { words: number; readingMinutes: number; chapterCount: number };
};
type Chapter = {
  slug: string; index: number; title: string;
  markdown: string;                  // body with glossary/knowledge-check blocks removed
  headings: { id: string; text: string; level: 2 | 3 }[];
  kind: 'standard' | 'qa' | 'glossary-check';
  qa?: { number: number; question: string; answerMarkdown: string }[];
  checklistItems?: { key: string; text: string }[];
  readingMinutes: number;
};
```

- Reading time is words divided by 200, rounded up, minimum 1.
- `key` for a knowledge check question is `${number}-${first 8 chars of a hash of the question text}`. For a checklist item it is a hash of the item text. This makes saved answers ignore edited questions instead of showing stale results.
- Also write `src/generated/search-index.json` (section 11) and a combined glossary list.
- Never place generated content under `public/`. The content is internal and must only be served to signed-in users.

---

## 5. Authentication: email OTP for registered members only

### 5.1 Rules

1. Sign-in is by a 6-digit one-time code sent to the person's email. No passwords, no magic links, no social logins.
2. Only emails present in the `members` table with `active = true` can sign in.
3. Emails are lower-cased and trimmed everywhere. Use the `citext` type in the database.
4. Admins add members. There is no public sign-up.
5. Deactivating a member blocks access immediately, even if they hold a valid session.

### 5.2 Sign-in flow

1. **`/login`**: one field, "Work email". On submit, call the server action `requestOtp(email)`.
2. `requestOtp`:
   1. Validate with `zod`.
   2. Apply the throttle (5.4).
   3. Look up `members` by email using the **service-role** client.
   4. **Not found or inactive:** if `REVEAL_UNREGISTERED=true` (default) return "This email is not registered. Please contact your administrator." Otherwise return the generic "If this email is registered, a code has been sent." Do **not** call Supabase to send anything.
   5. **Found:** make sure an `auth.users` record exists. If `members.auth_user_id` is null, create it with `supabase.auth.admin.createUser({ email, email_confirm: true })` and save the id on the member row. If the create call says the user already exists, look it up and save the id.
   6. Send the code with the normal server client: `supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } })`.
   7. Return success and move the UI to the code step.
3. **Code step** (same page, no navigation): six single-digit boxes (or one input with `inputmode="numeric"` and `autocomplete="one-time-code"`), paste support, auto-submit at six digits, "Resend code" button disabled for 60 seconds, "Use a different email" link.
4. Server action `verifyOtp(email, token)`:
   1. Validate input (six digits).
   2. `supabase.auth.verifyOtp({ email, token, type: 'email' })` using the SSR server client so the session cookies are set.
   3. Re-check that the member exists and is active. If not, sign out and show the not-registered message.
   4. Update `members.last_login_at`.
   5. Redirect to `/` (or the originally requested path, validated to be a relative path).
5. **Sign out**: button in the header calling `supabase.auth.signOut()` and redirecting to `/login`.

### 5.3 Session protection

- The session-refresh middleware/proxy protects every route except `/login`, static assets and the Next.js internals. Unauthenticated users are redirected to `/login?next=<path>`.
- Add a server helper `requireMember()` used in every page, layout section, server action and route handler that touches data. It returns `{ user, member }` or redirects. It re-reads `members` (with `active` and `role`) each request, so deactivation and role changes apply instantly.
- Add `requireAdmin()` that calls `requireMember()` and requires `role = 'admin'`.
- Never trust the client for role or membership.

### 5.4 Throttling and abuse limits

Create a table `otp_requests (id, email, ip, requested_at)`. In `requestOtp`:

- Max 1 request per email per 60 seconds
- Max 5 requests per email per hour
- Max 20 requests per IP per hour

Return a friendly message when throttled ("Please wait a minute before requesting another code"). Clean rows older than 24 hours with a scheduled Supabase job or on each request. Supabase also applies its own limits on verification attempts and email sending, so surface its errors politely.

### 5.5 Supabase dashboard configuration (document in README)

- Authentication, Providers: Email enabled, "Confirm email" on, **disable "Allow new users to sign up"** (extra safety, since users are created only by the app)
- Authentication, Email: **Email OTP length = 6**, **Email OTP expiry = 600 seconds**
- Authentication, URL configuration: set the Site URL to the Vercel production URL and add the preview and local URLs
- Email templates: edit both **Magic Link** and **Confirm signup** so the body shows the code and no link:

```html
<h2>Your sign-in code</h2>
<p>Use this code to sign in to {{ .SiteURL }}:</p>
<p style="font-size:28px;letter-spacing:6px;font-weight:bold">{{ .Token }}</p>
<p>The code expires in 10 minutes. If you did not request it, ignore this email.</p>
```

### 5.6 Email delivery

Supabase's built-in email sender is for testing only and has a very low hourly limit, so it is not usable for a team. Configure **custom SMTP** (Authentication, SMTP settings) with a provider such as Resend or Brevo, using a sender on the agency's own domain (for example `learn@your-domain.com`) with SPF and DKIM set up. Document this clearly in the README as a required setup step.

### 5.7 Edge cases to handle

- Wrong or expired code: show a clear message and allow a new code
- Member row exists but the auth user was deleted: recreate it
- Email in different letter case: always normalised
- User opens an old OTP email after requesting a newer one: show "That code is no longer valid"
- Admin changes a member's email: update `members.email`, and update the auth user's email through the admin API in the same server action

---

## 6. Database schema (Supabase SQL migration)

Create `supabase/migrations/0001_init.sql` with the following. Keep all tables in `public`.

```sql
create extension if not exists citext;

-- Members (the allow-list)
create table public.members (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  full_name text,
  role text not null default 'learner' check (role in ('learner','admin')),
  active boolean not null default true,
  auth_user_id uuid unique references auth.users(id) on delete set null,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

-- Chapter completion
create table public.chapter_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  chapter_slug text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_slug, chapter_slug)
);

-- Last position per course (for "Continue")
create table public.course_position (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  chapter_slug text not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_slug)
);

-- Knowledge-check self-assessment
create table public.self_check_results (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  question_key text not null,
  result text not null check (result in ('got_it','review')),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_slug, question_key)
);

-- Saved checkbox items inside lessons
create table public.checklist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  item_key text not null,
  checked boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_slug, item_key)
);

-- OTP throttling (no client access)
create table public.otp_requests (
  id bigint generated always as identity primary key,
  email citext not null,
  ip text,
  requested_at timestamptz not null default now()
);
create index on public.otp_requests (email, requested_at desc);
create index on public.otp_requests (ip, requested_at desc);

-- Row Level Security
alter table public.members            enable row level security;
alter table public.chapter_progress   enable row level security;
alter table public.course_position    enable row level security;
alter table public.self_check_results enable row level security;
alter table public.checklist_items    enable row level security;
alter table public.otp_requests       enable row level security;  -- no policies = no client access

create policy "read own member row" on public.members
  for select using (auth_user_id = auth.uid());

create policy "own chapter_progress" on public.chapter_progress
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own course_position" on public.course_position
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own self_check_results" on public.self_check_results
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own checklist_items" on public.checklist_items
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
```

Also create `supabase/seed.sql` with the first admin (the owner must change this email if needed):

```sql
insert into public.members (email, full_name, role)
values ('apoorv79@gmail.com', 'Apoorv', 'admin')
on conflict (email) do nothing;
```

Admin pages read other people's data through server code using the **service-role** client, after `requireAdmin()` passes. The service-role key must never reach the browser: use it only in files that import `server-only`.

---

## 7. Information architecture and routes

| Route | Who | Purpose |
| --- | --- | --- |
| `/login` | Public | Email, then OTP code |
| `/` | Member | Dashboard: "Continue learning", course cards with progress, recommended path |
| `/courses/[course]` | Member | Course overview: description, stats, chapter list with completion ticks, start/continue button |
| `/courses/[course]/[chapter]` | Member | Lesson reader |
| `/glossary` | Member | Combined searchable glossary |
| `/search` | Member | Full-page search (also a header search box and `Cmd/Ctrl+K` palette) |
| `/me` | Member | My progress summary across courses, and sign out |
| `/admin` | Admin | Team overview |
| `/admin/members` | Admin | Add, import, edit, deactivate members |
| `/admin/members/[id]` | Admin | One member's detailed progress |
| `/admin/export` | Admin | CSV download route handler |
| `/api/search-index` | Member | Returns the search index JSON (authenticated, not a public file) |

404 and error pages in the same visual style. All pages are server components by default, with small client components for interactive parts.

---

## 8. Learner features in detail

### 8.1 Dashboard (`/`)

- Greeting with the member's first name
- "Continue where you left off" card using `course_position` (course, chapter, a button)
- Course cards in the configured order, each with title, one-line description, chapter count, reading time, a progress bar and percentage, and a status chip: Not started, In progress, Completed
- The first course carries the badge "Start here". Show a "Suggested order" line: onboarding first, then the basics in any order

### 8.2 Course page

- Title, description, stats, overall progress
- Numbered chapter list with a tick for completed chapters, reading time per chapter and a "Resume" marker on the last visited chapter
- Button: "Start course" or "Continue"
- When all chapters are complete, show a completion message and link to the knowledge check chapter

### 8.3 Lesson reader

- Two-column layout on desktop: content (max width about 70 characters for text, tables can scroll horizontally) and a sticky "On this page" list built from `##` and `###` headings with scroll highlighting. On mobile, a collapsible "On this page" bar and a bottom bar with Previous, Mark complete, Next
- Typography via Tailwind Typography: comfortable line height, clear table styling with a header row, zebra rows, horizontal scroll on narrow screens
- Heading anchors (copyable links)
- Breadcrumbs: Courses, course title, chapter title
- Footer controls: **Mark as complete** (toggle) which also moves to the next chapter when marking complete, Previous and Next chapter links
- On opening a chapter, upsert `course_position`
- Keyboard: left and right arrows move between chapters when focus is not in an input
- Chapter kinds:
  - `standard`: rendered markdown
  - `qa`: accordion of client questions
  - `glossary-check`: any remaining text (for example the onboarding checklist), then the glossary table (searchable, with a term filter) and the self-check (section 9)

### 8.4 Checklists

Every `- [ ]` item renders as a real checkbox. Toggling saves to `checklist_items` (optimistic update, rollback and toast on failure). The first-two-weeks checklist in the onboarding module should show "x of y done" at its top.

### 8.5 Progress rules

- A course's percentage is completed chapters divided by total chapters
- Progress writes go through server actions that call `requireMember()` and use the user-scoped Supabase client, so RLS applies
- Mark-complete must be idempotent
- If a chapter disappears from the content after an edit, its saved progress is ignored in the percentage (compute only over chapters that exist)

---

## 9. Knowledge checks (self-assessment)

The knowledge checks are open-ended questions with a model answer, so they cannot be auto-marked. Build a **self-check** flow:

1. Show one question at a time (and an "All questions" list view).
2. A text box lets the learner type their own answer. This text is **not** saved (privacy and simplicity). Say so in small print.
3. A "Show answer guide" button reveals the model answer rendered as markdown. If a question has no guide (the onboarding module), skip the reveal step and show "Discuss this with your lead".
4. After the reveal, two buttons: **I got it** and **Need to review**. Save to `self_check_results` with the question key.
5. A summary bar shows "x got it, y to review, z not attempted" and a "Review the ones I missed" filter.
6. Admins see the same results per member (section 10). Make clear in the UI wording that this is self-reported.

Future upgrade (do not build now): rewrite questions as multiple choice for auto-scoring.

---

## 10. Admin area

All admin routes call `requireAdmin()` and use the service-role client in server-only modules.

**Team overview (`/admin`)**

- Summary tiles: active members, members who never logged in, average completion, courses completed in total
- A matrix: rows are members, columns are courses, cells show percentage with colour bands. Click a row to open the member detail page. Sort by name, last login or overall progress. Filter by role and active status
- A "Needs a nudge" list: members with no activity for 14 days and incomplete onboarding

**Members (`/admin/members`)**

- Table: name, email, role, active, last login, overall progress
- **Add member** form (name, email, role). Creating the row should also pre-create the auth user (as in 5.2) so the first sign-in works
- **Bulk import**: paste or upload CSV with columns `email,full_name,role`. Validate, show a preview with errors (invalid email, duplicates), then confirm
- Edit name, role, email
- Deactivate and reactivate. Deactivating also bans the auth user through the admin API (`ban_duration`) and revokes sessions; reactivating lifts the ban
- Delete member (confirmation dialog) which also deletes the auth user and their progress
- Guard rails: an admin cannot deactivate, demote or delete themselves, and the last active admin cannot be removed

**Member detail (`/admin/members/[id]`)**

- Per-course progress bars and per-chapter completion list with dates
- Self-check results per course (got it, review, not attempted, counts)
- Last login and last activity

**Export (`/admin/export?type=progress|selfcheck`)**

- CSV download of the progress matrix or the self-check results

Log admin actions (add, edit, deactivate, delete, import) to an `admin_audit` table (admin member id, action, target email, timestamp, details). Add it to the migration.

---

## 11. Search and glossary

**Search**

- At build time create one search record per `###` section and per chapter intro: `{ id, courseSlug, courseTitle, chapterSlug, chapterTitle, headingId, heading, text }`
- `/api/search-index` returns the JSON only to signed-in members (call `requireMember()`; cache with a private `Cache-Control` header). The client loads it lazily on first search and builds a MiniSearch index with prefix and fuzzy matching, boosting heading text over body text
- Results show the course, chapter, heading and a snippet with the matched terms highlighted, and link directly to the heading anchor
- `Cmd/Ctrl+K` opens a command palette with the same search. `/search?q=` shows full results grouped by course

**Glossary**

- Combine all glossary tables from all courses. Group by term, showing each course's meaning. If the same term has identical meaning text in several courses, show it once with all the course names
- A–Z jump bar, a search box and a course filter
- Each entry links to its course's glossary section

---

## 12. Design and UX

- Clean, calm, readable. Neutral background, one accent colour, generous spacing. Brand text from `NEXT_PUBLIC_APP_NAME` (default "DigiRocket Technologies")
- Fully responsive, tested at 375 px width. No horizontal page scroll (tables scroll inside their own wrapper)
- Dark mode following the system setting
- Accessible: semantic landmarks, visible focus rings, labels for all inputs, colour contrast of at least 4.5 to 1, keyboard operable accordion and palette, `prefers-reduced-motion` respected
- Print stylesheet for lessons (hide navigation, keep tables readable)
- Loading skeletons for dashboards and admin tables; clear error and empty states
- Use a good readable font pair (for example Inter for UI and a readable sans for lessons); do not use browser defaults

---

## 13. Security checklist

- RLS enabled on every table (section 6). The anon key can only touch the user's own rows
- Service-role key only in server-only code and Vercel environment variables, never in `NEXT_PUBLIC_*`
- All mutations are server actions or route handlers that call `requireMember()` or `requireAdmin()` first and validate input with `zod`
- OTP throttling (5.4); uniform timing for found and not-found emails where practical
- Redirect targets (`next`) must be relative paths starting with `/` and not `//`
- Security headers in `next.config`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a sensible Content-Security-Policy
- Sanitise rendered markdown (no raw HTML from content, or sanitise with `rehype-sanitize`)
- Course content is never placed under `public/` and is only returned to authenticated users
- No analytics or third-party trackers in version 1
- Do not log OTP codes or full emails in server logs

---

## 14. Environment variables

| Name | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client and server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client and server | The public anon (publishable) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Secret. Used for member lookup, admin pages, auth user creation |
| `NEXT_PUBLIC_APP_NAME` | Client and server | Default `DigiRocket Technologies` |
| `NEXT_PUBLIC_SITE_URL` | Client and server | Production URL |
| `REVEAL_UNREGISTERED` | Server | `true` shows "not registered"; `false` shows the generic message |

Provide `.env.example` with all names and no values.

---

## 15. Project structure

```
learning-platform/
  content/
    courses/*.md
    courses.config.ts
  scripts/
    build-content.ts
  src/
    app/
      (auth)/login/page.tsx
      (app)/layout.tsx              header, search, user menu
      (app)/page.tsx                dashboard
      (app)/courses/[course]/page.tsx
      (app)/courses/[course]/[chapter]/page.tsx
      (app)/glossary/page.tsx
      (app)/search/page.tsx
      (app)/me/page.tsx
      (app)/admin/...               overview, members, member detail
      api/search-index/route.ts
      api/admin/export/route.ts
    components/                     ProgressBar, ChapterNav, TOC, QaAccordion,
                                    GlossaryTable, SelfCheck, Checklist, SearchPalette, ...
    lib/
      supabase/{server,client,admin}.ts   (admin.ts imports 'server-only')
      auth.ts                       requireMember, requireAdmin
      content.ts                    typed access to generated JSON
      progress.ts                   queries and server actions
      validation.ts                 zod schemas
    generated/                      content.json, search-index.json (gitignored)
  supabase/
    migrations/0001_init.sql
    seed.sql
  tests/
  README.md
  CONTENT.md
  .env.example
```

---

## 16. Documentation to produce

**README.md** must cover, step by step:

1. Create a Supabase project
2. Run `supabase/migrations/0001_init.sql` and `seed.sql` in the SQL editor (or with the CLI)
3. Configure Auth settings and email templates (5.5)
4. Set up custom SMTP and DNS records for the sender domain (5.6)
5. Copy `.env.example` to `.env.local` and fill the values
6. Run locally: `npm install`, `npm run dev`
7. Deploy on Vercel: import the repo, add the environment variables, deploy, then set the Supabase Site URL to the Vercel URL
8. How to add the first members (SQL seed, then the admin screen)
9. How to update a course (replace the `.md` file, commit, redeploy)

**CONTENT.md** must tell the author how to edit the markdown safely: one `#` title, chapters as `##`, optional number prefix, the exact bold labels `**Glossary**`, `**Knowledge check**`, `**Answer guide**`, numbering rules for the Q&A (`**N. Question?**`), what happens when a chapter title changes (progress resets), and how to preview locally.

---

## 17. Build phases for Claude Code

**Phase 0: Scaffold.** Create the Next.js project, Tailwind, ESLint, Prettier, vitest, folder structure, `.env.example`.
*Done when:* `npm run dev` shows a placeholder page and `npm test` runs.

**Phase 1: Content pipeline.** Copy the seven files, write `courses.config.ts` and `scripts/build-content.ts`, generate `content.json`, the search index and the glossary list. Write parser tests against the real files.
*Done when:* the tests in section 18 pass and a bad file produces a readable error.

**Phase 2: Auth and database.** Migration, seed, Supabase clients, middleware/proxy, `/login` with the two-step OTP flow, `requireMember`, throttling, sign out.
*Done when:* a seeded email can sign in with a code, an unknown email cannot, a deactivated member is locked out, and all routes redirect to `/login` when signed out.

**Phase 3: Learner UI.** Dashboard, course page, lesson reader with TOC, Q&A accordion, glossary-check chapter, responsive layout, dark mode.
*Done when:* all seven courses render fully, tables and checklists look right on a 375 px screen.

**Phase 4: Progress and self-check.** Mark complete, resume position, checklist persistence, self-check flow, progress calculations.
*Done when:* progress survives a reload and a new sign-in, and RLS prevents reading another member's rows (test it).

**Phase 5: Search and glossary.** Search API, palette, search page, combined glossary.
*Done when:* searching "ROAS", "backlink" or "reconciliation" finds the right sections across courses.

**Phase 6: Admin.** Overview matrix, members CRUD, CSV import, member detail, export, audit log, guard rails.
*Done when:* an admin can add a member, that member can sign in with a code, and their progress appears in the matrix.

**Phase 7: Polish and release.** Accessibility pass, print styles, security headers, README and CONTENT docs, `next build` clean, Lighthouse accessibility score of 90 or more on key pages.
*Done when:* every acceptance criterion in section 19 passes.

Commit after each phase with a clear message.

---

## 18. Tests

**Parser tests (vitest, run against the real files in `content/courses/`)**

| Course | Expected chapters |
| --- | --- |
| Project Management Team Onboarding | 10 |
| SEO Basics | 13 |
| Performance Marketing Basics | 13 |
| Shopify and E-commerce Basics | 15 |
| Social Media Marketing Basics | 15 |
| Content Marketing Basics | 15 |
| Analytics and Reporting Basics | 17 |

These counts are today's counts. Make the test read the expected number from a small fixture file so it is easy to update when a course changes.

Also assert:

- Every course has a unique slug and unique chapter slugs, and a non-empty glossary
- Each course with an answer guide has equal numbers of questions and answers. The onboarding module has 10 questions and no answer guide
- Analytics has 30 client Q&A items; every course's Q&A chapter parses at least 20
- Checklist items are found in the onboarding module's chapter 10
- Tables survive rendering (count `<table>` elements per course against the markdown)
- A renumbered chapter heading (change `## 13.` to `## 14.` in a fixture) keeps the same slug

**Auth and data tests**

- `requestOtp` for an unknown email never calls the Supabase send function
- Throttle limits are enforced
- `requireMember` rejects inactive members
- RLS: user A cannot select or modify user B's `chapter_progress` rows (integration test against a local Supabase or a documented manual test)
- The `next` redirect parameter rejects absolute and protocol-relative URLs

**Manual end-to-end checklist** in the README: sign in, complete a chapter, reload, check the dashboard percentage, answer a self-check question, add a member as admin, sign in as that member, deactivate them, confirm they are locked out.

---

## 19. Acceptance criteria

1. Only emails in `members` with `active = true` can receive a code and sign in. Everyone else is refused with no email sent.
2. Sign-in uses a 6-digit emailed code with a 10-minute expiry; resend has a 60-second cooldown.
3. All seven modules appear as courses with correct chapters, tables, bold labels and checklists.
4. Chapter completion, last position, checklist ticks and self-check results are saved per user and survive reloads and new sign-ins.
5. Renumbering chapters in a markdown file does not reset anyone's progress.
6. Search finds content across all courses and links to the exact section.
7. The combined glossary lists all terms, with course filters.
8. Admin can add, import, edit, deactivate and delete members, view team progress and export CSV. Admin guard rails work.
9. No course content or service-role key is reachable without a valid session.
10. The site is usable on a phone, passes basic accessibility checks and builds cleanly on Vercel.

---

## 20. Possible later additions (do not build now)

- Multiple-choice quizzes with automatic scoring
- Completion certificates (PDF)
- Reminders by email for unfinished courses
- Personal notes per chapter
- Admin-assigned courses and due dates
- In-app content editing backed by the database
