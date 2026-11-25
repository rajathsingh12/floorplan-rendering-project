# Rooftop Sanctuary — Model Handoff & Project Checkpoint

> **Purpose:** Self-contained project state, architectural decisions, design system, codebase map, live deployment architecture, and prioritized pending roadmap so any AI coding model or new session can resume work immediately without re-discovering context or workspace guardrails.
>
> **Last Updated:** 2026-11-26  
> **Workspace Root:** `/Users/rajaths/experiments/floorplan-rendering-project`  
> **Canonical Web Application:** `website-v2/` (*"A Monograph in Elevation — Dark Obsidian Edition"*; `web/` v1 retired by user decision)  
> **Live Production URL (GitHub Pages):** `https://rajathsingh12.github.io/floorplan-rendering-project/` (Auto-deploys on push to `main` via `.github/workflows/deploy-pages.yml`)  
> **Current Status:**
> - **Renders 1–4 Approved & Live:** `masterplan-approved.png`, `isometric-approved.png`, `north-deck-render.png`, `south-fitness-render.png`.
> - **Prompts 5–6 Ready (Pending User Image Generation):** Dedicated `16:9` eye-level prompts for **Wrap-Around Bali Café** (`bali-cafe-render.png`) and **The Atelier Luxury Salon** (`atelier-salon-render.png`) documented in `VISUAL_PLAN_PROMPTS.md`.
> - **11-Chapter Pitch Website (`00`–`10`) Built & Deployed:** Includes standalone **Ch. 04 Interactive 3D Architectural Maquette** (`MaquetteSection.tsx` + `OrbitMaquette.tsx` with 3D gym machines, Pilates reformers, pergola rafters, and 6 camera presets) and **Ch. 09 Itemized CapEx Explorer** (`CaseSection.tsx` + `financials.ts` synced with 56 line items / `₹2.89 Cr` logged so far from `docs/estimates.xlsx`).

---

## 1. Project Idea, Vision & Architectural Ground Truth

### 1.1 Business & Narrative Idea
We are building an investor pitch experience for a **~20,000+ sq. ft. Modern-Bali Rooftop Wellness Sanctuary** (conceptual target envelope **~₹5–6 Crore**).
- **The "One Continuous Space" Thesis:** Rather than pitching three disconnected businesses (a gym, a salon, and a café), the website walks investors through **one unified architectural ritual** anchored strictly to the **real building silhouette** captured from satellite imagery (`docs/image/map-view.png`) and the zoning blueprint (`docs/image/map-view-straightened.png`).
- **16-Hour Utilization Engine:** Standalone fitness clubs sit under-utilized from 10:00 AM to 5:00 PM. By uniting a 3-bay fitness pavilion and perimeter running track (morning/evening peaks) with a botanical Bali café (midday corporate lunches for 100+ in-building office professionals), contrast recovery (sauna + cold plunge + physio), a northwest luxury salon, and a semicircular vanishing-edge infinity pool, the roof generates compounding high-margin revenue from dawn (`06:30`) to twilight (`19:30+`).

### 1.2 Spatial Zones (8 Active Zones + 1 Excluded Utility Core)

