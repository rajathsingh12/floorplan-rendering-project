# Rooftop Sanctuary — Visual Plan & 3D Render Prompts

> **Purpose:** Internal reference and copy-paste prompt sheet for generating spatially locked architectural masterplans and eye-level 3D renders from the actual site map before starting Blender + Claude MCP modeling.
> **Recommended Models:** `nano-banana-pro` (primary) or `gpt-image` (via Antigravity CLI or API).

---

## Reference Assets Required

Pass both reference images together for the initial masterplan generation:
- **`Image 1` (`docs/image/map-view.png`):** Raw satellite map view of the actual rooftop, used to lock the true building silhouette, stepped dome parapet, curved eastern balcony, and surrounding tree canopy.
- **`Image 2` (`docs/image/map-view-straightened.png`):** Annotated zoning map, used strictly as the spatial placement blueprint.

---

## 1. Spatial Layout Decoded From Your Map

- **North Stepped Terrace (Top):** Centered rectangular **Pool (`P`)** positioned below the semicircular parapet dome with entry steps on its southern edge; wrapped on both the left and right wings by the **Bali Café (`C`)** seating decks.
- **Upper-Left Wing:** Enclosed **Salon (`S`)** pavilion tucked along the northwest stepped edge just above the excluded zone.
- **Upper-Right / East Wing:** **Recovery Room (`R`)** situated just south of the right-hand Café deck, leading down along the open eastern terrace and semicircular projecting balcony that bridges the North and South halves.
- **Central-Left Mechanical Core (Red Box with Yellow `X`):** Excluded non-usable utility zone containing existing HVAC chillers and curved metal roofs. No amenities are placed inside this footprint; instead, its perimeter is visually screened with sleek Bali teak louvers and vertical greenery so it disappears cleanly in investor visuals.
- **South Rectangular Block (Bottom):** Divided into three side-by-side glass-and-timber pavilions from left to right — **Group Classes (`G. Class.`)**, **Pilates**, and **Main Gym (`GYM`)** — encircled by a continuous perimeter **Running Track (`TRACK`)** wrapping the outer edges and eastern strip of the slab.

---

## 2. Step-by-Step Chaining Workflow

Run the prompts in sequence so every angle stays spatially faithful to the real rooftop footprint:

1. **Step 1 — Run Prompt 1 (2D Masterplan):**
   - **Inputs:** `Image 1` = `docs/image/map-view.png` + `Image 2` = `docs/image/map-view-straightened.png`
   - Pick your cleanest result and save it as **`docs/image/output/masterplan-approved.png`**.
2. **Step 2 — Run Prompt 2 (3D Isometric Cutaway):**
   - **Inputs:** `Image 1` = `docs/image/map-view.png` + `Image 2` = `docs/image/output/masterplan-approved.png`
   - Pick your best result and save it as **`docs/image/output/isometric-approved.png`**. (This also serves as your 3D massing reference for Blender + Claude MCP.)
3. **Step 3 — Run Prompts 3 & 4 (Eye-Level Renders):**
   - **Inputs:** `Image 1` = `docs/image/output/isometric-approved.png` (optionally include `docs/image/output/masterplan-approved.png` as `Image 2` if your CLI supports multi-image conditioning for consistency).
   - Generates matching eye-level visuals for both the North Deck and South Fitness Block.

---

## 3. Ready-to-Use Prompts (`nano-banana-pro` / `gpt-image`)

### Prompt 1: Top-Down 2D Photorealistic Architectural Masterplan

- **Inputs:** `Image 1` = `docs/image/map-view.png`, `Image 2` = `docs/image/map-view-straightened.png`
- **Recommended Aspect Ratio:** `9:16` (vertical, matching the building orientation)

