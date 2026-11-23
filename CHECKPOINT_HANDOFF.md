# Rooftop Sanctuary — Model Handoff & Project Checkpoint

> **Purpose:** Self-contained project state checkpoint so any AI coding model or new session can resume work immediately without re-discovering architectural decisions, completed renders, codebase structure, or workspace guardrails.
>
> **Last Updated:** 2026-11-23  
> **Workspace Root:** `/Users/rajaths/experiments/floorplan-rendering-project`  
> **Git HEAD:** `4343b67` (`feat(web): scaffold scroll-driven Rooftop Sanctuary architectural pitch site`, synced with `origin/main`)  
> **Status:** All 4 architectural renders approved + Phase 1 scroll-driven pitch website (`web/`) built, verified, and committed. Waiting on final cost/comparison figures from requester and user decision on next task.

---

## 1. Project Overview & Architectural Ground Truth

We are building an investor pitch package for a **~20,000+ sq. ft. Modern-Bali Rooftop Wellness Sanctuary** (conceptual target envelope **~₹5–6 Crore**), anchored strictly to the **real building silhouette** from satellite imagery (`docs/image/map-view.png` and `docs/image/map-view-straightened.png`).

### Spatial Zones (8 Active Zones + 1 Excluded Utility Core)

| Area | Code | Zone | Architectural Spec & Locked Decisions |
| :--- | :--- | :--- | :--- |
| **North Stepped Terrace** | `P` | **Semicircular Infinity Pool** | Turquoise-teal pool extended northward **strictly inside** the north semicircular crown with a **flush vanishing rim** (no tall parapet wall blocking the horizon). |
| **North Stepped Terrace** | `C` | **Wrap-Around Bali Café** | Left & right stepped teak pergola wings framing the pool, travertine espresso counter, rattan seating, and warm 2700K pendants. |
| **North Stepped Terrace** | `S` | **The Atelier Luxury Salon** | Northwest corner glass-and-teak pavilion with backlit arched mirrors and serene grooming stations. |
| **East Corridor** | `R` | **Contrast Recovery Suite** | Northeast warm timber sauna & cold plunge suite transitioning onto the East Promenade. |
| **East Corridor** | `EP` / `BL` | **East Promenade & Curved Balcony** | Palm-lined teak stepping-stone walkway leading to a **single** curved projecting eastern lounge balcony (never double-stacked). |
| **South Rectangular Slab** | `G. Class.` | **Group Classes Studio** | Left bay of the 3-bay glass-and-teak south pavilion (timber floor, acoustic sliding glass). |
| **South Rectangular Slab** | `Pilates` | **Reformer Pilates Studio** | Center bay of the south pavilion (wooden reformers, skylight louver roof, soft natural daylight). |
| **South Rectangular Slab** | `GYM` | **Strength & Conditioning Gym** | Right bay of the south pavilion (matte-black racks, dark rubber floor, warm brass accents). |
| **South Perimeter** | `TRACK` | **2-Lane Sky Running Track** | Continuous 2-lane cushioned **terracotta EPDM** track encircling the south 3-bay pavilion with frameless glass perimeter balustrades. |
| **Central-Left Core** | `MEP` | **Excluded Mechanical Core** | Red box + yellow `X` on markup. **Strictly non-usable utility footprint** — zero guest amenities inside; perimeter screened with tall dark-teak vertical louvers and vertical tropical living walls. |

### Aesthetic & Design System (`DESIGN.md` + `AGENTS.md`)

- **Palette:** Travertine `#F5F1EB`, Sand `#EAE3D9`, Obsidian `#161614` (South Fitness mood shift), Deep Palm `#2F4838`, Brushed Brass `#B8935A`, Terracotta `#B5583B`, Lagoon `#2F6E73`.
- **Typography:** `Cormorant Garamond` (editorial serif headings), `Plus Jakarta Sans` (clean body UI), `JetBrains Mono` (architectural spec labels/indices). Icons: Lucide React (`strokeWidth={1.25}`).
- **Tone:** Architectural Monograph — quiet luxury, Modern Balinese minimalism. **No** neon gym themes, **no** generic SaaS card grids, **no** generic rectangular mini-maps.
- **Source-of-Truth Precedence:** `DESIGN.md` contains an earlier 4-zone rectangular draft in parts; always follow `AGENTS.md`, `VISUAL_PLAN_PROMPTS.md`, and the 4 approved renders in `docs/image/output/` for the **real building silhouette and 8 active zones**, while strictly honoring `DESIGN.md` for color tokens, typography, and editorial pacing.

---

## 2. Completed Work Inventory

### A. Architectural Render Suite (`docs/image/output/`) — Complete & Committed

All 4 chained renders from `VISUAL_PLAN_PROMPTS.md` were generated, iteratively reviewed with the user, approved, and committed:

| Step | Approved Asset | Aspect / Size | Approved From | Chained Reference Inputs |
| :--- | :--- | :--- | :--- | :--- |
| **Source 1** | `docs/image/map-view.png` *(READ-ONLY)* | `848×1920` | Raw satellite footprint | — |
| **Source 2** | `docs/image/map-view-straightened.png` *(READ-ONLY)* | `2302×5211` | Annotated zoning blueprint | — |
| **Prompt 1** | `docs/image/output/masterplan-approved.png` | 9:16 (`768×1376`) | `drafts/masterplan-v3.png` | `map-view.png` + `map-view-straightened.png` (v3 extended pool inside north semicircle) |
| **Prompt 2** | `docs/image/output/isometric-approved.png` | 16:9 (`1376×768`) | `drafts/isometric-v4.png` | `map-view.png` + `masterplan-approved.png` (single curved east balcony, flush infinity rim, solid south limestone facade) |
| **Prompt 3** | `docs/image/output/north-deck-render.png` | 16:9 (`1376×768`) | `drafts/north-deck-v2.png` | `isometric-approved.png` (eye-level golden-hour North Deck) |
| **Prompt 4** | `docs/image/output/south-fitness-render.png` | 16:9 (`1376×768`) | `drafts/south-fitness-v1.png` | `isometric-approved.png` (eye-level twilight South 3-bay block + track) |

- All exploratory drafts are preserved under `docs/image/output/drafts/`.
- **Resolution note:** Built-in image generation produced `768×1376` / `1376×768`. If higher-res (2K/4K) prints are needed later, prompts in `VISUAL_PLAN_PROMPTS.md` can be re-run externally and swapped in with user approval.

### B. Phase 1 Scroll-Driven Pitch Website (`web/`) — Built, Verified & Committed (`4343b67`)

- **Stack:** Vite 6.3 + React 19.1 + TypeScript 5.8 + Tailwind CSS v4 (`@tailwindcss/vite`) + Framer Motion 12 + Lucide React.
- **Package Manager:** `pnpm` (`v12.21.0`, `node v26.12.1`). Note: `web/pnpm-workspace.yaml` configures `allowBuilds: { esbuild: true }` so `pnpm build` succeeds cleanly under pnpm v12.
- **Static Assets:** `map-view.png` + all 4 approved renders were **copied** (byte-identical) into `web/public/renders/` without moving or touching `docs/image/`.
- **Commands:**
  ```bash
  cd web
  pnpm dev      # Local dev server (http://localhost:5173)
  pnpm build    # Type-check + production bundle (tsc -b && vite build)
  pnpm preview  # Serve built dist/ locally
  ```

#### `web/src/` Architecture

| File | Responsibility |
| :--- | :--- |
| `web/src/index.css` | Exact `DESIGN.md` theme tokens, font imports, editorial utilities, and `@media print` deck export styles. |
| `web/src/App.tsx` | Chapter layout orchestrator, `IntersectionObserver` scroll spy, initial URL hash navigation support. |
| `web/src/data/zones.ts` | Single source of truth for `CHAPTERS`, all 10 `SPATIAL_ZONES` (9 active pins + 1 `MEP` excluded pin with calibrated `isoCoords` & `planCoords`), and `SOUTH_FITNESS_MODULES`. |
| `web/src/data/financials.ts` | **Single plug-and-play data file** for all cost, timeline, Base vs. Full option comparison, BOQ rows, synergy loop, and roadmap milestones. |
| `web/src/components/HeaderNav.tsx` | Adaptive light/dark frosted nav bar, chapter rail, brushed-brass scroll progress indicator, mobile drawer, Deck PDF print action. |
| `web/src/components/SilhouetteMiniMap.tsx` | Floating bottom-right frosted SVG mini-map traced to the actual building silhouette (auto-hides on Hero `vision` chapter; illuminates active zones; click-to-jump). |
| `web/src/components/HeroSection.tsx` | **Ch. 00 (`#vision`):** Travertine split hero + interactive pointer/touch/keyboard Before/After slider (`map-view.png` vs `masterplan-approved.png`) with preset buttons. |
| `web/src/components/MasterplanSection.tsx` | **Ch. 01 (`#masterplan`):** `3D Cutaway` / `2D Masterplan` / `3D Orbit · Phase 2` tabs, 10 pulsing brass hotspot pins, Zone Spec Inspector, and Zone Directory. |
| `web/src/components/SouthFitnessSection.tsx` | **Ch. 02 (`#fitness`):** Obsidian `#161614` mood shift, scroll-scaled `south-fitness-render.png`, 4-module interactive switcher (Gym, Pilates, Group Classes, Sky Track). |
| `web/src/components/EastCorridorSection.tsx` | **Ch. 03 (`#corridor`):** Sand `#EAE3D9` & Palm `#2F4838` transition, cropped east promenade/balcony/recovery view + 3-point Mechanical Core screening breakdown. |
| `web/src/components/NorthDeckSection.tsx` | **Ch. 04 (`#sanctuary`):** Travertine `#F5F1EB` monograph, scroll-scaled `north-deck-render.png`, 3-column Infinity Pool / Bali Café / Atelier Salon showcase. |
| `web/src/components/InvestmentSection.tsx` | **Ch. 05 (`#investment`):** 4-step Synergy Loop, Side-by-Side / Base / Full cost comparison switcher & 8-row BOQ table (driven by `financials.ts`), 3-phase execution roadmap, Deck PDF export CTA, Site Survey checklist modal. |