| Area | Pin / Code | Zone | Architectural Spec & Locked Decisions |
| :--- | :--- | :--- | :--- |
| **North Crown** | `01` / `P` | **Semicircular Infinity Pool** | Travertine-coped lap basin extended northward **strictly inside** the north semicircular dome with a **flush vanishing rim** merging into the emerald tree canopy (no tall parapet wall blocking the horizon). |
| **North Stepped Wings** | `02` / `C` | **Wrap-Around Bali Café** | Symmetrical left & right stepped Burmese teak pergola wings framing the pool, monolithic travertine espresso/protein bar, and warm 2700K woven rattan pendants. |
| **Northwest Wing** | `03` / `S` | **The Atelier Luxury Salon** | Enclosed frameless glass-and-teak northwest pavilion with overhead skylight strips, warm backlit brushed-brass arched mirrors, and serene Bali spa acoustics. |
| **Northeast Corridor** | `04` / `R` | **Contrast Recovery Suite** | Timber-slatted cedar dry sauna, volcanic basalt cold plunge, and physio/recovery treatment suite positioned at the threshold between the East Promenade and North Pool deck. |
| **East Spine** | `05` / `EAST` | **East Promenade & Curved Balcony** | Open-air teak and limestone stepping-stone boardwalk flanked by tropical palms, opening onto the building’s true **single** curved projecting eastern balcony lounge (never double-stacked). |
| **South Perimeter** | `06` / `TRACK` | **Perimeter Sky Running Track** | Continuous 2-lane cushioned **terracotta EPDM** running loop encircling the entire South Rectangular Slab, bordered by frameless safety glass balustrades and 2700K bronze bollards. |
| **South Pavilion (West)** | `07` / `G.CLASS` | **Group Classes Studio** | Sunlit western glass bay with sprung Burmese teak hardwood flooring and sliding glass walls for yoga, mobility, breathwork, and HIIT. |
| **South Pavilion (Center)** | `08` / `PILATES` | **Reformer Pilates Studio** | Daylight-washed center glass bay under a louvered translucent skylight roof housing twin rows of handcrafted oak reformer beds, acoustically isolated from the gym. |
| **South Pavilion (East)** | `09` / `GYM` | **Strength & Conditioning Gym** | Obsidian-and-teak eastern glass bay with commercial cardio machines, selectorized & plate-loaded strength machines, cable crossovers, free weights, charcoal acoustic rubber flooring, and 2700K recessed linear lighting (sized for a **400–500 active member cap**). |
| **Central-Left Core** | `MEP` / `UTILITY` | **Screened Mechanical Core** | Red box + yellow `X` on markup. **Strictly non-usable utility footprint** — zero guest amenities inside; existing chillers and twin cooling towers remain 100% untouched and serviceable behind tall dark-teak vertical louvers and hydroponic tropical living walls. |

---

## 2. Decision Log & Design Evolution

1. **Adoption of `website-v2/` as Canonical & Retirement of `web/` (v1):**
   - `website-v2/` (*"A Monograph in Elevation — Dark Obsidian Edition"*) is the **single canonical web codebase** in the repository (`web/` v1 was retired and removed).
   - Built with a **Full Dark Obsidian & Brushed Brass Monograph Theme**, **`Instrument Serif` + `DM Sans` + `JetBrains Mono`** typography, and punchy executive copy across **11 chapters (`00`–`10`)**.

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

3. **Promotion of Interactive 3D Maquette to Standalone Chapter `04` (`#maquette`):**
   - Rather than squeezing the 3D stage inside Chapter `03` (`CutawaySection.tsx`), the interactive 3D architectural maquette was promoted to its own full-bleed chapter (**Ch. 04 — `MaquetteSection.tsx` + `OrbitMaquette.tsx`**) with an expansive stage (`max-w-[1720px]`, `h-[clamp(640px,82vh,920px)]` + `100vw×100vh` Fullscreen mode).
   - `OrbitMaquette.tsx` uses a zero-dependency, self-contained 2.5D/3D procedural engine extruding exact SVG coordinates from `siteplan.ts` with outward-wound backface-culled 3D solids, fractional layer sorting, 6 camera presets, `2700K Twilight` / `Golden Hour` lighting toggle, `Roof X-Ray` cutaway toggle, `Turntable` auto-orbit, and detailed 3D Gym machines inside Bay `09 · GYM`.
   - All 10 zone selector buttons below `MaquetteSection.tsx` and `CutawaySection.tsx` use multi-line soft-wrapping (`text-pretty break-words leading-snug`, `min-h-[76px]`) so every zone title displays in full without truncation.

