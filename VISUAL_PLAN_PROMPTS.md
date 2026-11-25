# Rooftop Sanctuary — Visual Plan & 3D Render Prompts

> **Purpose:** Internal reference and copy-paste prompt sheet for generating spatially locked architectural masterplans and eye-level 3D renders from the actual site map.
> **Recommended Models:** `nano-banana-pro` (primary) or `gpt-image` (via Antigravity CLI or API).

---

## Render Suite Status Matrix

| Prompt | Target Output File (`docs/image/output/` & `website-v2/public/renders/`) | Aspect / Size | Reference Inputs | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Prompt 1** | `masterplan-approved.png` | `9:16` (`768×1376`) | `map-view.png` + `map-view-straightened.png` | **Approved & Live** (`drafts/masterplan-v3.png`) |
| **Prompt 2** | `isometric-approved.png` | `16:9` (`1376×768`) | `map-view.png` + `masterplan-approved.png` | **Approved & Live** (`drafts/isometric-v4.png`) |
| **Prompt 3** | `north-deck-render.png` | `16:9` (`1376×768`) | `isometric-approved.png` | **Approved & Live** (`drafts/north-deck-v2.png`) |
| **Prompt 4** | `south-fitness-render.png` | `16:9` (`1376×768`) | `isometric-approved.png` | **Approved & Live** (`drafts/south-fitness-v1.png`) |
| **Prompt 5** | `bali-cafe-render.png` | `16:9` (`1376×768`) | `north-deck-render.png` (+ optional `isometric-approved.png`) | **Prompt Ready — Pending Generation** (for `CrownSection.tsx` Card 2) |
| **Prompt 6** | `atelier-salon-render.png` | `16:9` (`1376×768`) | `north-deck-render.png` (+ optional `isometric-approved.png`) | **Prompt Ready — Pending Generation** (for `CrownSection.tsx` Card 3) |

---

## Reference Assets Required

Pass both reference images together for the initial masterplan generation:
- **`Image 1` (`docs/image/map-view.png`):** Raw satellite map view of the actual rooftop, used to lock the true building silhouette, stepped dome parapet, curved eastern balcony, and surrounding tree canopy.
- **`Image 2` (`docs/image/map-view-straightened.png`):** Annotated zoning map, used strictly as the spatial placement blueprint.

---

## 1. Spatial Layout Decoded From Your Map

- **North Stepped Terrace (Top):** Centered semicircular vanishing-edge **Infinity Pool (`P`)** extended strictly inside the north dome parapet with entry steps on its southern edge; wrapped on both the left and right wings by the **Bali Café (`C`)** seating decks.
- **Upper-Left Wing:** Enclosed **Atelier Luxury Salon (`S`)** pavilion tucked along the northwest stepped edge just above the excluded zone.
- **Upper-Right / East Wing:** **Contrast Recovery Suite (`R`)** situated just south of the right-hand Café deck, leading down along the open eastern palm promenade and single curved projecting balcony that bridges the North and South halves.
- **Central-Left Mechanical Core (Red Box with Yellow `X`):** Excluded non-usable utility zone containing existing HVAC chillers and twin cooling towers. No amenities are placed inside this footprint; instead, its perimeter is visually screened with sleek Bali teak louvers and vertical greenery so it disappears cleanly in investor visuals.
- **South Rectangular Block (Bottom):** Divided into three side-by-side glass-and-timber pavilions from left to right — **Group Classes (`G. Class.`)**, **Pilates**, and **Main Gym (`GYM`)** — encircled by a continuous perimeter **Running Track (`TRACK`)** wrapping the outer edges of the slab.

---

## 2. Step-by-Step Chaining Workflow

Run the prompts in sequence so every angle stays spatially faithful to the real rooftop footprint:

1. **Step 1 — Run Prompt 1 (2D Masterplan):**
   - **Inputs:** `Image 1` = `docs/image/map-view.png` + `Image 2` = `docs/image/map-view-straightened.png`
   - Pick your cleanest result and save it as **`docs/image/output/masterplan-approved.png`**.
2. **Step 2 — Run Prompt 2 (3D Isometric Cutaway):**
   - **Inputs:** `Image 1` = `docs/image/map-view.png` + `Image 2` = `docs/image/output/masterplan-approved.png`
   - Pick your best result and save it as **`docs/image/output/isometric-approved.png`**.
