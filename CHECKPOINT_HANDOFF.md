# Rooftop Sanctuary — Model Handoff & Project Checkpoint

> **Purpose:** Self-contained project state, architectural decisions, design system, codebase map, and multi-phase roadmap so any AI coding model or new session can resume work immediately without re-discovering context or workspace guardrails.
>
> **Last Updated:** 2026-11-24  
> **Workspace Root:** `/Users/rajaths/experiments/floorplan-rendering-project`  
> **Canonical Web Application:** `website-v2/` (*"A Monograph in Elevation — Dark Obsidian Edition"*; `web/` v1 retired by user decision)  
> **Status:** All 4 chained architectural renders approved + Canonical Dark Monograph scroll-driven pitch website (`website-v2/`) built, verified, and adopted as the main building block. Ready for Phase 2 (Requester BOQ/Cost numbers + Interactive 3D Orbit / Blender integration + Investor deployment).

---

## 1. Project Idea, Vision & Architectural Ground Truth

### 1.1 Business & Narrative Idea
We are building an investor pitch experience for a **~20,000+ sq. ft. Modern-Bali Rooftop Wellness Sanctuary** (conceptual target envelope **~₹5–6 Crore**).
- **The "One Continuous Space" Thesis:** Rather than pitching three disconnected businesses (a gym, a salon, and a café), the website walks investors through **one unified architectural ritual** anchored strictly to the **real building silhouette** captured from satellite imagery (`docs/image/map-view.png`) and the zoning blueprint (`docs/image/map-view-straightened.png`).
- **16-Hour Utilization Engine:** Standalone fitness clubs sit under-utilized from 10:00 AM to 5:00 PM. By uniting a 3-bay fitness pavilion and perimeter running track (morning/evening peaks) with a botanical Bali café (midday corporate lunches for 100+ in-building office professionals), contrast recovery (sauna + cold plunge), a northwest luxury salon, and a semicircular vanishing-edge infinity pool, the roof generates compounding high-margin revenue from dawn (`06:30`) to twilight (`19:30+`).

### 1.2 Spatial Zones (8 Active Zones + 1 Excluded Utility Core)

| Area | Pin / Code | Zone | Architectural Spec & Locked Decisions |
| :--- | :--- | :--- | :--- |
| **North Crown** | `01` / `P` | **Semicircular Infinity Pool** | Travertine-coped lap basin extended northward **strictly inside** the north semicircular dome with a **flush vanishing rim** merging into the emerald tree canopy (no tall parapet wall blocking the horizon). |
| **North Stepped Wings** | `02` / `C` | **Wrap-Around Bali Café** | Symmetrical left & right stepped Burmese teak pergola wings framing the pool, monolithic travertine espresso/protein bar, and warm 2700K woven rattan pendants. |
| **Northwest Wing** | `03` / `S` | **The Atelier Luxury Salon** | Enclosed frameless glass-and-teak northwest pavilion with overhead skylight strips, warm backlit brushed-brass arched mirrors, and serene Bali spa acoustics. |
| **Northeast Corridor** | `04` / `R` | **Contrast Recovery Suite** | Timber-slatted cedar dry sauna and volcanic basalt cold plunge suite positioned at the threshold between the East Promenade and North Pool deck. |
| **East Spine** | `05` / `EAST` | **East Promenade & Curved Balcony** | Open-air teak and limestone stepping-stone boardwalk flanked by tropical palms, opening onto the building’s true **single** curved projecting eastern balcony lounge (never double-stacked). |
| **South Perimeter** | `06` / `TRACK` | **Perimeter Sky Running Track** | Continuous 2-lane cushioned **terracotta EPDM** running loop encircling the entire South Rectangular Slab, bordered by frameless safety glass balustrades and 2700K bronze bollards. |
| **South Pavilion (West)** | `07` / `G.CLASS` | **Group Classes Studio** | Sunlit western glass bay with sprung Burmese teak hardwood flooring and sliding glass walls for yoga, mobility, breathwork, and HIIT. |
| **South Pavilion (Center)** | `08` / `PILATES` | **Reformer Pilates Studio** | Daylight-washed center glass bay under a louvered translucent skylight roof housing twin rows of handcrafted oak reformer beds, acoustically isolated from the gym. |
| **South Pavilion (East)** | `09` / `GYM` | **Strength & Conditioning Gym** | Obsidian-and-teak eastern glass bay with matte-black power racks, calibrated free weights, charcoal acoustic rubber flooring, and 2700K recessed linear lighting (sized for a **400–500 active member cap**). |
| **Central-Left Core** | `MEP` / `UTILITY` | **Screened Mechanical Core** | Red box + yellow `X` on markup. **Strictly non-usable utility footprint** — zero guest amenities inside; existing chillers remain 100% untouched and serviceable behind tall dark-teak vertical louvers and hydroponic tropical living walls. |