```text
Transform the raw concrete rooftop shown in Image 1 into a photorealistic, high-end architectural masterplan rendering strictly following the spatial zoning layout drawn in Image 2. Maintain the exact building footprint, stepped north facade, semicircular north dome parapet, east semicircular projecting balcony, south rectangular slab, and surrounding dense green tree canopy from Image 1. Completely remove all hand-drawn red ink lines, letters, red paint blocks, and the yellow X from the final image—no sketches or overlays should remain.

Apply a cohesive luxury modern-Bali resort architectural aesthetic throughout the usable zones: warm teakwood decking, honed travertine limestone tiles, dark charcoal steel pergolas, bamboo slatted screens, frameless glass pavilions, and lush tropical planters (frangipani, bird of paradise, palms).

Map each zone to its exact position from Image 2:
1. NORTH POOL (marked 'P'): A sleek rectangular turquoise lap and plunge pool centered below the semicircular north parapet, framed in warm travertine coping with submerged entry steps along its southern edge and minimalist Bali sun loungers.
2. WRAP-AROUND CAFÉ (marked 'C' on both sides of 'P'): Open-air Bali artisan café flanking the left and right stepped terraces around the pool, featuring slatted teak timber pergolas, warm pendant lighting, travertine coffee bar counters, and rattan-and-wood lounge seating.
3. LUXURY SALON (marked 'S' on upper-left): A refined glass-and-teak enclosed boutique salon pavilion tucked into the upper-left corner with warm architectural skylighting visible through a clean flat timber roof deck.
4. RECOVERY ROOM & EAST PROMENADE (marked 'R' on upper-right): A serene timber-clad wellness recovery pavilion (sauna, ice bath, and contrast therapy suite) on the upper-right corridor, opening southward onto a landscaped stone-and-teak walkway that incorporates the curved eastern balcony as a shaded tropical relaxation deck connecting North and South.
5. EXCLUDED MECHANICAL CORE (covered by the red box and yellow X in Image 2): Do NOT place any amenities inside this central-left utility footprint. Leave the mechanical roof area untouched and strictly enclosed around its perimeter by tall architectural dark-teak privacy louver screens and lush vertical green living walls so the utility core is cleanly separated from the guest zones.
6. SOUTH FITNESS PAVILION & PERIMETER TRACK (bottom rectangular slab): Build a continuous terracotta-red EPDM cushioned two-lane Running Track looping completely around the outer perimeter of the bottom rectangular slab, including the dedicated track lane along the far-right edge (marked 'TRACK'). Inside the running track loop, place three cleanly divided, side-by-side glass-walled architectural pavilions with translucent skylight roofs showing interior layout from left to right:
   - Left bay ('G. Class.'): Open timber-floored Group Classes & functional movement studio.
   - Center bay ('Pilates'): Bright serene Reformer Pilates studio with neat rows of wooden reformer machines.
   - Right bay ('GYM'): Spacious luxury Strength & Conditioning Gym with matte-black power racks, rubberized charcoal flooring, and warm architectural LED strips.

Camera and style: Direct 90-degree orthographic bird's-eye top-down architectural presentation render, crisp golden-hour afternoon sunlight casting soft realistic shadows across the rooftop, ultra-clean photorealistic textures, high-resolution architectural competition board quality. No text labels, no watermarks, no red markings.
```

#### Optional Add-On for a Labeled Investor Version of Prompt 1
Replace the final sentence (`No text labels, no watermarks, no red markings.`) with the line below if you want callouts baked directly into the top-down visual:

```text
Include clean, minimal architectural callout labels in crisp white sans-serif typography with thin leader lines naming: POOL, BALI CAFÉ, SALON, RECOVERY SUITE, GROUP CLASSES, PILATES, GYM, and PERIMETER RUNNING TRACK. No watermarks, no red markings.
```

---

### Prompt 2: 3D Isometric Aerial Cutaway (Pre-Blender 3D Blueprint)

- **Inputs:** `Image 1` = `docs/image/map-view.png`, `Image 2` = `docs/image/output/masterplan-approved.png` (approved output from Prompt 1)
- **Recommended Aspect Ratio:** `16:9` (landscape, ideal for pitch decks and hero webpage sections)

```text
Create a photorealistic 3D elevated isometric architectural visualization of the exact rooftop wellness club from Image 1 and Image 2, viewed from a 45-degree aerial three-quarter angle positioned to the southeast looking northwest across the entire 20,000 sq. ft. rooftop complex. Keep the exact building geometry, proportions, stepped north parapet with semicircular crown, curved east terrace balcony, and surrounding lush urban tree canopy.

Design the entire rooftop as one unified ultra-luxury Bali-inspired wellness sanctuary:
- FOREGROUND (South Rectangular Slab): A continuous deep-terracotta cushioned Running Track wrapping cleanly around the entire bottom rectangular terrace with sleek glass safety balustrades along the building edge. Nestled inside the track loop is a low-slung architectural glass-and-teak pavilion with an overhanging louvered timber canopy and partial cutaway/transparent glass roof revealing three distinct interior bays from left to right: a wood-floored Group Class studio, a sunlit Reformer Pilates studio with wooden reformers, and a dramatic dark-stone and matte-black equipment Gym glowing with warm linear lighting.
- MIDGROUND RIGHT (East Promenade & Recovery): A lush teak boardwalk bordered by tropical palms leading past the curved eastern balcony lounge up to the warm timber-slatted Recovery Room pavilion.
- MIDGROUND LEFT (Excluded Utility Core): Keep the existing central-left mechanical area strictly untouched and completely concealed behind a sleek, cohesive architectural enclosure of tall vertical dark-teak slats and lush tropical green walls so it blends seamlessly as a planted architectural backdrop.
- BACKGROUND (North Stepped Terrace): A shimmering rectangular turquoise Pool set beneath the iconic stepped Art Deco white-plaster crown and semicircular dome, flanked symmetrically on left and right by open-air slatted-teak Bali Café pergolas with glowing woven rattan pendants and outdoor dining decks, plus the glass-fronted Luxury Salon tucked neatly into the northwest wing.

Lighting and photography: Late golden-hour twilight ("blue hour meets warm sunset") where natural sky light highlights the travertine stone and greenery while warm 2700K interior and landscape lighting glows richly from the gym, café pergolas, salon, and underwater pool lights. Shot like an award-winning architectural visualization rendered in V-Ray / Unreal Engine 5, razor-sharp detail, realistic scale figures walking the track and relaxing by the pool, no text, no watermarks.
```