3. **Step 3 — Run Prompts 3 & 4 (Primary North & South Eye-Level Renders):**
   - **Inputs:** `Image 1` = `docs/image/output/isometric-approved.png` (optionally include `docs/image/output/masterplan-approved.png` as `Image 2`).
   - Saves as **`docs/image/output/north-deck-render.png`** and **`docs/image/output/south-fitness-render.png`**.
4. **Step 4 — Run Prompts 5 & 6 (Dedicated Bali Café & Atelier Salon Interior-Terrace Renders for Chapter 07 `CrownSection.tsx`):**
   - **Inputs:** `Image 1` = `docs/image/output/north-deck-render.png` (optionally include `docs/image/output/isometric-approved.png` as `Image 2`).
   - Save approved outputs as **`docs/image/output/bali-cafe-render.png`** (Card 2) and **`docs/image/output/atelier-salon-render.png`** (Card 3), copy both to `website-v2/public/renders/`, and register `RENDERS.cafe` and `RENDERS.salon` in `website-v2/src/components/Crop.tsx`.

---

## 3. Ready-to-Use Prompts (`nano-banana-pro` / `gpt-image`)

### Prompt 1: Top-Down 2D Photorealistic Architectural Masterplan

- **Inputs:** `Image 1` = `docs/image/map-view.png`, `Image 2` = `docs/image/map-view-straightened.png`
- **Recommended Aspect Ratio:** `9:16` (vertical, matching the building orientation)

```text
Transform the raw concrete rooftop shown in Image 1 into a photorealistic, high-end architectural masterplan rendering strictly following the spatial zoning layout drawn in Image 2. Maintain the exact building footprint, stepped north facade, semicircular north dome parapet, east semicircular projecting balcony, south rectangular slab, and surrounding dense green tree canopy from Image 1. Completely remove all hand-drawn red ink lines, letters, red paint blocks, and the yellow X from the final image—no sketches or overlays should remain.

Apply a cohesive luxury modern-Bali resort architectural aesthetic throughout the usable zones: warm teakwood decking, honed travertine limestone tiles, dark charcoal steel pergolas, bamboo slatted screens, frameless glass pavilions, and lush tropical planters (frangipani, bird of paradise, palms).

Map each zone to its exact position from Image 2:
1. NORTH POOL (marked 'P'): A sleek semicircular vanishing-edge turquoise lap and plunge pool extended into the north semicircular dome parapet, framed in warm travertine coping with submerged entry steps along its southern edge and minimalist Bali sun loungers.
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

---

### Prompt 2: 3D Isometric Aerial Cutaway (Pre-Blender 3D Blueprint)

- **Inputs:** `Image 1` = `docs/image/map-view.png`, `Image 2` = `docs/image/output/masterplan-approved.png` (approved output from Prompt 1)
- **Recommended Aspect Ratio:** `16:9` (landscape, ideal for pitch decks and hero webpage sections)

```text
Create a photorealistic 3D elevated isometric architectural visualization of the exact rooftop wellness club from Image 1 and Image 2, viewed from a 45-degree aerial three-quarter angle positioned to the southeast looking northwest across the entire 20,000 sq. ft. rooftop complex. Keep the exact building geometry, proportions, stepped north parapet with semicircular crown, single curved east terrace balcony, and surrounding lush urban tree canopy.

Design the entire rooftop as one unified ultra-luxury Bali-inspired wellness sanctuary:
- FOREGROUND (South Rectangular Slab): A continuous deep-terracotta cushioned Running Track wrapping cleanly around the entire bottom rectangular terrace with sleek glass safety balustrades along the building edge. Nestled inside the track loop is a low-slung architectural glass-and-teak pavilion with an overhanging louvered timber canopy and partial cutaway/transparent glass roof revealing three distinct interior bays from left to right: a wood-floored Group Class studio, a sunlit Reformer Pilates studio with wooden reformers, and a dramatic dark-stone and matte-black equipment Gym glowing with warm linear lighting.
- MIDGROUND RIGHT (East Promenade & Recovery): A lush teak boardwalk bordered by tropical palms leading past the single curved eastern balcony lounge up to the warm timber-slatted Recovery Room pavilion.
- MIDGROUND LEFT (Excluded Utility Core): Keep the existing central-left mechanical area strictly untouched and completely concealed behind a sleek, cohesive architectural enclosure of tall vertical dark-teak slats and lush tropical green walls so it blends seamlessly as a planted architectural backdrop.
- BACKGROUND (North Stepped Terrace): A shimmering semicircular vanishing-edge turquoise Pool extended flush to the north dome rim, flanked symmetrically on left and right by open-air slatted-teak Bali Café pergolas with glowing woven rattan pendants and outdoor dining decks, plus the glass-fronted Luxury Salon tucked neatly into the northwest wing.

