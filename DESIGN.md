# DESIGN.md — The Rooftop Sanctuary (20,000 Sq. Ft. Architectural Pitch Experience)

> **Purpose of this Document:** This file serves as the visual design foundation for the interactive, scroll-driven architectural presentation website.
> **Business Objective:** Secure ₹5–6 Crore in investment by transforming an unmeasured, raw \~20,000 sq. ft. rooftop/top-floor office space into a unified, luxury **Bali-themed Lifestyle Hub** housing a **Gym, Salon, and Café** (with modular exploration of a **Pool & Perimeter Track**).
>
> **Canonical v2 Implementation Note (`website-v2/` — Dark Monograph Edition):**
> The live application in `website-v2/` implements this specification locked to the **true 8-zone building silhouette** (see `AGENTS.md` and `CHECKPOINT_HANDOFF.md`) using a full **Dark Volcanic Obsidian & Brushed Brass Monograph theme** (`#0E0D0B` Obsidian, `#151411` Basalt, `#1D1B17` Charcoal, `#F5F1EB` Travertine ink, `#9E9689` Stone, `#C8A264` Brushed Brass, `#78A889` Botanical Sage, `#C86849` Terracotta, `#3E8E94` Lagoon) paired with **`Instrument Serif`** (display headings), **`DM Sans`** (body copy), and **`JetBrains Mono`** (technical specs).

## 1. Core Concept & Narrative Strategy

### The "One Continuous Space" Illusion

Investors must not feel like they are looking at three separate businesses pasted onto a webpage. The entire scrolling experience should feel like an **architectural walkthrough** of a single, massive 20,000+ sq. ft. luxury destination.

* **Core Theme:** *Modern Balinese Tropical Minimalism* (inspired by Aman Resorts, Potato Head Bali, and Architectural Digest editorial layouts).

* **The Transformation Arc:** Start with the raw potential of an empty rooftop shell and progressively unveil how movement (Gym), grooming/recovery (Salon), and social nutrition (Café) coexist under one roof.

* **Tone & Feel:** Editorial, serene, ultra-premium, grounded in architectural rigor, and investor-ready. **Strictly avoid** generic dark-neon gym clichés or cluttered SaaS layouts.

## 2. Visual Design System

### Color Palette (Tropical Stone & Warm Teak)

Use light, sunlit organic tones for the Salon/Café/Overview sections and deeper, moody teak-and-obsidian contrasts for the Gym and Investor Data sections to create natural visual pacing as the user scrolls.

| Token | Role | Hex | Visual Reference | 
| ----- | ----- | ----- | ----- | 
| `--bg-travertine` | Primary Canvas | `#F5F1EB` | Sun-warmed limestone / Bali plaster | 
| `--bg-sand` | Secondary Surface / Cards | `#EAE3D9` | Soft raw linen & stone | 
| `--bg-obsidian` | High-Contrast / Gym Zone | `#161614` | Volcanic basalt stone | 
| `--text-espresso` | Primary Ink (Light Mode) | `#1F1D1A` | Deep roasted teak | 
| `--text-stone` | Secondary / Muted Ink | `#6B655C` | Weathered concrete | 
| `--accent-palm` | Botanical / Active Highlight | `#2F4838` | Deep tropical monstera leaf | 
| `--accent-brass` | Luxury Highlight / CTAs | `#B8935A` | Brushed architectural brass | 
| `--border-hairline` | Architectural Grid Lines | `rgba(31, 29, 26, 0.12)` | Blueprint drafting rules | 

### Typography Hierarchy

Pair an editorial high-fashion serif with a crisp modern sans-serif and a technical monospace for architectural measurements.

* **Display / Editorial Headings:** `Cormorant Garamond` or `Playfair Display` (Light 300 / Regular 400, tight letter-spacing `-0.02em`, generous line-height `1.05`).

* **UI / Body Copy:** `Plus Jakarta Sans` or `Inter` (Regular 400 / Medium 500, clean readability for investor narratives).