---

## 2. Decision Log & Design Evolution

1. **Adoption of `website-v2/` as Canonical & Retirement of `web/` (v1):**
   - `web/` (v1) explored a light-mode (`#F5F1EB`) 6-chapter layout with longer descriptive copy.
   - `website-v2/` re-imagined the pitch as **"A Monograph in Elevation"** — a 10-chapter choreographed spatial walkthrough featuring a scroll-expanding arched portal hero, 3-stage blueprint vector trace, north-to-south spotlight plan walk, and optical camera zoom across the renders.
   - Following user review, `website-v2/` was refined into a **Full Dark Obsidian & Brushed Brass Monograph Theme** with **`Instrument Serif` + `DM Sans` + `JetBrains Mono`** typography and **~50% tighter, punchier executive copy**.
   - **Decision:** `website-v2/` is now the **single canonical web codebase** in the repository, and the superseded `web/` (v1) folder has been retired and removed to avoid duplication.

2. **Dark Monograph Visual Design System (`website-v2/src/index.css`):**
   - **Primary Canvas (`--color-obsidian`):** `#0E0D0B` (Deep Volcanic Basalt)
   - **Alternating Chapter Surface (`--color-basalt`):** `#151411` (Warm Basalt Stone)
   - **Elevated Card Surface (`--color-charcoal`):** `#1D1B17` (Roasted Teak Charcoal)
   - **Primary Ink (`--color-travertine`):** `#F5F1EB` (Sun-Warmed Limestone)
   - **Secondary Muted Ink (`--color-stone`):** `#9E9689` (Weathered Concrete)
   - **Luxury Highlight & Active CTAs (`--color-brass`):** `#C8A264` (Brushed Architectural Brass)
   - **Spatial Accents:** Botanical Sage `--color-palm: #78A889`, Sky Track `--color-terracotta: #C86849`, Infinity Pool `--color-lagoon: #3E8E94`
   - **Typography:**
     - Display / Editorial Headings: **`Instrument Serif`** (Regular & Italic `400`, tight tracking `-0.018em`, line-height `0.96`)
     - Body / UI Copy: **`DM Sans`** (`300`/`400`/`500`)
     - Architectural Specs & Coordinates: **`JetBrains Mono`** (uppercase, tracking `0.18em`, `11px`)

---

## 3. Completed Work Inventory

### 3.1 Approved Architectural Render Suite (`docs/image/output/`) — Complete & Committed

All 4 chained renders from `VISUAL_PLAN_PROMPTS.md` were generated, iteratively reviewed, approved, and copied (byte-identical) into `website-v2/public/renders/`:

| Step | Approved Asset | Aspect / Size | Approved From | Chained Reference Inputs |
| :--- | :--- | :--- | :--- | :--- |
| **Source 1** | `docs/image/map-view.png` *(READ-ONLY)* | `848×1920` | Raw satellite footprint | — |
| **Source 2** | `docs/image/map-view-straightened.png` *(READ-ONLY)* | `2302×5211` | Annotated zoning blueprint | — |
| **Prompt 1** | `docs/image/output/masterplan-approved.png` | 9:16 (`768×1376`) | `drafts/masterplan-v3.png` | `map-view.png` + `map-view-straightened.png` |
| **Prompt 2** | `docs/image/output/isometric-approved.png` | 16:9 (`1376×768`) | `drafts/isometric-v4.png` | `map-view.png` + `masterplan-approved.png` |
| **Prompt 3** | `docs/image/output/north-deck-render.png` | 16:9 (`1376×768`) | `drafts/north-deck-v2.png` | `isometric-approved.png` (golden-hour North Deck) |
| **Prompt 4** | `docs/image/output/south-fitness-render.png` | 16:9 (`1376×768`) | `drafts/south-fitness-v1.png` | `isometric-approved.png` (twilight South 3-bay pavilion + track) |

### 3.2 Canonical Pitch Website (`website-v2/`) — Complete & Verified

- **Tech Stack:**
  - **Framework & Build:** Vite 6.4 + React 19.3 + TypeScript 5.9 (`manualChunks` vendor split configured in `vite.config.ts` for zero bundle size warnings)
  - **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom `@theme` tokens and `@utility` rules in `src/index.css`
  - **Motion & Scroll Choreography:** Framer Motion 12.43 (`useScroll`, `useTransform`, `useMotionTemplate`, `AnimatePresence`) + **Lenis 1.3** smooth inertia scrolling (`src/lib/scroll.ts`)
  - **Icons:** Lucide React (`strokeWidth={1.25}`)
  - **Package Manager:** `pnpm` (`v12.21.0`, `node v26.12.1`, with `pnpm-workspace.yaml` enabling `esbuild`)
- **Commands:**
  ```bash
  cd website-v2
  pnpm dev      # Local dev server (http://localhost:5173 — add ?instant=1 to skip preloader)
  pnpm build    # Type-check + production bundle (tsc -b && vite build)
  pnpm preview  # Serve production dist/ locally (http://localhost:4174)
  ```

#### `website-v2/src/` Architecture & 10-Chapter Flow

