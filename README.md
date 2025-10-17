🖥️ VORA View Layer

The VORA View layer is built with Next.js (App Router) and TypeScript,
designed for a modular, maintainable, and scalable user interface.
It follows a route-driven layout structure where each segment of the app
(dashboard, sectors, login, etc.) has its own layout.tsx and page.tsx,
providing clear separation of concerns and flexibility for future expansion.

---

🚀 Getting Started

First, run the development server:

    npm run dev

Then open http://localhost:3000 in your browser to see the result.

---

🎨 Design Philosophy

• Atomic & Modular
Each UI component is self-contained and reusable across different routes.

• Route-Based Layout Hierarchy
Next.js App Router allows each route segment to have its own layout.tsx and page.tsx,
enabling independent structure and metadata.

• Shared Layout Components
Common structures (navigation, headers, analytics panels) are stored in src/layouts
and imported into specific route layouts for consistency and maintainability.

• Responsive & Accessible
The entire UI is built with Tailwind CSS and optimized for accessibility
(ARIA roles, semantic HTML).

---

📱 Views Overview

Dashboard - Displays summarized data of all sectors, recent analyses, and system activity.
Sectors - Lists available industry sectors (EV, Bio, Semiconductor, etc.)
with filters and quick analysis results.
Sector Detail - Dynamic route showing article-based AI analysis,
sentiment summary, and scenario projection.
Login / Auth - Public-facing pages for user authentication and onboarding.
Settings - User preferences, API key management, and platform configurations.

---