* **Architectural Specs & Coordinates:** `JetBrains Mono` or `IBM Plex Mono` (Uppercase, wide tracking `0.12em`, `11px–13px` — used for square footage, zone numbers `ZONE 01 // 09,000 SQ.FT`, and financial figures).

### Surfaces, Borders & Lighting

* **Grid & Drafting Feel:** Subtle 1px hairline dividers (`--border-hairline`) to evoke real architectural blueprints.

* **Image Framing:** Full-bleed edge-to-edge architectural renders or sharp minimal radius (`4px` to `8px` max). Avoid heavy drop shadows or bouncy rounded cards.

* **Glassmorphism (HUD only):** Frosted translucent stone (`backdrop-filter: blur(16px)`) for floating navigation and the spatial mini-map.

## 3. Scroll Architecture & Spatial UX Mechanics

To visually prove that all three pillars live in **one unified 20,000 sq. ft. footprint**, implement the following persistent and scroll-linked elements:

1. **Persistent Spatial Mini-Map (Floating Bottom-Right or Left Rail HUD):**

   * A minimalist, schematic SVG architectural floorplan of the 20,000 sq. ft. rectangular rooftop footprint.

   * Divided into labeled architectural blocks: `[01 GYM]`, `[02 SALON]`, `[03 CAFÉ]`, and `[04 DECK / TRACK / POOL]`.

   * **Behavior:** As the user scrolls into each chapter, the corresponding zone on the mini-map illuminates in `--accent-palm` or `--accent-brass`, showing where the viewer is standing inside the space. Clicking a zone smoothly scrolls to that render.

2. **Sticky Split-Screen / Full-Bleed Parallax Transitions:**

   * Transitions between zones should feel like walking through arched teak doorways or open-air breezy corridors—using smooth opacity crossfades, slow scale-in (`1.05 -> 1.0`) on 3D architectural renders, and pinned narrative captions.

3. **Top Architectural Progress Bar:**

   * Displays current scroll chapter in monospace: `00 VISION — 01 MASTERPLAN — 02 GYM — 03 SALON — 04 CAFÉ — 05 AMENITIES — 06 INVESTMENT`.

## 4. Section-by-Section Scroll Blueprint

### Chapter 00: Hero — The Blank Canvas to Sanctuary

* **Layout:** Full-viewport (`100vh`) interactive **Before / After Architectural Reveal**.

* **Visual:** A draggable vertical split-slider (or scroll-scrubbed transition) that wipes from a desaturated photo of a raw empty 20,000 sq. ft. concrete top floor into a lush, sunlit Bali-themed architectural master render.

* **Typography Overlay:**

  * Eyebrow (`Mono`): `ROOFTOP CONCEPT PROPOSAL // ~20,000+ SQ. FT.`

  * Headline (`Serif`): *A Living Sanctuary Above the City.*

  * Subcopy (`Sans`): *One unified destination uniting high-performance fitness, luxury grooming, and botanical dining.*

* **Cue:** Minimalist scroll indicator (`SCROLL TO WALK THE SPACE ↓`).

### Chapter 01: The Master Spatial Plan (Bird's-Eye Architecture)

* **Layout:** Full-width architectural overview (`--bg-travertine`) featuring an isometric/top-down 3D cutaway render of the entire 20,000 sq. ft. floorplate.

* **Interactive Hotspots:** Pulsing brass architectural pins placed directly on the floorplan render. Hovering or clicking reveals quick specs:

  * **Zone 01 — The Performance Studio (Gym):** \~45% Footprint (\~9,000 sq. ft.)

  * **Zone 02 — The Atelier (Luxury Salon):** \~20% Footprint (\~4,000 sq. ft.)

  * **Zone 03 — The Canopy (Social Café):** \~20% Footprint (\~4,000 sq. ft.)

  * **Zone 04 — Open-Air Circulation / Optional Track & Plunge Deck:** \~15% Footprint (\~3,000 sq. ft.)

* **Disclaimer Note (Important for Investors):** Subtle architectural stamp in monospace: `*CONCEPTUAL MASSING RENDER — SUBJECT TO FINAL SITE SURVEY & EXACT STRUCTURAL MEASUREMENTS.*`