| File | Responsibility |
| :--- | :--- |
| `src/index.css` | Dark Obsidian theme tokens, `Instrument Serif` + `DM Sans` + `JetBrains Mono` utilities, dark blueprint grid, subtle screen-blended film grain, and `@media print` styles. |
| `src/App.tsx` | Root orchestrator mounting Lenis smooth scroll, `useChapterSpy()`, `Preloader`, `Nav`, `SiteRail`, and Chapters `00`–`09`. |
| `src/lib/scroll.ts` | Lenis smooth-scroll singleton (`initLenis`, `scrollToId`, `scrollToY`, `lockScroll`) with `prefers-reduced-motion` compliance. |
| `src/lib/hud.ts` | External store (`useSyncExternalStore`) syncing active chapter, focused zone IDs, and index drawer state between scroll sections and the persistent HUD. |
| `src/data/siteplan.ts` | Pixel-accurate (`768×1376`) SVG vector geometry (`SILHOUETTE`, `ZONE_PATHS`, `MEP_CROSS`, `ZONE_ANCHORS`, `WALK_ORDER`) matching `masterplan-approved.png`. |
| `src/data/chapters.ts` | Metadata for all 10 chapters (`00 Arrival` → `09 Close`), zone-to-chapter routing, and dark-mode zone highlight colors (`ZONE_TINT`). |
| `src/data/zones.ts` | Concise executive copy, coordinates (`isoCoords`, `planCoords`), highlights, and materials for all 10 spatial zones + 4 `SOUTH_FITNESS_MODULES`. |
| `src/data/financials.ts` | **Single plug-and-play data file** for target envelope, Option A (Base) vs. Option B (Flagship) comparison summaries, 8-row BOQ table, 4-step Synergy Loop, and 3-phase execution roadmap. |
| `src/components/Preloader.tsx` | Animated SVG silhouette draw-in with 000→100 counter (auto-skips on click, `?instant=1`, or reduced motion). |
| `src/components/Nav.tsx` | Fixed frosted-obsidian top bar with live chapter ticker, brushed-brass scroll progress line, `Deck PDF` print action, and full-screen 10-chapter Index drawer with interactive SVG site plan. |
| `src/components/SiteRail.tsx` | Persistent bottom-right frosted-obsidian SVG mini-map showing exact viewer location in real time; click any zone to jump to its chapter. |
| `src/components/Crop.tsx` | Responsive optical camera component (`ResizeObserver` + Framer Motion) that smoothly pans and zooms (`1.18×`–`2.35×`) to any focal coordinate on the approved renders. |
| `src/components/Hero.tsx` | **Ch. 00 (`#arrival`):** Arched Balinese portal framing `north-deck-render.png` that expands on scroll to full-viewport scale as the headline splits apart. |
| `src/components/Manifesto.tsx` | **Ch. 01A (`#site`):** Scroll-illuminated 18-word manifesto + 3 architectural pillars (*I. Sweat · II. Recover · III. Restore*). |
| `src/components/SiteTransformation.tsx` | **Ch. 01B (`#site`):** Sticky 3-stage transformation (`FIG. 01 Satellite As Found` → `FIG. 02 True Silhouette Vector Trace` → `FIG. 03 Masterplan Wipe` with brass laser scanline) + animated counters. |
| `src/components/PlanWalk.tsx` | **Ch. 02 (`#plan`):** Sticky north-to-south walkthrough across all 10 stops (`01` → `09` + `MEP`) with an SVG spotlight mask and brass stroke outline over `masterplan-approved.png`. |
| `src/components/CutawaySection.tsx` | **Ch. 03 (`#cutaway`):** Interactive 16:9 isometric cutaway (`isometric-approved.png`) with 10 pulsing brass pins, `2.15×` Zone Zoom mode, `3D Orbit · Phase 2` slot, and Zone Spec Inspector. |
| `src/components/SweatSection.tsx` | **Ch. 04 (`#sweat`):** Full-bleed twilight `south-fitness-render.png` with camera focus toggle + 4-module switcher (`Terracotta Sky Track`, `Strength Gym`, `Reformer Pilates`, `Group Studio`). |
| `src/components/BridgeSection.tsx` | **Ch. 05 (`#bridge`):** High-zoom optical crops (`2.0×`–`2.35×`) of the `Palm Promenade & Curved Eastern Balcony`, `Contrast Recovery Suite`, and `Screened Mechanical Core`. |
| `src/components/CrownSection.tsx` | **Ch. 06 (`#crown`):** Golden-hour `north-deck-render.png` with zoom inspection and 3-column monograph showcase (`Semicircular Infinity Pool`, `Wrap-Around Bali Café`, `Atelier Luxury Salon`). |
| `src/components/RitualSection.tsx` | **Ch. 07 (`#ritual`):** Circadian 16-hour utilization timeline (`06:30 Dawn` → `19:30 Twilight`) synced live to the true-silhouette footprint map. |
| `src/components/CaseSection.tsx` | **Ch. 08 (`#case`):** 4-step Synergy Loop, Option A (Base Sanctuary) vs. Option B (+ Pool & Sky Track) toggle with live footprint map, 8-row BOQ table, and 3-phase execution roadmap. |
| `src/components/CloseSection.tsx` | **Ch. 09 (`#close`):** Investor colophon with `[ Schedule Site Survey ]` interactive checklist modal, `[ Download Concept Deck ]` PDF trigger, and true-silhouette seal. |

---

## 4. Next Phases Roadmap (Pick One Task Per Turn)

