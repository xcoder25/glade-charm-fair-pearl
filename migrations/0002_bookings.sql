create table if not exists bookings (
  id text primary key,
  name text not null,
  phone text not null,
  email text not null default '',
  session text not null,
  note text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_created_at_idx on bookings (created_at desc);
create index if not exists bookings_session_idx on bookings (session);

create table if not exists admins (
  user_id text primary key,
  created_at timestamptz not null default now()
);