Lighting and photography: Late golden-hour twilight ("blue hour meets warm sunset") where natural sky light highlights the travertine stone and greenery while warm 2700K interior and landscape lighting glows richly from the gym, café pergolas, salon, and underwater pool lights. Shot like an award-winning architectural visualization rendered in V-Ray / Unreal Engine 5, razor-sharp detail, realistic scale figures walking the track and relaxing by the pool, no text, no watermarks.
```

---

### Prompt 3: Eye-Level Architectural Render — North Deck (Pool, Café, Salon & Recovery)

- **Inputs:** `Image 1` = `docs/image/output/isometric-approved.png` (approved output from Prompt 2)
- **Recommended Aspect Ratio:** `16:9`

```text
Using the exact architectural materials, spatial layout, and Bali resort design established in Image 1, generate a photorealistic eye-level architectural photograph standing on the North rooftop terrace looking north toward the semicircular vanishing-edge turquoise Pool and the emerald tree canopy horizon.

In the center foreground and midground, show the travertine-edged Pool with clear turquoise water, subtle stone entry steps, teak sunbeds, and a curved vanishing-edge weir merging directly into the tree canopy. On both the left and right wings framing the pool, show the open-air Bali Café terraces under dark-timber slatted pergolas with hanging woven bamboo pendants, travertine espresso bar, and warm minimalist wood seating. To the far left edge, reveal the floor-to-ceiling glass entrance of the Luxury Salon glowing softly with warm backlit arched mirrors and travertine styling stations inside. To the right edge, show the slatted teak facade of the Recovery Suite opening toward the lush tropical promenade. Dense tropical foliage (palms, monstera, frangipani) and timber planter boxes soften every edge.

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

### Prompt 5: Eye-Level Interior-Terrace Render — Wrap-Around Bali Café (`CrownSection.tsx` Card 2)

- **Inputs:** `Image 1` = `docs/image/output/north-deck-render.png` (optionally include `docs/image/output/isometric-approved.png` as `Image 2`)
- **Recommended Aspect Ratio:** `16:9`
- **Target Output Filename:** `docs/image/output/bali-cafe-render.png` (copy to `website-v2/public/renders/bali-cafe-render.png`)

```text
Using the exact architectural materials, golden-hour lighting, travertine limestone decking, slatted Burmese teak pergolas, and woven rattan pendant lamps established in Image 1, generate a photorealistic eye-level interior-terrace architectural photograph standing INSIDE the Wrap-Around Bali Café wing on the rooftop sanctuary.

Camera position & framing: Position the camera at eye level inside the shaded teak pergola dining terrace looking diagonally along the full length of the Bali Café bar and lounge deck, with the shimmering turquoise semicircular infinity pool and lush green tree canopy visible just beyond the open right-hand terrace edge.

Key architectural & interior details to showcase clearly:
1. MONOLITHIC TRAVERTINE ESPRESSO & NUTRITION BAR (Left / Midground): A sculpted, fluted honed-travertine stone bar counter with warm 2700K recessed under-counter LED strip lighting, a matte-black and brushed-brass dual-group commercial espresso machine, minimalist glass cold-pressed juice carafes, protein smoothie blenders, and recessed teak shelving glowing with warm indirect light and ceramic vessels.
2. SLATTED BURMESE TEAK PERGOLA & RATTAN PENDANTS (Overhead): Deep architectural timber beams with fine slatted teak louvers filtering late-afternoon golden sunbeams across the space, hung with oversized hand-woven Balinese rattan dome pendant lamps emitting a rich 2700K warm glow.
3. COMMUNAL & LOUNGE SEATING (Foreground & Center): Handcrafted solid teak dining tables paired with curved woven-rattan and linen-cushioned armchairs, plus a sunken poolside teak sofa lounge pocket framed by built-in travertine planter boxes overflowing with monstera, bird of paradise, and Areca palms.
4. SPATIAL CONTINUITY (Right Background): Through the open timber colonnade on the right, reveal the flush travertine coping and turquoise water of the semicircular infinity pool merging into the emerald treetop horizon so the viewer immediately recognizes this café sits directly beside the pool from Image 1.

Lighting and photography: Late golden-hour Bali twilight transition — warm sun rays slicing through the pergola slats balanced by cozy 2700K interior bar and pendant lighting, shot on a 24mm tilt-shift architectural lens, razor-sharp vertical lines, Architectural Digest / Potato Head Bali / Aman resort editorial photography quality, rich material textures, no people, no text, no watermarks.
```

