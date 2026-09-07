create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  image_url text,
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists fashion_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists forum_posts (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  id text primary key,
  banner_images jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table articles enable row level security;
alter table products enable row level security;
alter table fashion_items enable row level security;
alter table forum_posts enable row level security;
alter table site_settings enable row level security;
alter table admin_users enable row level security;

create policy "Public can read published articles"
  on articles for select using (published = true);

create policy "Public can read products"
  on products for select using (true);

create policy "Public can read fashion items"
  on fashion_items for select using (true);

create policy "Public can read forum posts"
  on forum_posts for select using (true);

create policy "Public can read site settings"
  on site_settings for select using (true);

create policy "Admins can read admin users"
  on admin_users for select using (auth.email() = email);