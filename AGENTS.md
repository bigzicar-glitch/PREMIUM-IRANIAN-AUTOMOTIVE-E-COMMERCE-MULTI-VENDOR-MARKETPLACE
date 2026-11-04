# Automotive Marketplace (اتو‌پارت) — Base44 Setup

## Overview
Iranian automotive spare parts multi-vendor marketplace. Persian (Farsi) RTL frontend with black/yellow premium automotive design.

## Tech Stack
- **Frontend**: React 18 + Vite 5 + TailwindCSS 3 (RTL, Vazirmatn font)
- **Backend**: Express + Prisma ORM + PostgreSQL
- **Database**: PostgreSQL 16

## Architecture
- Frontend on port 5173 (mapped to host 3000), Vite dev server with HMR
- Backend API on port 4000 (internal), proxied via Vite's `/api` proxy
- PostgreSQL on default port (internal)
- Frontend uses mock data for rendering; backend API available for integration
- Prisma schema defines full marketplace data model

## Running
```bash
docker compose -f docker-compose.base44.yml up -d --build
```

## Key Notes
- Frontend is RTL with Persian content, Vazirmatn font from Google Fonts
- Product images are inline SVG placeholders (no external assets needed)
- Backend seeds demo data on startup (categories, brands, products, sellers, vehicles, blog)
- Vite proxy forwards `/api/*` to backend at `localhost:4000`
- No external secrets required — database credentials are local compose defaults

## Verification
- Homepage at `/` shows hero, categories, products, sellers, blog
- Shop at `/shop` with category/brand filters and sorting
- Product detail at `/product/:slug` with seller offer comparison table
- Cart at `/cart` with multi-seller grouping
- Seller store at `/seller/:slug`
