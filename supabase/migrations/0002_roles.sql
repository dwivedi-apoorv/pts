-- Roles and course assignment.
-- A member has at most one role. A role is assigned a set of courses. Courses can
-- also be flagged "for everyone". Admins always see every course.
-- Run this once in the Supabase SQL editor (after 0001_init.sql).

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz not null default now()
);
create unique index roles_name_unique on public.roles (lower(name));

create table public.role_courses (
  role_id uuid not null references public.roles(id) on delete cascade,
  course_slug text not null,
  primary key (role_id, course_slug)
);

create table public.course_settings (
  course_slug text primary key,
  for_everyone boolean not null default false
);

alter table public.members
  add column role_id uuid references public.roles(id) on delete set null;
create index on public.members (role_id);

-- Server-only tables: RLS on and no policies, so the anon key cannot read or write them.
-- The app reads and writes them with the service-role key, after requireMember() or requireAdmin().
alter table public.roles           enable row level security;
alter table public.role_courses    enable row level security;
alter table public.course_settings enable row level security;