#### Verification State

- `cd web && pnpm build` passes cleanly (`0` TypeScript/Vite errors).
- Headless Google Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`) verified Chapters 00–04 (`1440×900` and `1440×6800`): confirmed Before/After alignment, typography, zero mini-map HUD overlap, calibrated isometric hotspot pin positions, Obsidian mood shift, East Corridor crop, and North Deck rendering.
- **Pending visual spot-check:** Chapter 05 (`#investment`) fell below the `6800px` full-page screenshot crop and has not been directly screenshotted yet, nor has a `390×844` mobile pass been captured. Do both during the next web edit (e.g., when plugging in cost numbers).

---

## 3. Queued Next Tasks (Pick One Per Turn After User Confirms)

### Task 1 (Primary — Waiting on Requester Input): Insert Final Cost & Option Comparison Numbers
The user is still waiting on final cost & comparison values from the requester. When provided:
1. Edit **only** `web/src/data/financials.ts`:
   - Change `FINANCIAL_DATA_STATUS` from `'PENDING_REQUESTER_DATA'` → `'CONFIRMED'`.
   - Update `FINANCIAL_META` if target envelope / notes change.
   - Update `OPTION_SUMMARIES.base` and `OPTION_SUMMARIES.full` (`totalCapex`, `timelineEstimate`, etc.).
   - Populate `baseCost`, `fullCost`, and `variance` across all 8 items in `COST_COMPARISON_ROWS` (or adjust rows if requester supplies a custom BOQ structure).
2. Run `cd web && pnpm build`.
3. Visually verify Chapter 05 (`#investment`) and mobile (`390×844`) via headless Chrome screenshots (store temporary screenshots in scratch outside the repo so git stays clean).

### Task 2 (Optional — Quick Polish Pass)
- Capture and audit Chapter 05 (`#investment`) + mobile (`390×844`) responsive layout + `Print / Save as PDF` layout before investor sharing.
- Tune hash-navigation behavior in `web/src/App.tsx` if smooth scrolling lags on deep links.

### Task 3 (Optional Phase 2 — Blender 3D Model / Motion Integration)
- **Context:** The user has never used Blender before and has a YouTube tutorial they offered to share. **Blender is NOT currently installed** on this Mac (`blender` not on PATH, no `/Applications/Blender.app`).
- **Reserved UI Slot:** `web/src/components/MasterplanSection.tsx` already includes a dedicated `3D Orbit · Phase 2` tab ready to host either an interactive `.glb` viewer (`@google/model-viewer` / Three.js) or AI-generated architectural flythrough video loops (`isometric-approved.png` → `north-deck-render.png` → `south-fitness-render.png`).
- **Guardrail:** Ask explicit confirmation before installing Blender, `mcp-for-blender`, or heavy npm 3D dependencies.

---

## 4. Standing Workspace Rules (`AGENTS.md` Summary — Mandatory)

Every model working in this repository **MUST** follow `AGENTS.md`:

1. **NEVER Run Write/Destructive Git Commands:** User handles all Git writes manually in a separate Ghostty terminal window. Never run `git add`, `git commit`, `git push`, `git reset`, `git rebase`, or `git checkout`. (Read-only `git status -s` / `git log` is fine.)
2. **One Task Per Turn:** Execute one discrete task at a time, then **stop and wait** for user review, commit, and approval.
3. **Mandatory End-of-Task Block:** Always finish with the exact `### Git Checkpoint` block (Files Added/Modified, manual `git` commands, and `context-mode index` command when text/code changed).
4. **Protect Source Assets:** Never modify, move, or delete `docs/image/map-view.png`, `docs/image/map-view-straightened.png`, or originals in `docs/image/output/`. Always copy into `web/public/renders/`. When re-rolling renders, always write a new `-vN.png` draft rather than overwriting prior drafts.
5. **Ask Before Destructive / Heavy Actions:** Confirm before running `rm`, overwriting an approved render, or installing heavy dependencies (Blender, Three.js, etc.).
6. **`context-mode` Efficiency:** Repo is indexed under source label `project:floorplan-rendering-project`. Search via `ctx_search` before dumping whole large docs (`DESIGN.md`, `VISUAL_PLAN_PROMPTS.md`), and keep the index updated after creating/editing text or code files.

---

## 5. Starter Prompt for Resuming in Another Model

Copy and paste this into any new model session inside `/Users/rajaths/experiments/floorplan-rendering-project`:

```text
Read AGENTS.md and CHECKPOINT_HANDOFF.md first to restore full project context.
Follow all AGENTS.md rules strictly (especially: never run git write commands, one task per turn, protect docs/image/* originals, and end with the Git Checkpoint block).
Wait for my instruction on the next task (either plugging requester cost/comparison numbers into web/src/data/financials.ts, running a visual QA pass on Chapter 05 + mobile, or starting Phase 2 Blender/3D integration).
```
