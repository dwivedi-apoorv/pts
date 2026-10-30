-- First admin. Change the email before running if needed.
insert into public.members (email, full_name, role)
values ('apoorv.dwivedi@digirockettechnologies.com', 'Apoorv Dwivedi', 'admin')
on conflict (email) do nothing;
