# ANSHIKA UDHYOG CENTER

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Full public website with home page (animated logo intro, typing tagline, about/scheme section, women empowerment section, counters, state coverage, gallery, reviews, contact)
- Login system: Admin (ID + Password), All others (Mobile + Access Code)
- Access Code system: unique per user, admin-controlled (generate/reset/disable)
- Super Admin Dashboard with 15 sections: User Mgmt, Access Code Control, KYC, SHG Mgmt, Product Mgmt, Order Mgmt, Income System, Branch & Location, ID Card, Certificate, CMS, News & Notice, Notifications, Reports, Settings
- User Dashboards: Member, SHG, Center/Branch, Staff/HR, Core Team
- E-commerce: product listing, cart, checkout, UPI/QR payment, order tracking
- Registration system: Name, Address, Aadhaar, PAN, Bank details, Mobile — admin approves, then access code generated
- PWA: manifest, install button, splash screen, offline support, push notifications
- Hamburger menu with 3 lines of different sizes
- SEO: meta tags, schema markup
- Organization: DMVV BHARTIY MAHILA SHAKTI FOUNDATION, ISO 9001:2015, MCA Registered
- Contact: Bilaspur Chhattisgarh, Phone/WhatsApp/Email

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- User management: roles (admin, member, shg, center, branch, coordinator, staff, hr, coreteam), mobile + access code auth
- Admin auth: hardcoded ID/password check
- Access Code CRUD: generate, reset, disable/enable per user
- Registration requests: store pending registrations, admin approves
- KYC: upload/approve/reject per user
- SHG management: groups with members
- Product catalog: CRUD
- Orders: create, track, status updates
- Wallet/earnings per member, withdrawal requests
- Branch/location management
- News & notices
- Gallery items
- Stats counters
- Certificate and ID card generation metadata

### Frontend (React + Tailwind)
- Green government/NGO theme (OKLCH greens)
- Mobile-first responsive layout
- Public routes: Home, About, Scheme, Products, Register, Login
- Home page sections: animated logo, typing tagline, about, women empowerment, counters, states, gallery, reviews, contact/map
- Auth flow: admin (ID+password), users (mobile+access code), role-based redirect to dashboard
- Admin dashboard with sidebar, 15 management sections
- Member dashboard: profile, KYC, ID card, certificates, orders, wallet, earnings
- SHG dashboard: group mgmt, product upload, sales, training
- Center/Branch dashboard: local members, reports, performance
- Staff/HR dashboard: KYC verify, user mgmt
- Core Team dashboard: monitoring, analytics
- E-commerce: product grid, cart, checkout with UPI/QR mockup, order tracking
- PWA manifest and service worker
- Custom hamburger menu (3 lines: big, small, medium)
