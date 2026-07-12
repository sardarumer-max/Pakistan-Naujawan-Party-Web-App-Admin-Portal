# PNP Admin Dashboard - Master Build Prompt

You are my Senior Full Stack Engineer.

You are responsible for converting the provided prototype into a COMPLETE production-ready React + Supabase Admin Dashboard.

## Project Goal

Build a fully functional Admin Dashboard using:

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Supabase
- React Hook Form
- Zod
- Lucide React
- Recharts
- Framer Motion
- Sonner

Everything must be responsive.

## Design Rules

- Use the uploaded prototype as the ONLY design reference.
- Do NOT redesign anything.
- Match spacing, colors, typography, shadows, border radius, navigation, cards, tables, animations and layout as closely as possible.
- Treat the HTML/React prototype as the source of truth.

## Backend

- Backend already exists.
- Read every uploaded document before writing code.
- Do NOT change database schema.
- Do NOT rename tables or columns.
- Do NOT invent APIs.

## Supabase

I will provide:

- SUPABASE_URL
- SUPABASE_ANON_KEY
- SERVICE_ROLE_KEY

Connect the entire project to Supabase.

All CRUD operations must work.

## Database

Use every existing table exactly as documented.

Respect relationships, foreign keys and RLS.

## Features

Implement:

- Dashboard
- Users
- Admins
- Roles
- Permissions
- Notifications
- Settings

Implement every portal:

- PNP Saathi
- Rozgar
- Pakistan Problems
- Naujawan Voice
- Skill Pakistan
- Kisaan Portal
- Mahfooz
- Qaanoon
- Emergency Network
- Youth Business Hub
- Naujawan TV
- Transparency Hub

Each module must support:

- Search
- Filters
- Sorting
- Pagination
- Create
- Read
- Update
- Delete
- Bulk Actions
- CSV Export
- Excel Export
- Loading States
- Empty States
- Error Handling
- Realtime Updates
- Confirmation Dialogs

## Authentication

Implement secure Supabase authentication.

Support:

- Super Admin
- Admin
- Moderator
- Viewer

Protect every route.

## State Management

Use TanStack Query.

Implement proper caching and cache invalidation.

## Forms

Use React Hook Form with Zod validation.

## Folder Structure

Create a production-ready architecture such as:

```text
src/
  components/
  layouts/
  pages/
  modules/
  hooks/
  services/
  supabase/
  contexts/
  providers/
  routes/
  types/
  utils/
  constants/
```

## Services

Create one service per database table.

Example:

- users.service.ts
- complaints.service.ts
- jobs.service.ts
- ideas.service.ts
- videos.service.ts

## Components

Build reusable components:

- Sidebar
- Navbar
- DataTable
- SearchBar
- Pagination
- Stats Cards
- Modal
- Drawer
- Dropdown
- Confirmation Dialog
- Delete Dialog
- Loading Skeleton
- Empty State

## Edge Functions

Read the backend documentation.

Implement every Supabase Edge Function exactly as documented.

Do not modify endpoints or payloads.

## Code Quality

- No dummy data.
- No fake APIs.
- No placeholders.
- No TODOs.
- No simplified implementations.

Everything must be connected to Supabase.

## Output Rules

Generate complete production-ready source code.

Do not stop after one module.

Automatically continue until the complete admin panel is finished.

Do not ask for permission between modules.

## Success Criteria

After adding environment variables, the project should work with:

```bash
npm install
npm run dev
```

The application must closely match the uploaded prototype while using the existing Supabase backend.