---

### Prompt 6: Eye-Level Interior Render — The Atelier Luxury Salon (`CrownSection.tsx` Card 3)

- **Inputs:** `Image 1` = `docs/image/output/north-deck-render.png` (optionally include `docs/image/output/isometric-approved.png` as `Image 2`)
- **Recommended Aspect Ratio:** `16:9`
- **Target Output Filename:** `docs/image/output/atelier-salon-render.png` (copy to `website-v2/public/renders/atelier-salon-render.png`)

```text
Using the exact architectural palette, honed travertine stone, Burmese teak timber, and warm 2700K golden-hour ambiance glimpsed inside the glass pavilion on the far left of Image 1, generate a photorealistic eye-level interior architectural photograph standing INSIDE The Atelier Luxury Salon pavilion on the northwest wing of the rooftop sanctuary.

Camera position & framing: Wide 24mm eye-level perspective from the reception threshold looking deep through the serene, glass-enclosed styling gallery, with the floor-to-ceiling frameless acoustic glass wall on the right looking out onto the sunlit travertine pool deck, teak café pergola, and turquoise infinity pool from Image 1.

Key architectural & interior details to showcase clearly:
1. BACKLIT BRUSHED-BRASS ARCHED STYLING STATIONS (Left & Center): A rhythmic row of four full-height sculpted arched mirrors framed in brushed architectural brass with soft 2700K halo perimeter backlighting set against a fluted travertine and ribbed Burmese teak feature wall. Each station features a floating honed-travertine stone console, minimalist brass footrest, and bespoke cognac-tan leather & teak hydraulic styling chair.
2. OVERHEAD ARCHITECTURAL SKYLIGHT & ACOUSTIC TIMBER CEILING: Coffered warm teak acoustic slat ceiling inset with linear architectural skylight strips and recessed warm cove lighting that washes the limestone walls in tranquil spa light.
3. PRIVATE WASH & HEAD-SPA SANCTUARY (Background Depth): At the far end of the salon behind a semi-sheer raw Belgian linen drapery partition and indoor olive/palm planters, reveal two ergonomic reclining ceramic hair-spa wash lounges under a softly lit arched plaster alcove with neatly rolled cream spa towels and apothecary glass bottles on recessed stone niches.
4. INDOOR-OUTDOOR ROOFTOP CONNECTION (Right Glass Wall): Through the tall black-steel and frameless glass facade on the right, clearly show the adjoining North rooftop travertine terrace, glowing rattan café pendants, and the edge of the turquoise infinity pool against the lush green tree canopy outside.

Lighting and photography: Serene golden-hour daylight streaming through the skylight and right-hand glass facade, blending harmoniously with warm 2700K backlit brass mirror halos and recessed cove lighting. Shot on a 24mm architectural tilt-shift lens, perfectly straight verticals, Aman Spa / Aesop / Architectural Digest luxury interior photography, ultra-clean photorealistic stone, brass, linen, and timber textures, no people, no text, no watermarks.
```

---

## 4. Model & CLI Tips for Best Results

- **`nano-banana-pro` vs. `gpt-image`:** Run **Prompt 1** on `nano-banana-pro` first—it handles multi-image spatial mapping (translating `Image 2` onto `Image 1` while removing hand-drawn ink) more cleanly than most models.
- **Chaining Prompts 5 & 6 to `north-deck-render.png`:** Always attach `docs/image/output/north-deck-render.png` as `Image 1` when running Prompts 5 and 6 so the travertine stone tone, rattan pendant geometry, and turquoise pool water outside the glass match Card 1 (`Semicircular Infinity Pool`) seamlessly.