4. **Itemized CapEx & Equipment Schedule Explorer (`docs/estimates.xlsx` → `financials.ts` + `CaseSection.tsx`):**
   - Extracted all **56 line items (`₹2,88,97,000` / `₹2.89 Cr`)** currently entered in `docs/estimates.xlsx` (`Sheet1`) into `website-v2/src/data/financials.ts` (`ESTIMATE_SCHEDULES`, `SHEET_TOTALS`, `FINANCIAL_DATA_STATUS = 'PARTIAL_SHEET_SYNC'`).
   - Built an interactive 4-department CapEx Explorer inside **Ch. 09 (`CaseSection.tsx`)** showing stacked allocation against the `₹5–6 Cr` target envelope, **Equipment (`₹1.93 Cr` · 67%) vs. Interior & MEP (`₹96.35 L` · 33%)** split, `LOGGED` vs `PARTIAL` status pills, category filters (`All` / `Equipment` / `Interior`), `QTY ×N` badges, `Expand All / Compact` view with `data-lenis-prevent`, and an auto-linked Master Architectural Rollup table.

5. **GitHub Pages Live Deployment & Subpath Asset Resolution (`.github/workflows/deploy-pages.yml`):**
   - Repository `https://github.com/rajathsingh12/floorplan-rendering-project` is **Public** and deploys automatically to **`https://rajathsingh12.github.io/floorplan-rendering-project/`** via GitHub Actions (`deploy-pages.yml`) on every push to `main`.
   - `website-v2/vite.config.ts` reads `VITE_BASE_PATH` (`/floorplan-rendering-project/` in CI, `/` locally), and all image paths use `import.meta.env.BASE_URL` via `RENDERS` in `website-v2/src/components/Crop.tsx` and `%BASE_URL%` in `website-v2/index.html`.

---

## 3. Completed Work Inventory

### 3.1 Architectural Render Suite (`docs/image/output/` + `website-v2/public/renders/`)

| Step | Asset Path | Aspect / Size | Status | Chained Reference Inputs |
| :--- | :--- | :--- | :--- | :--- |
| **Source 1** | `docs/image/map-view.png` *(READ-ONLY)* | `848×1920` | **Locked Source** | Raw satellite footprint |
| **Source 2** | `docs/image/map-view-straightened.png` *(READ-ONLY)* | `2302×5211` | **Locked Source** | Annotated zoning blueprint |
| **Prompt 1** | `docs/image/output/masterplan-approved.png` | 9:16 (`768×1376`) | **Approved & Live** (`drafts/masterplan-v3.png`) | `map-view.png` + `map-view-straightened.png` |
| **Prompt 2** | `docs/image/output/isometric-approved.png` | 16:9 (`1376×768`) | **Approved & Live** (`drafts/isometric-v4.png`) | `map-view.png` + `masterplan-approved.png` |
| **Prompt 3** | `docs/image/output/north-deck-render.png` | 16:9 (`1376×768`) | **Approved & Live** (`drafts/north-deck-v2.png`) | `isometric-approved.png` (golden-hour North Deck) |
| **Prompt 4** | `docs/image/output/south-fitness-render.png` | 16:9 (`1376×768`) | **Approved & Live** (`drafts/south-fitness-v1.png`) | `isometric-approved.png` (twilight South 3-bay pavilion + track) |
| **Prompt 5** | `docs/image/output/bali-cafe-render.png` *(target)* | 16:9 (`1376×768`) | **Prompt Ready — Pending Generation** | `north-deck-render.png` (+ `isometric-approved.png`) |
| **Prompt 6** | `docs/image/output/atelier-salon-render.png` *(target)* | 16:9 (`1376×768`) | **Prompt Ready — Pending Generation** | `north-deck-render.png` (+ `isometric-approved.png`) |

### 3.2 Canonical Pitch Website (`website-v2/`) — 11-Chapter Architecture (`00`–`10`)

