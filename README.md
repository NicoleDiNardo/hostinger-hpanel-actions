# hPanel Actions — Hostinger product designer task

Interactive prototype + design worksheet for Hostinger’s hPanel “to-dos” problem.

## Problem → solution

hPanel’s always-visible **Your to-dos** list mixes renewals, setup nudges, and account actions. Users skim past it, CTAs convert poorly, home content is buried, and every item feels equally urgent.

**Solution: Actions** — a priority-aware Action Centre (not a flat notification inbox):

- **Home** shows websites again, with at most **one** critical Priority Strip
- **Topbar badge + summary chip** open the Action Centre
- **P0–P4 priority engine** maps Hostinger nudge types so offers never compete with billing blockers
- **Multi-site grouping**, filters, dismiss, and snooze keep the system from becoming another wall

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Where to click

| Route | What it is |
|-------|------------|
| `/` | Redesigned Home |
| `/actions` | Action Centre (filters, sites, dismiss/snooze) |
| `/worksheet` … `/worksheet/rationale` | Design boards 01–05 (framing → rationale) |

Use **Reset demo** in the top bar after clearing actions.

## Design decisions (interview talking points)

1. **Named it Actions, not Notifications** — most items are tasks with outcomes (renew, restore, grant), not messages to mark as read.
2. **Hard cap: one Home interrupt** — directly fixes urgency inflation and fold burial.
3. **Offers quarantined (P4)** — never on Home, never under Critical.
4. **AI accelerated scaffolding**; the product calls above are the ones to defend.

## Figma

Duplicate the Hostinger task file as your worksheet. Copy-ready board text lives in [`FIGMA_WORKSHEET.md`](./FIGMA_WORKSHEET.md). Screenshot the live prototype for hi-fi UI frames.

## Stack

Vite · React 19 · TypeScript · CSS Modules · React Router
