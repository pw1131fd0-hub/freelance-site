# Product Requirement Document (PRD) - Solopreneur One

**Version:** 2.0 (Redesigned)  
**Status:** [DRAFT]  
**Author:** Senior PM / Lead Engineer  
**Last Updated:** 2026-03-17

---

## 1. Product Vision & Core Pain Points (The "Why")

### 1.1 Vision
**Solopreneur One** is the definitive "Command Center" for the modern independent professional. It dissolves the boundary between a portfolio and a CRM, creating a high-conversion lead funnel that flows directly into a streamlined project management system. Our mission is to eliminate "Administrative Overhead" for solo-operators so they can focus 100% on their craft.

### 1.2 Core Pain Points
- **The "Tool Fatigue" Tax:** Switching between Webflow (Portfolio), Hubspot (CRM), and Trello (PM) wastes 15-20% of a freelancer's week.
- **Static Portfolio Friction:** Traditional portfolios are passive. Visitors often leave because there is no clear path from "Interest" to "Inquiry".
- **Opaque Client Experience:** Clients are often left in the dark during the project lifecycle, leading to excessive "Status Check" emails.
- **Data Fragmentation:** Financial data, project files, and client history are scattered across different platforms, making year-end reporting and client retention difficult.

---

## 2. Target User Personas & Detailed User Stories

### 2.1 Personas
- **"Alex the Artisan" (High-end Brand Designer):**Alex needs a gallery that feels like a premium art book. He values high-conversion inquiries with budget-filtering to avoid low-ballers.
- **"Jordan the Architect" (Full-stack Developer):**Jordan needs a portfolio that demonstrates technical depth. He values milestone tracking and integrated technical specs for projects.
- **"Casey the Consultant" (Marketing Strategist):**Casey needs to build trust through case studies. She values a CRM that captures "how they found me" and project ROI data.

### 2.2 User Stories
- **Story 1 (Lead Funnel):** As a high-intent visitor, I want a "Build Your Quote" interactive form instead of a generic text box, so I can provide my budget and timeline immediately, knowing if I'm a good fit for the freelancer.
- **Story 2 (Instant Workflow):** As a freelancer, I want a "Convert to Project" button on every inquiry that automatically creates a project dashboard, pulls in the client's brief, and suggests a milestone template based on the "Project Type".
- **Story 3 (The Unified History):** As a freelancer, I want a 360-degree "Timeline View" for every client, showing every inquiry, every project, every milestone completed, and every file shared, so I never lose context.

---

## 3. Functional Requirements (P0/P1/P2)

### P0: Core Engine (Essential for MVP)
1.  **High-Conversion Portfolio:**
    *   **Feature:** Dynamic Landing Page with filtered project gallery (Category/Tech).
    *   **Acceptance Criteria:** Page loads in < 1s; Gallery items open to deep-dive pages; Interactive Lead Gen Form.
2.  **Intelligent CRM (Back-office):**
    *   **Feature:** Inquiry Inbox with "Lead Scoring" (based on budget/urgency).
    *   **Acceptance Criteria:** Admin can view, mark as "Qualified/Unqualified", and respond via mailto link.
3.  **Project Command Center:**
    *   **Feature:** Kanban or Timeline view of all active projects.
    *   **Acceptance Criteria:** Projects linked to Clients; Status tracking (Discovery, In-Progress, Review, Completed).
4.  **Secure Admin Gateway:**
    *   **Feature:** Multi-Factor Auth (or simple secure hash-based login) for the backend.
    *   **Acceptance Criteria:** Zero access to `/admin/*` routes without a valid session.

### P1: Professional Workflow (Quality & Efficiency)
1.  **Milestone Automation:** Templates for "Web Dev", "Branding", "Consulting" that auto-populate milestones.
2.  **Asset Vault:** Centralized file storage per project with public/private toggle for client sharing.
3.  **Advanced Analytics:** "Conversion Rate" of landing page and "Revenue Pipeline" (Total $ in discovery vs. active).
4.  **Rich Case Studies:** Support for video embeds (YouTube/Vimeo/Loom) and interactive scroll-triggered galleries.

### P2: Ecosystem Integration (Scale & Polish)
1.  **Client "View-Only" Link:** Secure, tokenized URL for clients to track project status without account creation.
2.  **Quick-Invoice Generator:** Auto-fill client/project data into a professional PDF invoice.
3.  **Custom Domain Mapping:** Support for deploying the same engine for multiple "Personas" on different domains (Multi-tenant ready).

---

## 4. Non-Functional Requirements & Performance Targets

| Metric | Target |
|---|---|
| **Speed (LCP)** | < 0.8s (Static-first rendering) |
| **SEO Score** | 100/100 on Google Lighthouse (Metadata, Semantic HTML) |
| **Security** | Rate-limiting on contact forms; Prisma-based input sanitization; SSL-only. |
| **Data Resilience** | Hourly SQLite snapshots backed up to cloud storage (e.g., S3/R2). |
| **UX Accessibility** | WCAG 2.1 AA Compliance (Contrast, Keyboard Nav). |

---

## 5. Technical Stack & Architecture Rationale

- **Framework:** **Next.js 14 (App Router)** - SSR for SEO-critical portfolio; Client-side interactivity for the CRM.
- **Database:** **SQLite (via Prisma)** - Zero-latency for solo use; "Database-as-a-file" makes migration and backup trivial.
- **Styling:** **Tailwind CSS + Shadcn UI** - For a clean, "Enterprise-grade" look with minimal custom CSS.
- **Type Safety:** **TypeScript + Zod** - End-to-end validation from the form input to the DB.
- **Icons:** **Lucide-React** - Lightweight and modern.

---

## 6. UI/UX Design System: "Obsidian & Chrome"

### 6.1 Color Palette
- **Background (Primary):** `#09090B` (Zinc-950) - Deep, focused black.
- **Surface (Secondary):** `#18181B` (Zinc-900) - Subtle depth for cards.
- **Action (Primary):** `#FFFFFF` (White) - High-contrast call to actions.
- **Accent (Muted):** `#A1A1AA` (Zinc-400) - For secondary text and metadata.
- **Status (Success):** `#22C55E` (Emerald-500) - For "Completed" milestones.

### 6.2 Typography
- **Headings:** `Geist Sans` (Bold/Tight Tracking) - For a modern, tech-forward feel.
- **Body:** `Inter` (Regular/Optimized for legibility).
- **Code/Metadata:** `Geist Mono` - For a "System" aesthetic.

### 6.3 Interactions
- **Micro-animations:** Framer Motion for subtle entry transitions.
- **Responsive:** Mobile-first design; "Desktop-optimized" CRM with sidebar navigation.

---

## 7. Success Metrics (KPIs)

1.  **Lead-to-Project Conversion Rate:** Goal > 15%.
2.  **Admin Efficiency:** Time spent in CRM < 30 mins/day.
3.  **Client Transparency:** Reduction in status-check emails by > 50%.
4.  **Lighthouse Performance:** 95+ across all categories.

---

## 8. Roadmap & Phasing

- **Phase 1 (Core):** Landing, Project Detail, Admin Inquiry Inbox, Client/Project CRUD.
- **Phase 2 (Workflow):** Milestone tracking, File management, Lead Scoring.
- **Phase 3 (Expansion):** Analytics Dashboard, Client Access Links, Invoice templates.