### Chapter 02: Zone 01 — The Sanctuary Gym (Sweat & Strength)

* **Mood Shift:** Smooth transition to dark volcanic stone (`--bg-obsidian`) with warm golden-hour sunlight slicing across the render.

* **Layout:** Sticky full-bleed 3D render on one side (or full background) with scrolling editorial cards detailing key design moments:

  * **Aesthetic:** Matte black bespoke equipment, ribbed teak timber walls, raw concrete columns softened by cascading tropical ferns, and floor-to-ceiling glass.

  * **Spatial Highlights:** Free-weight terrace, functional turf corridor, recovery stretching alcove, and seamless acoustic separation from the Salon and Café.

  * **Key Callout:** Designed to comfortably support **400–500 active members** without crowding, balancing exclusivity with healthy business volume.

### Chapter 03: Zone 02 — The Atelier Salon (Luxury Grooming)

* **Mood Shift:** Transition back to serene sunlit limestone (`--bg-travertine` & `--bg-sand`).

* **Layout:** Asymmetric editorial gallery — one large hero 3D render of the styling floor paired with two close-up architectural detail views (wash stations & private VIP suite).

* **Aesthetic:** Sculpted arched mirrors, travertine stone counters, linen drapes, warm recessed cove lighting, indoor olive/palm planters, and Bali spa acoustics.

* **Business Highlight Card:** Showcases the high-margin luxury service positioning (e.g., bespoke haircuts, grooming, manicure/pedicure rituals) that captures both office-building footfall and destination luxury clientele.

### Chapter 04: Zone 03 — The Canopy Café (Refuel & Social Anchor)

* **Mood Shift:** Warm organic terracotta, woven rattan, and lush botanical greens (`--accent-palm` accents).

* **Layout:** Panoramic horizontal-feel scroll or full-bleed architectural showcase showing how the Café physically bridges the Gym and Salon.

* **Aesthetic:** Open-air pergola canopy, rattan pendant lamps, terrazzo coffee bar, sunlit communal teak tables, and indoor-outdoor seating overlooking the skyline.

* **Role in the Ecosystem:** Acts as the daily revenue engine and social third-place—serving post-workout protein bowls/specialty coffee to gym members, refreshments to salon guests, and lunch/meetings for the office building below.

### Chapter 05: Modular Expansion — The Track & Plunge Pool Study

* **Purpose:** Directly addresses the investors' curiosity about adding a **running track** and **pool** while demonstrating thoughtful financial and spatial discipline.

* **Layout:** Interactive **Toggle Comparison Module** (`[ Base Sanctuary Plan ]` vs. `[ + Perimeter Track & Plunge Pool Option ]`).

* **Visuals:** Swaps the outdoor deck 3D render between a lush landscaped lounge terrace and an upgraded version featuring a perimeter rubberized sky-track and a Bali stone infinity plunge/lap pool.

* **Advisory Note:** Clearly presents structural feasibility considerations, CapEx impact, and ROI pacing—proving the team thinks like business operators, not just decorators.

### Chapter 06: The Ecosystem & Investment Case (Investor Close)

* **Layout:** Clean architectural grid of metric blocks (`1px` borders, monospace figures, zero fluff).

* **Content Blocks:**

  1. **The Synergy Loop:** Visual diagram showing how `100+ In-Building Office Professionals` + `Destination Members` cross-pollinate across Gym → Café → Salon.

  2. **Capital Scope:** Highlighting the estimated **₹5–6 Crore** build-out vision across interiors, equipment, salon stations, and kitchen infrastructure.

  3. **Next Milestones:** `01 Site Measurements & Structural Audit` → `02 Final CAD & BOQ` → `03 Execution Timeline`.

* **Footer CTA:** Clean architectural sign-off with buttons for `[ Download Concept Deck ]` and `[ Schedule Site Survey ]`.

## 5. Instructions for AI Tools (Claude Code / MiniMax-M3 / Google Stitch)

