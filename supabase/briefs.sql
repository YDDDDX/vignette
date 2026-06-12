create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  mode text,
  mode_name text,
  brand text,
  platform text,
  style text,
  quantity integer,
  summary text,
  form_json jsonb not null default '{}'::jsonb,
  brief_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.briefs enable row level security;

drop policy if exists briefs_select_own on public.briefs;
create policy briefs_select_own
  on public.briefs for select
  using (auth.uid() = user_id);

drop policy if exists briefs_insert_own on public.briefs;
create policy briefs_insert_own
  on public.briefs for insert
  with check (auth.uid() = user_id);

drop policy if exists briefs_update_own on public.briefs;
create policy briefs_update_own
  on public.briefs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists briefs_delete_own on public.briefs;
create policy briefs_delete_own
  on public.briefs for delete
  using (auth.uid() = user_id);
