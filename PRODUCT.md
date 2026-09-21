# PI Tutors

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are UK secondary-school and sixth-form students studying mathematics and science from KS3 through A-Level, together with parents or guardians evaluating and arranging tutoring support.

## Product Purpose

PI Tutors helps students understand difficult mathematics and science concepts, build confidence, prepare for examinations, and arrange tutoring that fits their location and schedule. The website should make the tutors' expertise, subjects, formats, and contact path easy to understand.

## Positioning

PI Tutors combines practising educators and subject specialists with concept-first, personalised instruction. Sessions are available in person around Rotherham and Birmingham and online.

## Operating Context

Visitors compare tutor backgrounds, covered subjects, teaching formats, availability, and contact options before making an enquiry. Students may need ongoing subject support, exam preparation, homework help, an academic assessment, or university-related guidance.

## Capabilities and Constraints

- Public routes include Home, About, Services, Tutors, Blog, and Contact.
- The blog and admin/Supabase workflows already exist and must remain functional.
- The contact flow sends enquiries by email and must retain its field and submission contracts.
- The site is a Next.js App Router project using TypeScript, Tailwind CSS, shadcn/Radix components, Framer Motion, Supabase, and Resend.
- Public claims, prices, testimonials, and outcomes must not be invented during the redesign.

## Brand Commitments

- Preserve the PI Tutors name. At the owner's request the logo was redesigned in the v2 overhaul: a PI monogram whose pi bar is a cyan-to-amber light beam (`components/site/pi-mark.tsx`, `public/favicon.svg`). Legacy marks remain in `public/images/`.
- Preserve the factual tutor names, qualifications, subjects, experience, and availability already published in the repository.
- The new experience should feel premium, highly crafted, visually ambitious, and surprising while remaining trustworthy and easy for parents and students to use.
- Motion, scroll-led storytelling, and dark liquid-glass controls are explicitly welcome when they improve clarity.

## Evidence on Hand

- Official logo assets: `public/images/pi-circle-logo.svg`, `public/images/modern-pi-logo.svg`, and `public/images/pi-tutors-logo.png`.
- Tutor source portraits: `public/images/tutor-taimur.png` and `public/images/tutor-mukarram.png`.
- Existing tutor biographies, qualifications, service catalogue, locations, contact details, and availability are present in the public route source files.
- There is no independently verified outcomes dataset or client-logo library in the repository; future work must not fabricate either.

## Product Principles

1. Make expertise tangible through real tutor credentials and concrete subject coverage.
2. Explain difficult learning journeys with clarity, warmth, and intellectual confidence.
3. Keep the path from discovery to enquiry obvious at every stage.
4. Use visual ambition to make learning feel alive, never to obscure information.
5. Preserve trust by distinguishing verified facts from illustrative content.

## Accessibility & Inclusion

The public experience should meet WCAG AA contrast expectations, remain fully keyboard navigable, maintain readable mobile typography and touch targets, and provide a reduced-motion experience that preserves all content and actions.
