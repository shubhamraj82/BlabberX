# BlabberX

BlabberX is a modern real-time communication app built with Next.js, Convex, Clerk, and Stream (Chat + Video).  
It combines instant messaging, group chats, user discovery, and one-click video calls in a responsive UI.

## Live Demo

[https://blabberx-5v18dwuan-shubhamraj82s-projects.vercel.app](https://blabberx-5v18dwuan-shubhamraj82s-projects.vercel.app)

## What You Will Learn

### Modern Tech Stack Mastery
- **Next.js (App Router) + TypeScript**: File-based routing, client/server boundaries, and production app structure.
- **Convex**: Reactive queries/mutations and schema-based data modeling.
- **Clerk**: Authentication, session-aware UI, and protected signed-in experience.
- **Stream Chat & Video**: Real-time chat channels, message threads, and video calling flow.
- **Tailwind CSS**: Utility-first styling for responsive, modern interfaces.

### Core Features You Will Build
- **User authentication**: Sign up, sign in, and user-aware UI via Clerk.
- **Real-time messaging**: Persistent Stream channels with live message updates.
- **Group chats**: Create 1:1 or group conversations with member selection and optional group name.
- **HD video calls**: One-click video room join with shareable call link.
- **User search**: Search users synced into Convex and start new chats quickly.
- **Responsive design**: Sidebar-based dashboard and mobile-friendly layout behavior.

### Advanced Development Concepts
- **Real-time data sync**: Debounced user search with reactive Convex queries.
- **Authentication flow**: Clerk identity + signed-in layout + user sync lifecycle.
- **Client-server architecture**: Next.js server action token generation with client SDK usage.
- **Token-based security**: Stream user token generation per authenticated user.
- **Database design**: Convex schema and indexed user table for fast lookups.
- **State management**: Complex UI states for chat/channel/call lifecycle and loading/error handling.

### Production-Ready Skills
- **Deployment**: Vercel deployment with environment variable configuration.
- **Performance**: Debounced search, selective channel lookups, and real-time SDK patterns.
- **Error handling**: Explicit loading/error states for sync and call initialization.
- **Security**: Secret-key separation and authenticated token generation workflow.

## Features Implemented in This Codebase

- Landing page with product messaging and auth CTAs.
- Clerk-powered auth integrated at root layout level.
- Signed-in dashboard layout using Stream `Chat` + custom sidebar.
- New chat flow:
  - Search users (Convex-backed),
  - Select one or many users,
  - Auto-reuse existing 1:1 channels,
  - Create new group channels.
- Real-time channel list filtered by current user membership.
- Chat workspace with message list, composer, threads, leave-chat action.
- Video call route per channel id with:
  - Stream Video client initialization,
  - token provider from server action,
  - join/leave lifecycle handling,
  - waiting overlay and invite link copy.

## Tech Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Database / Backend**: Convex
- **Chat**: Stream Chat (`stream-chat`, `stream-chat-react`)
- **Video**: Stream Video (`@stream-io/video-react-sdk`)
- **UI**: Tailwind CSS, custom UI components, Lucide icons

## Project Structure

```txt
blabberx/
  app/
    (signed-in)/
      dashboard/
        video-call/[id]/
  components/
    ui/
  convex/
    schema.ts
    users.ts
  hooks/
  actions/
  lib/
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=

CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CONVEX_SITE_URL=

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_API_SECRET_KEY=
```

Important:
- Never commit real secret values to git.
- If any secret was exposed previously, rotate it before deploying.

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

- Add all required values in `.env.local`.
- Ensure Clerk, Convex, and Stream projects are correctly configured.

### 3) Run Convex (if needed for local dev)

```bash
npx convex dev
```

### 4) Start the Next.js app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start development server (Turbopack).
- `npm run build` - Build for production.
- `npm run start` - Start production server.
- `npm run lint` - Run ESLint.

## How Key Flows Work

### Auth + User Sync
1. User authenticates via Clerk.
2. Signed-in layout mounts `UserSyncWrapper`.
3. User is upserted into Convex (`users` table).
4. Stream chat client connects using token from server action.

### Chat Creation
1. User opens "Start New Chat".
2. User search runs against Convex query (`users.allUsers`).
3. For 1:1, existing channel is reused when found.
4. Otherwise, a new Stream channel is created and watched.

### Video Call
1. User opens `/dashboard/video-call/[id]`.
2. Stream Video client is initialized for the authenticated user.
3. Token is fetched server-side (`createToken` action).
4. Call is joined/created and rendered with controls and status UI.

## Deployment (Vercel)

Live deployment: [https://blabberx-5v18dwuan-shubhamraj82s-projects.vercel.app](https://blabberx-5v18dwuan-shubhamraj82s-projects.vercel.app)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add all environment variables in Vercel project settings.
4. Build and deploy.

Recommended post-deploy checks:
- Clerk redirect URLs and allowed origins.
- Convex deployment URL and auth setup.
- Stream API key/secret and token generation flow.

## Security Notes

- Keep `CLERK_SECRET_KEY` and `STREAM_API_SECRET_KEY` server-only.
- Generate Stream tokens only on the server (already implemented via server action).
- Validate all environment variables in each deployment environment.

## Future Improvements

- Add route protection middleware for stricter page-level guarding.
- Add automated tests for chat creation and video-call lifecycle.
- Add better observability/logging around token and connection failures.
- Improve search scalability with more advanced indexing/filter strategy.