- **Commands:**
  ```bash
  cd website-v2
  pnpm dev      # Local dev server (http://localhost:5173 — add ?instant=1 to skip preloader)
  pnpm build    # Type-check + production bundle (tsc -b && vite build)
  pnpm preview  # Serve production dist/ locally (http://localhost:4174)
  ```

| File | Responsibility |
| :--- | :--- |
| `src/index.css` | Dark Obsidian theme tokens, `Instrument Serif` + `DM Sans` + `JetBrains Mono` utilities, dark blueprint grid, subtle screen-blended film grain, and `@media print` styles. |
| `src/App.tsx` | Root orchestrator mounting Lenis smooth scroll, `useChapterSpy()`, `Preloader`, `Nav`, `SiteRail`, and Chapters `00`–`10` (11 chapters total). |
| `src/vite-env.d.ts` | Vite client TypeScript declarations (`import.meta.env.BASE_URL`). |
| `src/lib/scroll.ts` | Lenis smooth-scroll singleton (`initLenis`, `scrollToId`, `scrollToY`, `lockScroll`) with `prefers-reduced-motion` compliance. |
| `src/lib/hud.ts` | External store (`useSyncExternalStore`) syncing active chapter, focused zone IDs, and index drawer state between scroll sections and the persistent HUD. |
| `src/data/siteplan.ts` | Pixel-accurate (`768×1376`) SVG vector geometry (`SILHOUETTE`, `ZONE_PATHS`, `MEP_CROSS`, `ZONE_ANCHORS`, `WALK_ORDER`) matching `masterplan-approved.png`. |
| `src/data/chapters.ts` | Metadata for all 11 chapters (`00 Arrival` → `10 Close`), zone-to-chapter routing, and dark-mode zone highlight colors (`ZONE_TINT`). |
| `src/data/zones.ts` | Concise executive copy, coordinates (`isoCoords`, `planCoords`), highlights, and materials for all 10 spatial zones + 4 `SOUTH_FITNESS_MODULES`. |
| `src/data/financials.ts` | All 56 itemized rows from `docs/estimates.xlsx` (`ESTIMATE_SCHEDULES`, `SHEET_TOTALS`: Gym `₹2.47 Cr`, Salon/SPA `₹31.27 L`, Cafe partial `₹6.55 L`, Physio partial `₹4.35 L` = `₹2,88,97,000`), Option A vs. Option B summaries, 8-row Master BOQ Rollup (`COST_COMPARISON_ROWS`), 4-step Synergy Loop, and 3-phase execution roadmap. |
| `src/components/Preloader.tsx` | Animated SVG silhouette draw-in with 000→100 counter (auto-skips on click, `?instant=1`, or reduced motion). |
| `src/components/Nav.tsx` | Fixed frosted-obsidian top bar with live chapter ticker, brushed-brass scroll progress line, `Deck PDF` print action, and full-screen 11-chapter Index drawer with interactive SVG site plan. |
| `src/components/SiteRail.tsx` | Persistent bottom-right frosted-obsidian SVG mini-map showing exact viewer location in real time (auto-hides on `#maquette` so the 3D stage is unobstructed). |
| `src/components/Crop.tsx` | Subpath-safe `RENDERS` registry (`${import.meta.env.BASE_URL}renders/...`) + responsive optical camera component (`ResizeObserver` + Framer Motion) that pans and zooms (`1.18×`–`2.35×`) to any focal coordinate. |
| `src/components/Hero.tsx` | **Ch. 00 (`#arrival`):** Arched Balinese portal framing `north-deck-render.png` that expands on scroll to full-viewport scale. |
| `src/components/Manifesto.tsx` | **Ch. 01A (`#site`):** Scroll-illuminated 18-word manifesto + 3 architectural pillars (*I. Sweat · II. Recover · III. Restore*). |
| `src/components/SiteTransformation.tsx` | **Ch. 01B (`#site`):** Sticky 3-stage transformation (`FIG. 01 Satellite As Found` → `FIG. 02 True Silhouette Vector Trace` → `FIG. 03 Masterplan Wipe` with brass laser scanline). |
| `src/components/PlanWalk.tsx` | **Ch. 02 (`#plan`):** Sticky north-to-south walkthrough across all 10 stops (`01` → `09` + `MEP`) with an SVG spotlight mask and brass stroke outline over `masterplan-approved.png`. |
| `src/components/CutawaySection.tsx` | **Ch. 03 (`#cutaway`):** Interactive 16:9 isometric cutaway (`isometric-approved.png`) with 10 pulsing brass pins, `2.15×` Zone Zoom mode, `Interactive 3D Stage ↘` jump button, and soft-wrapped 10-zone selector grid. |
| `src/components/MaquetteSection.tsx` | **Ch. 04 (`#maquette`):** Dedicated full-width (`max-w-[1720px]`) landing-page chapter housing `OrbitMaquette.tsx`, floating zone HUD overlay, Fullscreen toggle (`100vw×100vh`), and soft-wrapped 10-zone selector grid. |
| `src/components/OrbitMaquette.tsx` | Self-contained 3D architectural massing engine extruding the true building silhouette (`768×1376`) with 6 camera presets, `2700K Twilight` / `Golden Hour` lighting, `Roof X-Ray` cutaway, `Turntable` orbit, animated pool water + waterfall weir, pergola rafters, backlit salon arches, twin 16-sided MEP cooling towers, 8 oak Pilates reformers, and 3D Gym machines (3 treadmills, functional turf lane, Lat Pulldown, Chest Press, 45° Leg Press, Dual Cable Crossover, and Smith Bench Press). |
| `src/components/SweatSection.tsx` | **Ch. 05 (`#sweat`):** Full-bleed twilight `south-fitness-render.png` with camera focus toggle + 4-module switcher (`Terracotta Sky Track`, `Strength Gym`, `Reformer Pilates`, `Group Studio`). |
| `src/components/BridgeSection.tsx` | **Ch. 06 (`#bridge`):** High-zoom optical crops (`2.0×`–`2.35×`) of `Palm Promenade & Curved Eastern Balcony`, `Contrast Recovery Suite`, and `Screened Mechanical Core`. |
| `src/components/CrownSection.tsx` | **Ch. 07 (`#crown`):** Golden-hour `north-deck-render.png` with zoom inspection and 3-column monograph showcase (`Semicircular Infinity Pool`, `Wrap-Around Bali Café`, `Atelier Luxury Salon`). |
| `src/components/RitualSection.tsx` | **Ch. 08 (`#ritual`):** Circadian 16-hour utilization timeline (`06:30 Dawn` → `19:30 Twilight`) synced live to the true-silhouette footprint map. |
| `src/components/CaseSection.tsx` | **Ch. 09 (`#case`):** 4-step Synergy Loop, **Itemized CapEx & Equipment Schedule Explorer** (`docs/estimates.xlsx` 56 items / `₹2.89 Cr` across 4 tabs), Option A vs. Option B toggle with live footprint map, 8-row Master Architectural Rollup table, and 3-phase execution roadmap. |
| `src/components/CloseSection.tsx` | **Ch. 10 (`#close`):** Investor colophon with `[ Schedule Site Survey ]` interactive checklist modal, `[ Download Concept Deck ]` PDF trigger, and true-silhouette seal. |

