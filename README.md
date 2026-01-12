# GenBots Platformheelo

A production-ready SaaS-grade portfolio and admin platform for GenBots - an IoT education & innovation company.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Supabase Setup](#supabase-setup)
- [Local Development](#local-development)
- [Admin Credentials](#admin-credentials)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Public Pages
- **Home** - Hero, program highlights, stats, CTAs
- **About** - Mission, vision, timeline, partnerships
- **Programs** - IoT, Robotics, Drones, Python, AI-IoT curriculum
- **Projects** - Student project gallery with filtering
- **Why GenBots** - Benefits, pedagogy, testimonials
- **Contact** - Inquiry form with validation

### Admin Panel
- Secure authentication (email/password)
- Dashboard with stats overview
- Projects CRUD with image upload
- Team members management
- Contact queries view and status tracking

### Technical Features
- Dark futuristic UI with neon accents
- Framer Motion animations
- Responsive design (mobile/tablet/desktop)
- Server Actions (no public API routes)
- Row Level Security
- Image upload to Supabase Storage

## 🛠 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gen-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see below)

4. **Run development server**
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project dashboard:
1. Go to [supabase.com](https://supabase.com) → Your Project
2. Navigate to **Settings** → **API**
3. Copy **Project URL** and **anon public** key

## 🗄 Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Fill in project details and create

### 2. Run Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy contents of `supabase/schema.sql`
3. Paste and click **Run**

This creates:
- `projects` table
- `team_members` table
- `contact_queries` table
- Row Level Security policies
- Storage bucket for images

### 3. Create Storage Bucket

The schema automatically creates an `images` bucket. If needed manually:

1. Go to **Storage** in Supabase dashboard
2. Click **Create a new bucket**
3. Name: `images`
4. Enable **Public bucket**

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Visit `http://localhost:3000` for the public site.
Visit `http://localhost:3000/admin/login` for admin panel.

## 👤 Admin Credentials

### Create an Admin User

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add user** → **Create new user**
4. Enter email and password
5. Click **Create user**

Or use Supabase CLI:
```bash
npx supabase auth create-user --email admin@genbots.edu --password your-secure-password
```

**Default test credentials** (create these):
- Email: `admin@genbots.edu`
- Password: `your-secure-password`

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Click **Add New** → **Project**

4. Import your repository

5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

6. Click **Deploy**

### Post-Deployment

1. Update Supabase auth settings:
   - Go to **Authentication** → **URL Configuration**
   - Add your Vercel URL to **Site URL**
   - Add to **Redirect URLs**: `https://your-domain.vercel.app/**`

## 🔧 Troubleshooting

### Common Issues

**"Invalid API key" error**
- Double-check your `.env.local` values
- Ensure no trailing spaces in API keys
- Restart the dev server after changing env vars

**Admin login not working**
- Verify you created a user in Supabase Auth
- Check the email confirmation settings
- Try resetting the password in Supabase dashboard

**Images not uploading**
- Ensure the `images` storage bucket exists
- Check bucket is set to public
- Verify storage policies are applied

**Middleware redirect loop**
- Clear browser cookies
- Check Supabase URL is correct
- Verify auth token is being set

**Build errors**
- Run `npm install` to ensure all deps are installed
- Check for TypeScript errors: `npm run lint`
- Clear `.next` folder: `rm -rf .next`

### Getting Help

1. Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
2. Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
3. Open an issue in the repository

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── programs/
│   │   ├── projects/
│   │   ├── why-genbots/
│   │   ├── layout.tsx
│   │   └── page.tsx       # Home page
│   ├── admin/             # Admin panel
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── projects/
│   │   ├── queries/
│   │   ├── team/
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
├── actions/               # Server Actions
├── components/
│   ├── layout/            # Navbar, Footer, etc.
│   └── ui/                # Reusable UI components
├── lib/
│   ├── supabase/          # Supabase clients
│   └── database.types.ts  # TypeScript types
├── store/                 # Zustand stores
└── middleware.ts          # Auth middleware
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ for GenBots
