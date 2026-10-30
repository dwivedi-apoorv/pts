-- OPTIONAL. Marks the company-wide courses as "for everyone" in one go, so you do not
-- have to tick them one by one in Admin, Roles. Run after 0002_roles.sql.
-- Safe to run more than once. Remove any line for a course you want to assign by role instead.
insert into public.course_settings (course_slug, for_everyone) values
  ('cyber-security-basics', true),
  ('posh-awareness', true),
  ('code-of-conduct', true),
  ('data-privacy', true),
  ('it-and-ai-use', true),
  ('speaking-up', true),
  ('hr-policies', true),
  ('social-media-communication', true),
  ('health-safety-wellbeing', true),
  ('business-continuity', true),
  ('expense-and-travel', true),
  ('culture-and-values', true)
on conflict (course_slug) do update set for_everyone = excluded.for_everyone;
