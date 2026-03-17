# Product Requirement Document (PRD) - Freelance + CRM Unified Platform

**Version:** 1.0 (Initial Draft)  
**Status:** [DRAFT]  
**Author:** Senior PM

---

## 1. Product Vision & Core Pain Points (Why)

### 1.1 Vision
To empower freelancers by providing a seamless, integrated platform that combines an elegant portfolio for showcasing work with a robust CRM for client management and project tracking. One tool to rule the entire freelance lifecycle from lead to invoice.

### 1.2 Core Pain Points
- **Fragmented Workflow:** Freelancers currently juggle between multiple tools (Portfolio sites, CRM, Email, Project Management) causing data silos and inefficiency.
- **Poor Lead Conversion:** Static portfolios often fail to capture visitor interest or provide clear call-to-actions (CTAs) that lead into a CRM.
- **Client Management Overhead:** Tracking project progress, client communications, and files in disparate places is time-consuming and prone to error.
- **High Cost/Complexity:** Existing CRM solutions are often over-engineered and expensive for solo freelancers.

---

## 2. Target User Personas & User Stories

### 2.1 Personas
- **"The Creative Pro" (Designer/Photographer):** Needs a visually stunning way to show work and handle high-volume inquiries.
- **"The Solopreneur" (Developer/Consultant):** Focused on project milestones, client communication, and professional lead management.
- **"The Part-timer":** Needs a simple, set-and-forget system to manage side-hustle clients without complex setup.

### 2.2 User Stories
- **Story 1 (Lead Generation):** As a visitor to the freelancer's site, I want to easily view their past work and submit a structured contact form so I can get a quote without a long email chain.
- **Story 2 (Project Management):** As a freelancer, I want to convert a contact inquiry into a "Client" and create a "Project" with milestones so I can keep track of my commitments and progress.
- **Story 3 (Client Insight):** As a freelancer, I want to see a history of all communications and project statuses for a specific client in one dashboard so I can provide better service and manage expectations.

---

## 3. Functional Requirements (P0/P1/P2)

### P0: Essential for MVP
- **Portfolio Frontend:**
  - Landing page with bio and featured projects.
  - Project detail pages (Gallery, Description, Tech/Tools used).
  - Integrated contact form (captures name, email, project type, budget, message).
- **CRM Backend (Admin Only):**
  - **Inquiry Management:** View, status update (New, Contacted, Rejected, Converted).
  - **Client Management:** Basic CRUD for clients.
  - **Project Tracking:** Create projects linked to clients, set basic status (Ongoing, Completed, On Hold).
- **Authentication:** Simple admin login for the CRM area.

### P1: Important for Quality
- **Milestone Management:** Add/edit/delete milestones within projects.
- **File Attachments:** Upload/link assets (images/docs) to projects.
- **Rich Project Showcase:** Video support and interactive elements in the portfolio.
- **Dashboard Overview:** Analytics on lead volume and project revenue (estimated).

### P2: Nice to Have
- **Invoicing Integration:** Basic invoice generation and tracking.
- **Client Portal:** Let clients log in to see their project progress.
- **Email Notifications:** Notify admin of new inquiries and notify clients of milestone updates.

---

## 4. Non-Functional Requirements

| Metric | Target |
|---|---|
| **Performance (LCP)** | < 1.5s for the portfolio landing page |
| **Security** | OWASP Top 10 compliance; CSRF/XSS protection; secure password hashing (Argon2/bcrypt) |
| **Availability** | 99.9% (Single-tenant deployment focus) |
| **Scalability** | Support up to 10,000 leads and 500 active projects without performance degradation |
| **Data Integrity** | Prisma-managed relational integrity with SQLite |

---

## 5. Technical Constraints & Selection

- **Frontend/Backend Framework:** Next.js 14 (App Router) - For SSR, SEO, and integrated API routes.
- **Database:** SQLite - Optimized for solo use, zero-configuration, and easy backups.
- **ORM:** Prisma - For type-safe database access and migrations.
- **Styling:** Tailwind CSS - For rapid, modern, and responsive UI development.
- **Icons:** Lucide-React.
- **Form Handling:** React Hook Form + Zod validation.

---

## 6. Competitor Analysis & Alternatives

- **Wix/Squarespace:** Good for portfolios, but poor CRM integration and high recurring costs.
- **HoneyBook/Donsado:** Great CRM, but expensive and the portfolio/landing page features are often rigid.
- **Notion:** Versatile, but requires extensive manual setup and lacks a professional "dedicated site" look for the portfolio.
- **Our Edge:** Zero-overhead setup, highly tailored "Lead-to-Project" flow, and complete ownership of data via SQLite.

---

## 7. MVP Scope & Roadmap

- **Phase 1 (MVP):** Landing page, Project showcase, Contact form, Admin dashboard for Inquiries/Clients/Projects.
- **Phase 2:** Milestone tracking, File management, Improved Analytics.
- **Phase 3:** Client portal, Invoicing, Email automation.

---

## 8. UI/UX Design Specifications

### 8.1 Color Palette (Modern/Professional)
- **Primary (Action):** `#2563EB` (Blue-600)
- **Secondary (Success):** `#059669` (Emerald-600)
- **Background (Light):** `#FFFFFF` / `#F8FAFC`
- **Background (Dark):** `#0F172A` / `#1E293B`
- **Text (Light):** `#1E293B` (Gray-800)
- **Text (Dark):** `#F1F5F9` (Gray-100)
- **Accent:** `#F59E0B` (Amber-500) for warnings/status.

### 8.2 Typography
- **Primary Font:** `Inter` or `Geist` (Sans-serif)
- **Heading Font:** `Inter` (Bold/Semi-bold)

### 8.3 Component Style
- **Corners:** Rounded (8px / 0.5rem)
- **Shadows:** Subtle (Small/Medium depth)
- **Interactions:** Hover states for all buttons/links; smooth page transitions (Next.js Link).

### 8.4 RWD Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

---

## 9. Success Metrics (KPIs)

- **Conversion Rate:** % of visitors submitting the contact form.
- **Lead Response Time:** Average time to mark an inquiry as "Contacted".
- **Project Throughput:** Number of projects completed per month.
- **Site Speed Index:** Google PageSpeed score > 90.
