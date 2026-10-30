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

-- Admin audit log (no client access). The admin email is stored as text so the
-- log survives the admin's member row being deleted.
create table public.admin_audit (
  id bigint generated always as identity primary key,
  admin_member_id uuid references public.members(id) on delete set null,
  admin_email citext not null,
  action text not null,
  target_email citext,
  details jsonb,
  created_at timestamptz not null default now()
);
create index on public.admin_audit (created_at desc);

-- Row Level Security
alter table public.members            enable row level security;
alter table public.chapter_progress   enable row level security;
alter table public.course_position    enable row level security;
alter table public.self_check_results enable row level security;
alter table public.checklist_items    enable row level security;
alter table public.otp_requests       enable row level security;  -- no policies = no client access
alter table public.admin_audit        enable row level security;  -- no policies = no client access

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