---

## 4. What Is Pending & Prioritized Next Steps (Pick One Task Per Turn)

### Priority 1 — Dedicated Bali Café & Atelier Salon Eye-Level Renders (`CrownSection.tsx` Cards 2 & 3)
- **What is pending:** Currently, selecting Card 2 (`Wrap-Around Bali Café`) or Card 3 (`The Atelier Luxury Salon`) in **Ch. 07 (`CrownSection.tsx`)** optically zooms into the left/right edges of `north-deck-render.png`, where the café and salon are only partially visible. Two dedicated `16:9` prompts (**Prompt 5** and **Prompt 6** in `VISUAL_PLAN_PROMPTS.md`) have been prepared for the user to run in an image generation session anchored to `docs/image/output/north-deck-render.png`.
- **Next steps once the user provides/approves the two images:**
  1. Save the approved renders to `docs/image/output/bali-cafe-render.png` and `docs/image/output/atelier-salon-render.png` (and copy byte-identical files to `website-v2/public/renders/`).
  2. Add `cafe` (`${BASE_URL}renders/bali-cafe-render.png`) and `salon` (`${BASE_URL}renders/atelier-salon-render.png`) to `RENDERS` in `website-v2/src/components/Crop.tsx`.
  3. Update `website-v2/src/components/CrownSection.tsx` so clicking **Semicircular Infinity Pool**, **Wrap-Around Bali Café**, or **The Atelier Luxury Salon** smoothly crossfades the main `16:9` hero viewport between `RENDERS.north`, `RENDERS.cafe`, and `RENDERS.salon` in full resolution (with optional detail zoom).
  4. Run `cd website-v2 && pnpm build` and verify in headless Chrome.

