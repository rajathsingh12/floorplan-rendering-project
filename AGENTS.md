# AGENTS.md — Rooftop Sanctuary (`floorplan-rendering-project`)

> Always-on workspace rules for Antigravity CLI (`agy`) and compatible coding agents.

## 1. Project Overview

We are building a **~20,000+ sq. ft. Modern-Bali Rooftop Wellness Sanctuary** investor pitch (~₹5–6 Cr scope) using the real building silhouette from satellite imagery, paired with a scroll-driven dark-monograph architectural pitch website (`website-v2/`) and optional Phase 2 3D Orbit / Blender greybox integration.

**Active Zones (8 total + 1 Excluded Utility Core):**
- **North Stepped Terrace:** Semicircular Infinity Pool (`P`, flush vanishing rim inside north dome), Wrap-Around Bali Café (`C`, left & right stepped pergola wings), The Atelier Luxury Salon (`S`, northwest glass pavilion).
- **East Corridor:** Contrast Recovery Suite (`R`, northeast sauna & cold plunge) + East Palm Promenade & Single Curved Balcony Lounge (`EAST`).
- **South Rectangular Block:** 3 side-by-side glass-and-teak bays from west to east — Group Classes (`G. Class.`), Reformer Pilates (`Pilates`), and Strength & Conditioning Gym (`GYM`) — encircled by a continuous 2-lane terracotta Perimeter Sky Running Track (`TRACK`).
- **Excluded Mechanical Core (Red Box + Yellow `X`):** Non-usable utility zone (`MEP`). Never design guest amenities inside this footprint; visually screen its perimeter with tall dark-teak louvers and vertical tropical living walls while keeping chillers 100% serviceable.

## 2. Repository Map & Source of Truth

```text
.
├── AGENTS.md                                      # These rules (always active)
├── CHECKPOINT_HANDOFF.md                          # Full project state, decisions, architecture & Phase 2 roadmap
├── DESIGN.md                                      # Visual tokens, scroll architecture & web spec
├── VISUAL_PLAN_PROMPTS.md                         # Chained 2D/3D/eye-level render prompts
├── docs/
│   └── image/
│       ├── map-view.png                           # READ-ONLY: Raw satellite footprint
│       ├── map-view-straightened.png              # READ-ONLY: Annotated zoning blueprint
│       └── output/                                # Generated architectural renders (+ drafts/)
│           ├── masterplan-approved.png            # Prompt 1 output (9:16 2D masterplan)
│           ├── isometric-approved.png             # Prompt 2 output (16:9 3D cutaway)
│           ├── north-deck-render.png              # Prompt 3 output (16:9 eye-level North)
│           └── south-fitness-render.png           # Prompt 4 output (16:9 eye-level South)
└── website-v2/                                    # CANONICAL WEB APP: "A Monograph in Elevation" (Dark Edition)
    ├── public/renders/                            # Byte-identical copies of approved renders + map-view.png
    └── src/
        ├── data/                                  # chapters.ts, siteplan.ts, zones.ts, financials.ts (plug-and-play BOQ)
        ├── lib/                                   # scroll.ts (Lenis), hud.ts (scroll spy & mini-map state), motion.ts
        └── components/                            # Preloader, Nav, SiteRail, SitePlan, Crop + Chapters 00–09
```

- `website-v2/` is the **single canonical web codebase** (the earlier `web/` v1 prototype was retired). Always **copy** approved images from `docs/image/output/` into `website-v2/public/renders/`—never move or delete originals in `docs/image/`.

## 3. Token Efficiency & `context-mode` Rules

This workspace is pre-indexed in `context-mode` under source label:
`project:floorplan-rendering-project`

1. **Search Before Reading:** Query `DESIGN.md`, `VISUAL_PLAN_PROMPTS.md`, and `CHECKPOINT_HANDOFF.md` via `context-mode/ctx_search` or inspect slices via `context-mode/ctx_execute` instead of dumping whole files into context.
2. **Native Reads Only for Edits:** Read raw files natively only when preparing exact line edits.
3. **Keep the Index Clean:** If you create or heavily modify code/Markdown files, include the re-index command in the Git Checkpoint below.

## 4. Two-Window Git Workflow & Task Checkpoints

The user manages all Git operations manually in a separate Ghostty terminal window.

1. **NEVER Run Destructive or Write Git Commands:** Do not run `git add`, `git commit`, `git push`, `git reset`, `git rebase`, or `git checkout`. (Read-only inspection like `git status -s` is allowed only if necessary.)
2. **One Task Per Turn:** Execute one discrete task at a time, then **stop and wait** for the user to review, commit, and approve moving to the next task.
3. **Mandatory End-of-Task Output:** End every completed task with a clean **Git Checkpoint** block using conventional commit prefixes (`feat:`, `fix:`, `docs:`, `assets:`, `chore:`, `style:`) formatted exactly like this:

```markdown
### Git Checkpoint
- **Files Added/Modified:** `<comma-separated paths>`
- **Run in Git Window:**
```bash
git status -s
git add -A
git commit -m "<type>(<scope>): <concise summary>"
git push
```
- **Re-Index (if text/code changed):**
```bash
context-mode index . --source project:floorplan-rendering-project --exclude node_modules --exclude .git --exclude dist
```
```

## 5. Architectural & Build Standards

- **Image Chaining Order:** Always follow `VISUAL_PLAN_PROMPTS.md` sequentially:
  1. `masterplan-approved.png` ← `map-view.png` + `map-view-straightened.png`
  2. `isometric-approved.png` ← `map-view.png` + `masterplan-approved.png`
  3. `north-deck-render.png` & `south-fitness-render.png` ← `isometric-approved.png`
- **Aesthetic Fidelity (`website-v2/` Dark Monograph Theme):**
  - **Surfaces:** Obsidian `#0E0D0B`, Basalt `#151411`, Charcoal `#1D1B17`.
  - **Ink & Accents:** Travertine `#F5F1EB`, Weathered Stone `#9E9689`, Brushed Brass `#C8A264`, Botanical Sage `#78A889` (Deep Palm `#2F4838`), Terracotta `#C86849`, Lagoon `#3E8E94`.
  - **Typography:** `Instrument Serif` (display headings), `DM Sans` (clean body UI), `JetBrains Mono` (architectural indices & specs). No neon gym themes or generic SaaS card grids.
- **True Building Silhouette:** Any SVG mini-map or 3D blockout must reflect the actual stepped north dome, single curved east balcony, screened mechanical core, and south 3-bay block—never a generic rectangle.

## 6. Safety Guardrails

- **Protect Source Maps:** Never modify, overwrite, or delete `docs/image/map-view.png` or `docs/image/map-view-straightened.png`.
- **Ask Before Destructive Actions:** Request explicit confirmation before running `rm`, overwriting an approved render in `docs/image/output/`, or installing heavy dependencies.
- **Stay Scoped:** Do not perform unrequested refactors or start subsequent tasks until confirmed.
