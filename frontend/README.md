# Meridian Claims — Frontend

Day 1 frontend build for the healthcare claims platform. Pure UI with dummy data —
no backend, AI, or blockchain integration wired up yet.

## Stack

- React + Vite
- Tailwind CSS v4
- react-router-dom (routing)
- framer-motion (animations)
- lucide-react (icons)
- axios (installed, ready for backend integration — not used yet)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

## Pages

- `/` — Landing page
- `/submit-claim` — Submit Claim page (form + dummy upload + simulated success state)
- `/dashboard` — Dashboard (claim list + stats, dummy data)
- `/claim-status` — Claim Status page (timeline + review-agent cards)
- `/settlement` — Settlement page (payout summary)

## Structure

```
src/
  components/   Navbar, ClaimForm, AgentStatusCard, Timeline, SettlementCard
  pages/        Landing, SubmitClaim, Dashboard, ClaimStatus, Settlement
  data/         dummyData.js — all placeholder data used across pages
  index.css     Tailwind import + design tokens (@theme)
```

## Design notes

- Palette: deep teal-green primary (`#0B6E4F`) on a cool paper background, amber for
  pending states — calm and clinical rather than a bright "AI demo" look.
- Type: Fraunces (display/headlines), Inter (UI/body), IBM Plex Mono (claim IDs, amounts,
  timestamps).
- Signature element: the claim lifecycle "pipeline" — Submitted -> Verification ->
  Medical Review -> Approved -> Settled — recurs as the landing-page hero graphic and as
  the Timeline component on the Claim Status page, since that pipeline is the actual
  product.

## Next steps (not part of Day 1)

- Wire `axios` calls to the backend API in place of `src/data/dummyData.js`
- Add auth/session handling
- Connect real document upload to storage
