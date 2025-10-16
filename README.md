# 🎉 RocksList - Event Guestlist Management

A modern, beautiful event guestlist management app built with Next.js, featuring the vibrant NeoPop design aesthetic inspired by CRED.

## ✨ Features

- 🎨 **NeoPop Design**: Bold colors, dramatic shadows, and modern UI
- 📝 **Create Guestlists**: Easy event and guestlist creation
- 👥 **Guest Management**: Approve, reject, or manage guest registrations
- 🎫 **Guest Registration**: Simple registration flow for attendees
- 📊 **Real-time Stats**: Track approvals, pending requests, and capacity
- 🔄 **Active/Inactive Toggle**: Control when registrations are open
- 💾 **Supabase Backend**: Reliable cloud database storage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Supabase account (free tier works great!)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd rockslist-app
bun install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to **Settings** > **API**
3. Copy your **Project URL** and **anon/public key**

### 3. Create the Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql` and run it
3. This will create the `guestlists` and `guests` tables with proper indexes and security policies

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace with your actual Supabase credentials.

### 5. Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app! 🎊

## 📱 How to Use

### For Event Organizers

1. **Create a Guestlist**
   - Click "For Organizers" or "Create Guestlist"
   - Fill in event details (name, date, venue, capacity)
   - Submit to create your guestlist

2. **Manage Guests**
   - View all registrations in your dashboard
   - Filter by status (all, pending, approved, rejected)
   - Approve or reject guests with a single click
   - Toggle active/inactive to control registrations

3. **Share Registration Link**
   - Click "Share Registration Link" to copy the join URL
   - Share with potential guests via social media, email, etc.

### For Guests

1. **Register for an Event**
   - Click "Join Event"
   - Select the event you want to attend
   - Fill in your details (name, email, plus ones)
   - Submit and wait for organizer approval

## 🎨 NeoPop Design System

The app features a bold, modern design inspired by CRED's NeoPop aesthetic:

- **Colors**: Vibrant purple, yellow, green, pink accents
- **Shadows**: Dramatic 3D-style shadow effects
- **Typography**: Bold, uppercase headings with great hierarchy
- **Interactions**: Tactile button presses with shadow animations
- **Dark Theme**: Professional dark background throughout

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Custom NeoPop components + shadcn/ui
- **Icons**: Lucide React
- **Runtime**: Bun (or Node.js)

## 📁 Project Structure

```
rockslist-app/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── organizer/         # Organizer dashboard
│   ├── join/              # Guest registration
│   └── globals.css        # NeoPop theme styles
├── components/            # Reusable components
│   ├── neopop-button.tsx # Custom NeoPop button
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and logic
│   ├── store.ts          # Supabase data operations
│   ├── types.ts          # TypeScript types
│   ├── supabase.ts       # Supabase client
│   └── database.types.ts # Database schema types
└── supabase-schema.sql   # Database setup script
```

## 🔒 Security Notes

The current setup uses **public access policies** for quick development. For production:

1. Implement proper authentication (Supabase Auth)
2. Update RLS policies to restrict access based on user ownership
3. Add rate limiting for guest registrations
4. Validate email addresses
5. Consider adding CAPTCHA for public registration

## 🚢 Deployment

### Deploy to Vercel

```bash
vercel deploy
```

Don't forget to add your environment variables in Vercel's project settings!

### Deploy to Other Platforms

The app works on any Node.js hosting platform. Just ensure you:
1. Set the environment variables
2. Run `bun run build` (or `npm run build`)
3. Start with `bun run start` (or `npm start`)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this for your events!

---

Made with 💜 for event organizers everywhere. 