### Priority 2 — Complete Remaining `docs/estimates.xlsx` CapEx Entries & Finalize Option A vs. Option B Totals
- **What is pending:** `docs/estimates.xlsx` currently has **56 line items (`₹2,88,97,000` / `₹2.89 Cr`)** logged across 4 columns:
  - **Gym (`09`):** `14 items` = `₹2,46,80,000` (`₹2.47 Cr`) — **Complete** (`LOGGED`).
  - **Salon / SPA (`03`):** `24 items` = `₹31,27,000` (`₹31.27 L`) — **Complete** (`LOGGED`).
  - **Café (`02`):** `9 items` = `₹6,55,000` (`₹6.55 L`) — **Partial** (back-of-house appliances, woodwork & electrical logged; *pending commercial espresso machine, grinders, ice/blender bar, travertine counter build, and dual teak pergola + rattan dining furniture*).
  - **Physio & Recovery (`04`):** `9 items` = `₹4,35,000` (`₹4.35 L`) — **Partial** (physio machines, 4 beds, AC & interior logged; *pending cedar dry sauna cabin + heater, volcanic basalt cold plunge chiller tub, and contrast showers*).
  - **Unlogged Architectural & Flagship Packages (~`₹2.10 Cr – ₹3.10 Cr` remaining to complete the `₹5–6 Cr` envelope):**
    - **Pilates (`08`) & Group Studio (`07`):** Reformer Pilates bed fleet (8–10 oak reformer carriages + towers) and sprung Burmese teak studio flooring.
    - **Rooftop Civil, Glass Pavilions & Acoustic MEP Screening:** Structural slab waterproofing, 3-bay architectural steel & skylight glazing, tall dark-teak mechanical core louvers, living green walls, and East Promenade landscaping.
    - **Option B Flagship Additions:** Semicircular Infinity Pool (`01` — structural basin, vanishing-edge balance tank & filtration) and 2-Lane Terracotta EPDM Sky Running Track (`06` — cushioned sub-base, glass balustrades & 2700K bronze bollards).
- **Next steps once the user updates `docs/estimates.xlsx`:**
  1. Re-parse `docs/estimates.xlsx` and update `ESTIMATE_SCHEDULES`, `SHEET_TOTALS`, `OPTION_SUMMARIES`, and `COST_COMPARISON_ROWS` in `website-v2/src/data/financials.ts`.
  2. Flip schedule statuses from `'PARTIAL'` to `'LOGGED'` and `FINANCIAL_DATA_STATUS` from `'PARTIAL_SHEET_SYNC'` to `'CONFIRMED'`.
  3. Rebuild and push to `main` to auto-update the live GitHub Pages site.