### Phase 2A — Requester Financial & BOQ Lock + Copy Tweaks (When Numbers Arrive)
Once the requester shares final cost estimates, option deltas, and timeline figures:
1. Edit `website-v2/src/data/financials.ts`:
   - Switch `FINANCIAL_DATA_STATUS` from `'PENDING_REQUESTER_DATA'` → `'CONFIRMED'`.
   - Update `FINANCIAL_META.targetEnvelope` if revised.
   - Populate `totalCapex` and `timelineEstimate` in `OPTION_SUMMARIES.base` and `OPTION_SUMMARIES.full`.
   - Populate `baseCost`, `fullCost`, and `variance` across all 8 rows in `COST_COMPARISON_ROWS` (or add/adjust BOQ work packages).
2. Apply any specific copy/estimate refinements requested by the user across `website-v2/src/data/zones.ts` or section components.
3. Run `cd website-v2 && pnpm build` and verify in headless Chrome.

### Phase 2B — Interactive 3D Architectural Massing / Blender Integration (`3D Orbit · Phase 2`)
Activate the reserved `3D Orbit · Phase 2` tab inside `website-v2/src/components/CutawaySection.tsx` via one of two tracks:
- **Track 1 (Self-Contained WebGL / Three.js True-Silhouette Massing Viewer):** Extrude the exact SVG coordinates from `website-v2/src/data/siteplan.ts` into an interactive 3D architectural maquette right in the browser (stepped north dome with glowing turquoise infinity pool, slatted teak café pergolas, single curved eastern balcony, louvered dark-teak mechanical core with green walls, 3-bay glass-and-teak south pavilion, and terracotta running track) with orbit controls, day/night lighting toggle, and clickable 3D zone pins.
- **Track 2 (Blender + MCP 3D Greybox Workflow):** Guided installation of Blender + `mcp-for-blender` (following the user's YouTube tutorial workflow) to model and export `rooftop-sanctuary.glb` into `website-v2/public/models/`.
- *(Guardrail: Always ask explicit user confirmation before installing Three.js / `@react-three/fiber` or Blender).*

### Phase 2C — Mobile / Print Deck Polish & Live Investor URL Deployment
1. Run a dedicated mobile viewport (`390×844`) and landscape A4 print/PDF (`@media print`) visual QA pass across all 10 chapters of `website-v2/`.
2. Optional one-command static deployment (Vercel / Cloudflare Pages / Firebase Hosting) with optional passcode gate for sharing the live interactive link with investors.

---

## 5. Standing Workspace Rules (`AGENTS.md` Summary — Mandatory)

1. **NEVER Run Write/Destructive Git Commands:** The user manages all Git writes manually in a separate Ghostty terminal window. Never run `git add`, `git commit`, `git push`, `git reset`, `git rebase`, or `git checkout`.
2. **One Task Per Turn:** Execute one discrete task at a time, then **stop and wait** for user review, commit, and approval.
3. **Mandatory End-of-Task Block:** Always end every completed task with the exact `### Git Checkpoint` block.
4. **Protect Source Assets:** Never modify, move, or delete `docs/image/map-view.png`, `docs/image/map-view-straightened.png`, or originals in `docs/image/output/`. Always copy into `website-v2/public/renders/`.
5. **Ask Before Heavy/Destructive Actions:** Confirm before running `rm`, overwriting an approved render, or installing heavy 3D dependencies.
6. **`context-mode` Index Hygiene:** Keep `project:floorplan-rendering-project` indexed via `context-mode` whenever text/code files change.

---

## 6. Starter Prompt for Resuming in Any New Session

```text
Read AGENTS.md and CHECKPOINT_HANDOFF.md first to restore full project context.
Note that website-v2/ ("A Monograph in Elevation — Dark Obsidian Edition") is now our single canonical web application.
Follow all AGENTS.md rules strictly (never run git write commands, one task per turn, protect docs/image/* originals, and end with the Git Checkpoint block).
Wait for my instruction on whether we are starting Phase 2A (plugging in requester BOQ/cost numbers and copy tweaks), Phase 2B (3D Orbit / Blender massing integration), or Phase 2C (PDF/mobile polish & deployment).
```
