# AGENTS.md — Rooftop Sanctuary (`floorplan-rendering-project`)

> Always-on workspace rules for Antigravity CLI (`agy`) and compatible coding agents.

## 1. Project Overview

We are building a **~20,000+ sq. ft. Modern-Bali Rooftop Wellness Sanctuary** investor pitch (~₹5–6 Cr scope) using the real building silhouette from satellite imagery, followed by a scroll-driven architectural pitch website and optional Blender + Claude MCP 3D greybox.

**Active Zones (8 total):**
- **North Stepped Terrace:** Rooftop Pool (`P`), Wrap-Around Bali Café (`C` left & right wings), Luxury Salon (`S`, upper-left).
- **East Corridor:** Recovery Room (`R`) + East Promenade & Curved Balcony Lounge.
- **South Rectangular Block:** 3 side-by-side glass-and-teak bays from left to right — Group Classes (`G. Class.`), Reformer Pilates (`Pilates`), and Main Gym (`GYM`) — encircled by a continuous 2-lane terracotta Perimeter Running Track (`TRACK`).
- **Excluded Mechanical Core (Red Box + Yellow `X`):** Non-usable utility zone. Never design amenities inside this footprint; visually screen its perimeter with dark-teak louvers and vertical tropical living walls.

## 2. Repository Map & Source of Truth

```text
.
├── AGENTS.md                                      # These rules (always active)
├── DESIGN.md                                      # Visual tokens, scroll architecture & web spec
├── VISUAL_PLAN_PROMPTS.md                         # Chained 2D/3D/eye-level render prompts
└── docs/
    └── image/
        ├── map-view.png                           # READ-ONLY: Raw satellite footprint
        ├── map-view-straightened.png              # READ-ONLY: Annotated zoning blueprint
        └── output/                                # Generated architectural renders
            ├── masterplan-approved.png            # Prompt 1 output (9:16 2D masterplan)
            ├── isometric-approved.png             # Prompt 2 output (16:9 3D cutaway)
            ├── north-deck-render.png              # Prompt 3 output (16:9 eye-level North)
            └── south-fitness-render.png           # Prompt 4 output (16:9 eye-level South)
```

- When scaffolding the web prototype later, **copy** approved images from `docs/image/output/` into the app's static asset folder (e.g., `public/renders/`)—never move or delete originals in `docs/image/`.

## 3. Token Efficiency & `context-mode` Rules

This workspace is pre-indexed in `context-mode` under source label:
`project:floorplan-rendering-project`

1. **Search Before Reading:** Query `DESIGN.md` and `VISUAL_PLAN_PROMPTS.md` via `context-mode/ctx_search` or inspect slices via `context-mode/ctx_execute_file` instead of dumping whole files into context.
2. **Native Reads Only for Edits:** Read raw files natively only when preparing exact line edits.
3. **Keep the Index Clean:** If you create or heavily modify code/Markdown files, either re-index via `context-mode/ctx_index` (source: `project:floorplan-rendering-project`, excluding `.git`, `node_modules`, `dist`, and binary images) or include the re-index command in the Git Checkpoint below.

## 4. Two-Window Git Workflow & Task Checkpoints

The user manages all Git operations manually in a separate Ghostty terminal window.

1. **NEVER Run Destructive or Write Git Commands:** Do not run `git add`, `git commit`, `git push`, `git reset`, `git rebase`, or `git checkout`. (Read-only inspection like `git status -s` is allowed only if necessary.)
2. **One Task Per Turn:** Execute one discrete task at a time, then **stop and wait** for the user to review, commit, and approve moving to the next task.
3. **Mandatory End-of-Task Output:** End every completed task with a clean **Git Checkpoint** block using conventional commit prefixes (`feat:`, `fix:`, `docs:`, `assets:`, `chore:`) formatted exactly like this:

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
- **Aesthetic Fidelity:** Match `DESIGN.md` strictly (Modern Balinese minimalism — Travertine `#F5F1EB`, Obsidian `#161614`, Palm `#2F4838`, Brass `#B8935A`, Terracotta `#B5583B`, Lagoon `#2F6E73`). No neon gym themes or generic SaaS card grids.
- **True Building Silhouette:** Any SVG mini-map or 3D blockout must reflect the actual stepped north dome, curved east balcony, screened mechanical core, and south 3-bay block—never a generic rectangle.

## 6. Safety Guardrails

- **Protect Source Maps:** Never modify, overwrite, or delete `docs/image/map-view.png` or `docs/image/map-view-straightened.png`.
- **Ask Before Destructive Actions:** Request explicit confirmation before running `rm`, overwriting an approved render in `docs/image/output/`, or installing heavy dependencies.
- **Stay Scoped:** Do not perform unrequested refactors or start subsequent tasks until confirmed.