### Priority 3 — Phase 2C: Mobile Viewport (`390×844`) & Print-to-PDF (`Deck PDF`) Visual QA
- **What is pending:** Desktop (`1440×900` and `1720px` wide stage) is verified and live, but a dedicated mobile (`390×844`) and print (`@media print` via the navbar `Deck PDF` button) audit across all 11 chapters (`00`–`10`) has not yet been run since adding Chapter `04` (`MaquetteSection.tsx`) and the expanded Chapter `09` (`CaseSection.tsx` CapEx Explorer).
- **Next steps:**
  1. Audit all 11 chapters at `390×844` in headless Chrome, verifying touch ergonomics on `OrbitMaquette.tsx`, horizontal pill scrolling on `CaseSection.tsx`, and mobile typography/spacing.
  2. Refine `@media print` rules in `website-v2/src/index.css` so clicking `Deck PDF` in `Nav.tsx` or `Download Concept Deck` in `CloseSection.tsx` produces a clean, page-break-aligned investor handout including the 3D Maquette snapshot and the full 56-item CapEx schedule.

### Priority 4 (Optional) — Track 2B-2: Blender + MCP `.glb` 3D Asset Pipeline
- **What is pending:** Our procedural 3D Maquette (`OrbitMaquette.tsx`) is live in Chapter `04` with zero external dependencies. If the user later wants to explore the Blender + Claude MCP workflow (`rooftop-sanctuary.glb`), we can model and export a `.glb` scene anchored to `masterplan-approved.png` and `isometric-approved.png`.

---

## 5. Standing Workspace Rules (`AGENTS.md` Summary — Mandatory)

1. **NEVER Run Write/Destructive Git Commands:** The user manages all Git writes manually in a separate Ghostty terminal window. Never run `git add`, `git commit`, `git push`, `git reset`, `git rebase`, or `git checkout`.
2. **One Task Per Turn:** Execute one discrete task at a time, then **stop and wait** for user review, commit, and approval.
3. **Mandatory End-of-Task Block:** Always end every completed task with the exact `### Git Checkpoint` block (note that `git push` automatically triggers `.github/workflows/deploy-pages.yml` to update `https://rajathsingh12.github.io/floorplan-rendering-project/`).
4. **Protect Source Assets:** Never modify, move, or delete `docs/image/map-view.png`, `docs/image/map-view-straightened.png`, or originals in `docs/image/output/`. Always copy into `website-v2/public/renders/`.
5. **Subpath-Safe Asset URLs:** Never hardcode `/renders/...` with a leading slash in `website-v2/src/`; always route through `RENDERS` in `website-v2/src/components/Crop.tsx` (`${import.meta.env.BASE_URL}renders/...`).
6. **Ask Before Heavy/Destructive Actions:** Confirm before running `rm`, overwriting an approved render, or installing heavy 3D dependencies.
7. **`context-mode` Index Hygiene:** Keep `project:floorplan-rendering-project` indexed via `context-mode` whenever text/code files change.

---

## 6. Starter Prompt for Resuming in Any New Session

```text
Read AGENTS.md and CHECKPOINT_HANDOFF.md first to restore full project context.
Note that website-v2/ ("A Monograph in Elevation — Dark Obsidian Edition", 11 chapters 00–10) is our single canonical web application, live at https://rajathsingh12.github.io/floorplan-rendering-project/.
Follow all AGENTS.md rules strictly (never run git write commands, one task per turn, protect docs/image/* originals, use subpath-safe RENDERS paths, and end with the Git Checkpoint block).
Check Section 4 of CHECKPOINT_HANDOFF.md ("What Is Pending & Prioritized Next Steps") and wait for my instruction on which task to execute next:
1. Priority 1: Wiring the new Bali Café & Atelier Salon 16:9 renders into CrownSection.tsx (Prompts 5 & 6)
2. Priority 2: Syncing newly added rows from docs/estimates.xlsx into financials.ts
3. Priority 3: Mobile (390x844) & Print-to-PDF (Deck PDF) visual QA across Chapters 00–10
```
