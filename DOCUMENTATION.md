# ==============================================================
# Assurance Pro Auto — Architecture & Deployment Guide
# ==============================================================

## Stack Technique

### Frontend (React 19 + Vite 6)
- **React 19** with Concurrent Features and Server Components support
- **React Router v7** for SPA routing with data loaders
- **Tailwind CSS 3.4** with custom design tokens
- **Axios** for API communication
- **Vite** for blazing fast HMR and optimized production builds
- **React Helmet Async** for per-page SEO metadata management
- **ESLint + Prettier** for code quality

### Backend (Laravel 13 API)
- **Laravel 13** with PHP 8.3+
- **SQLite** for development, **MySQL 8** for production
- **Laravel Sanctum** for API authentication
- **Rate Limiting**: 60 req/min per IP on API, 10 req/hr for devis
- **Soft Deletes** on all data models
- **CORS** configured for frontend development proxy

### Vue.js Integration (Progressive Enhancement)
- Vue 3 pages for SEO-critical legal content (server-renderable)
- Shared router with meta-title management
- Hybrid React/Vue architecture via micro-frontend pattern

### Infrastructure
- **Docker** with multi-stage build (frontend + backend in single container)
- **Nginx** reverse proxy with security headers and gzip
- **Redis** (optional) for caching and queue workers
- **Health checks** and graceful startup

## SEO Preservation Mapping

| Legacy Element | Modern Implementation | Status |
|---|---|---|
| `<title>` per page | React Helmet + Vue route meta | ✅ |
| `<meta name="description">` | Per-page via Helmet/Vue | ✅ |
| `<meta name="keywords">` | Per-page via Helmet/Vue | ✅ |
| `<meta name="author">` | Inherited from Layout | ✅ |
| `<link rel="canonical">` | Per-page dynamic | ✅ |
| Open Graph (`og:*`) | Per-page in Head | ✅ |
| Twitter Card (`twitter:*`) | Per-page in Head | ✅ |
| JSON-LD Schema.org | `InsuranceAgency` struct | ✅ |
| Google Tag Manager | In `public/index.html` | ✅ |
| Google Analytics (gtag.js) | Cookie-consent gated | ✅ |
| Google Ads conversion tag | Cookie-consent gated | ✅ |
| `robots` meta | Per-page control | ✅ |
| hreflang (fr) | `<html lang="fr">` | ✅ |
| Image alt text | Present on all images | ✅ |
| Sitemap | Auto-generated via artisan | ⬜ (add package) |
| XML Sitemap | `/sitemap.xml` route | ⬜ (add package) |
| Structured data | Full JSON-LD on every page | ✅ |
| Breadcrumbs | Via route hierarchy | ✅ |
| Page speed (Core Web Vitals) | Vite SSR + image optimization | ✅ |
| Cookie consent (Tarteaucitron) | Custom compliant banner | ✅ |
| RGDP compliance | Full cookie + data handling | ✅ |

## Quick Start (Development)

```bash
# 1. Clone repository
git clone <repo-url>
cd assurance-professionnels-auto

# 2. Backend setup
cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate

# 3. Frontend setup
cd ../frontend
npm install
npm run dev

# 4. Backend API (separate terminal)
cd backend
php artisan serve
```

## Production Deployment

```bash
# Build & run with Docker
docker-compose up -d --build

# Or standalone Docker
docker build -t assurance-pro-auto .
docker run -p 8000:80 assurance-pro-auto

# Run migrations after deploy
docker exec -it assurance-pro-auto php artisan migrate --force
```

## API Endpoints

```
GET    /api/v1/devis              - List all devis (paginated, filtered)
POST   /api/v1/devis              - Create new devis request
GET    /api/v1/devis/{id}         - Get single devis detail
PUT    /api/v1/devis/{id}         - Update devis status/notes
DELETE /api/v1/devis/{id}         - Delete devis
GET    /api/v1/parametres/{cle}   - Get site parameter
PUT    /api/v1/parametres/{cle}   - Update site parameter
GET    /api/v1/statistiques       - Dashboard statistics
GET    /api/v1/site/info          - Site info (name, contacts, FAQ, activities)
GET    /api/v1/site/recherche     - Search devis (auto-complete)
```

## File Structure

```
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── DevisController.php      # Devis CRUD API
│   │   │   │   ├── ParametreController.php  # Site parameters
│   │   │   │   ├── StatistiquesController.php  # Dashboard stats
│   │   │   │   └── SiteController.php       # Site info endpoint
│   │   │   ├── PageController.php            # Server-rendered pages
│   │   │   └── SeoController.php            # JSON-LD generator
│   │   ├── Models/
│   │   │   ├── Devi.php                    # Devis model
│   │   │   ├── DeviReponse.php             # Devis response model
│   │   │   ├── Parametre.php               # Parameter model
│   │   │   └── User.php                    # Auth model
│   │   ├── Enums/
│   │   │   └── DeviStatut.php              # Devis status enum
│   │   └── Providers/
│   │       └── AppServiceProvider.php
│   ├── config/
│   │   ├── app.php, auth.php, database.php, cors.php, ...
│   ├── database/
│   │   ├── migrations/
│   │   │   └── 2024_01_15_create_assurance_tables.php
│   │   └── seeders/
│   ├── routes/
│   │   ├── web.php       # SPA + server pages
│   │   └── api.php       # API routes
│   ├── public/
│   │   ├── frontend/     # Built React app (from Vite build)
│   └── resources/views/
│       ├── welcome.blade.php    # Main SPA entry
│       ├── devis.blade.php     # Fallback devis form
│       ├── confirmation.blade.php  # Fallback confirmation
│       └── pages/
│           ├── mentions-legales.blade.php
│           └── politique-confidentialite.blade.php
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # React router
│   │   ├── main.jsx              # Entry point
│   │   ├── index.css             # Tailwind + global styles
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Landing page
│   │   │   ├── DevisPage.jsx     # Devis form page
│   │   │   ├── ConfirmationPage.jsx  # Success page
│   │   │   └── NotFoundPage.jsx  # 404 page
│   │   ├── components/
│   │   │   ├── Layout.jsx          # Main layout (header, footer)
│   │   │   ├── Header.jsx          # Responsive navbar
│   │   │   ├── Footer.jsx          # Footer with Sitemap links
│   │   │   ├── CookieBanner.jsx    # GDPR cookie consent
│   │   │   ├── SkipToContent.jsx   # Accessibility skip link
│   │   │   ├── HeroSection.jsx     # Hero CTA
│   │   │   ├── ActivitySection.jsx  # Activity grid
│   │   │   ├── GuaranteeSection.jsx  # Guarantees list
│   │   │   ├── WhyChooseUs.jsx       # Value propositions
│   │   │   └── FAQSection.jsx        # Accordion FAQ
│   │   ├── vue/
│   │   │   ├── pages/
│   │   │   │   ├── MentionsLegales.vue    # Legal mentions (Vue for SEO)
│   │   │   │   └── PolitiqueConfidentialite.vue  # Privacy policy
│   │   │   ├── router/
│   │   │   │   └── index.ts
│   │   │   └── components/
│   │   │       └── LegalLayout.vue
│   │   ├── services/
│   │   │   └── api.js               # API fetch wrapper
│   │   ├── hooks/
│   │   │   └── useDevis.js          # Devis form hook
│   │   └── utils/
│   │       └── helpers.js           # Utility functions
│   ├── public/
│   │   ├── index.html               # HTML template
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── index.html                   # Root HTML
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── entrypoint.sh
├── README.md
└── DOCUMENTATION.md
```