---

### Prompt 3: Eye-Level Architectural Render — North Deck (Pool, Café, Salon & Recovery)

- **Inputs:** `Image 1` = `docs/image/output/isometric-approved.png` (approved output from Prompt 2)
- **Recommended Aspect Ratio:** `16:9`

```text
Using the exact architectural materials, spatial layout, and Bali resort design established in Image 1, generate a photorealistic eye-level architectural photograph standing on the North rooftop terrace looking north toward the rectangular turquoise Pool and the stepped semicircular crown facade.

In the center foreground and midground, show the travertine-edged Pool with clear turquoise water, subtle stone entry steps, and teak sunbeds. On both the left and right wings framing the pool, show the open-air Bali Café terraces under dark-timber slatted pergolas with hanging woven bamboo pendants, travertine espresso bar, and warm minimalist wood seating. To the far left edge, reveal the floor-to-ceiling glass entrance of the Luxury Salon glowing softly with warm backlit arched mirrors and travertine styling stations inside. To the right edge, show the slatted teak facade of the Recovery Suite opening toward the lush tropical promenade. Dense tropical foliage (palms, monstera, frangipani) and timber planter boxes soften every edge.

Lighting and camera: Warm late-afternoon golden-hour sunlight filtering through the timber slats casting crisp striped shadows on the honed travertine floor, architectural photography on a 24mm tilt-shift lens, vertical lines perfectly straight, ultra-realistic materials, natural depth of field, serene luxury resort atmosphere, no text or distortion.
```

---

### Prompt 4: Eye-Level Architectural Render — South Fitness Block (Track, Gym, Pilates & Group Classes)

- **Inputs:** `Image 1` = `docs/image/output/isometric-approved.png` (approved output from Prompt 2)
- **Recommended Aspect Ratio:** `16:9`

```text
Using the exact architectural materials, spatial layout, and Bali wellness resort aesthetic established in Image 1, generate a photorealistic eye-level architectural photograph standing on the southeast corner of the South rooftop slab looking across the perimeter Running Track toward the three glass-walled fitness pavilions.

In the immediate foreground and curving along the right and front edges of the rooftop, show a sleek two-lane terracotta-red EPDM cushioned Running Track with crisp subtle white lane markings, minimalist glass perimeter railings overlooking lush green treetops, and low warm architectural bollard lights. Inside the track loop stands a striking tropical-modern pavilion with dark charcoal steel beams, overhanging teakwood louvered eaves, and floor-to-ceiling sliding glass walls looking directly inside: prominently visible on the right bay is a high-end Strength & Conditioning Gym with matte-black power racks, knurled dumbbells, charcoal rubber flooring, and warm recessed linear lighting; continuing through glass partitions to the center bay is a tranquil wooden Reformer Pilates studio, and beyond to the left bay is an open timber-floored Group Classes studio. Behind the pavilion in the background, a tall vertical tropical living wall and slatted dark-teak screen neatly conceals the building's central mechanical core.

Lighting and camera: Golden-hour sunlight with warm interior architectural lighting contrasting against a soft sunset sky, shot on a 24mm architectural lens, razor-sharp straight verticals, V-Ray / ArchDaily editorial photography quality, realistic shadows and reflections in the glass, no text, no watermarks.
```

---

## 4. Model & CLI Tips for Best Results

- **`nano-banana-pro` vs. `gpt-image`:** Run **Prompt 1** on `nano-banana-pro` first—it handles multi-image spatial mapping (translating `Image 2` onto `Image 1` while removing hand-drawn ink) more cleanly than most models. If `gpt-image` leaves behind traces of the red square from the markup, prepend this sentence to Prompt 1:
  ```text
  Completely ignore the red paint and yellow X marker in Image 2; use Image 1's actual roof structure underneath.
  ```
- **Screening the Excluded Utility Core:** Image models respond much more reliably when told *what visual boundary replaces the excluded area* (a slatted teak screen and living green wall enclosing the existing mechanical equipment) rather than only saying "leave empty."
- **Handoff to Blender + Claude MCP:** Once you approve `docs/image/output/masterplan-approved.png` and `docs/image/output/isometric-approved.png`, pass both into your Blender MCP workflow so Claude builds the 3D greybox to match your real building's stepped north crown, curved eastern balcony, and south fitness block instead of a generic rectangle.