### For Google Stitch (UI/Mockup Generation)

* Generate desktop-first (`1440px` frame) long-scroll screens with generous negative space (`120px–160px` vertical padding between chapters).

* Treat photography/render slots as **architectural full-bleed canvases** with subtle dark/light gradient scrims only where text sits directly over imagery.

* Maintain strict visual cohesion: every screen must share the exact Travertine (`#F5F1EB`), Obsidian (`#161614`), Palm (`#2F4838`), and Brass (`#B8935A`) tokens.

### For Claude Code / MiniMax-M3 (Interactive Prototype Implementation)

* **Recommended Stack:** Single-page React (or Next.js / Vite) + Tailwind CSS + Framer Motion (or GSAP ScrollTrigger) + Lucide Icons (thin `1.25px` stroke width).

* **Interactive Must-Haves:**

  * Working Before/After drag slider in the Hero section.

  * Working scroll-synced SVG Mini-Map HUD that updates active zone state on scroll (`IntersectionObserver` or `useScroll`).

  * Working toggle switch in Chapter 05 (Base Layout vs. Pool & Track Upgrade) that updates both the architectural render and the spec summary.

  * Smooth scroll behavior and subtle reveal animations (`opacity: 0, y: 24` -> `opacity: 1, y: 0`, duration `0.8s`, cubic-bezier `[0.22, 1, 0.36, 1]`).

* **Placeholder Handling:** Until final 3D renders are dropped in, build clean architectural placeholder containers with aspect ratios (`16:9` for panoramas, `4:5` for detail cards), subtle blueprint grid patterns, and embedded captions specifying which render belongs there.

## 6. Consistent 3D Architectural Render Prompts (Asset Guide)

Use these prompts in Midjourney / Imagen / Flux to generate cohesive, matching 3D renders for every scroll section so the space looks like **one unified building**:

> **Global Style Suffix (append to every prompt for visual continuity):**
> *"...photorealistic architectural visualization, Unreal Engine 5 archviz, modern Balinese luxury tropical minimalism, warm travertine stone, fluted teak wood, raw architectural concrete, lush indoor monstera and tropical palms, golden hour sunlight streaming through floor-to-ceiling glass, shot on 24mm architectural lens, Architectural Digest style, 8k, no people --ar 16:9"*

1. **Master Isometric Cutaway (Chapter 01):**
   `Architectural isometric 3D cutaway floorplan of a massive 20,000 square foot rooftop luxury wellness club, seamlessly divided into three connected zones: a modern timber-and-glass gym, a serene stone luxury hair salon, and an open-air tropical canopy cafe, surrounded by a perimeter rooftop track and lush Bali greenery... [Global Style Suffix]`

2. **Zone 01 — Gym Render (Chapter 02):**
   `Wide interior architectural render of a luxury Bali-themed rooftop gym, matte black strength equipment, fluted teak wood walls, exposed dark volcanic stone accents, floor-to-ceiling glass overlooking a city skyline with tropical plants along the perimeter... [Global Style Suffix]`

3. **Zone 02 — Salon Render (Chapter 03):**
   `Wide interior architectural render of an ultra-luxury Bali resort style hair and grooming salon, curved travertine stone styling stations, tall arched brushed brass mirrors, warm cove lighting, linen curtains, indoor tropical greenery, serene spa atmosphere... [Global Style Suffix]`

4. **Zone 03 — Café Render (Chapter 04):**
   `Wide architectural render of an open-air rooftop luxury Bali canopy cafe connected to a wellness club, woven rattan pendant lights, terrazzo espresso bar, warm teak wood communal tables, lush hanging ferns, breezy indoor-outdoor flow... [Global Style Suffix]`

5. **Zone 04 — Optional Pool & Track Deck (Chapter 05):**
   `Wide architectural render of a luxury rooftop wellness terrace featuring a sleek dark-stone Balinese lap plunge pool lined with teak sunbeds and a minimalist terracotta-toned perimeter running track framed by lush palms... [Global Style Suffix]`