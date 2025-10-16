# ⚡ Quick Setup Guide

## Step 1: Install Dependencies

```bash
bun install
```

## Step 2: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in project details and create

## Step 3: Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute

## Step 4: Get Your Credentials

1. Go to **Settings** > **API** in Supabase
2. Copy your **Project URL**
3. Copy your **anon public** key

## Step 5: Configure Environment

Create `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 6: Run the App

```bash
bun run dev
```

Visit http://localhost:3000 🎉

## Troubleshooting

### "Cannot find Supabase credentials"
- Make sure `.env.local` exists and has the correct keys
- Restart the dev server after creating `.env.local`

### "Error fetching guestlists"
- Check that you ran the SQL schema in Supabase
- Verify your credentials are correct
- Check Supabase project is active

### Database not working
- Go to Supabase SQL Editor
- Run the `supabase-schema.sql` file
- Check "Table Editor" to verify tables exist

Need help? Check the main README.md for more details! 