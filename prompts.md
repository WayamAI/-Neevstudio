# Nirmiti 3D mark prompt (ChatGPT)

Paste everything inside the fence into ChatGPT (a model with image generation + Python).
It renders 27 marks as three 3×3 sheets plus the login hero, slices them, and returns
one zip. Unzip into `src/assets/marks/` (PNGs) and `src/assets/` (`login-bg.png`);
`src/lib/marks.ts` picks them up by filename, no code change.

```
I need a set of 27 matching 3D product icons plus one login background for a web app called Nirmiti (regulated hardware / medical-device product development: requirements, compliance, verification, BOM, traceability). Deliver everything as ONE zip file.

STYLE (identical for every icon — they must look like one family):
3D product icon, one object, centered, 3/4 front view from slightly above, soft studio key light from upper left, Wayam orange #FF7B1C as the only chromatic colour with #FFB365 rim highlights and #C1460F / #9A3814 recesses and shadows; any second material is dark graphite #191919 (never a second brand colour). Satin polymer with a single glass specular, chunky rounded edges, crisp silhouette readable at 32px. TRANSPARENT background, no floor, no drop shadow plane, no glow halo. No text, letters, numbers, logos, human faces, medical crosses, caduceus, watermarks or extra props. Not red, not amber, not gold, not coral.

HOW TO PRODUCE:
1. Generate three square sprite sheets (1536×1536 or larger, transparent background), each a 3×3 grid of icons, one icon per cell, every icon centred in its cell with generous empty margin so nothing touches a cell edge. Keep the exact order below (left→right, top→bottom).
2. Generate the login background separately (spec at the end).
3. Using Python: slice each sheet into its 9 cells, trim transparent padding, re-centre each icon on a 512×512 transparent canvas with ~8% margin, save as RGBA PNG with the exact filename given. If any sheet came back with a solid background, remove it to transparency before slicing (no white fringes).
4. Show me a contact sheet of all 27 PNGs to check, then zip them as nirmiti-marks.zip: the 27 PNGs at the zip root, plus login-bg.png.

SHEET 1
1. overview.png — a compact mission-control console dial with one graphite needle
2. new-breakdown.png — a sealed product cube splitting open into four smaller stacked sub-cubes
3. requirements-matrix.png — a square slab of 3×3 raised tiles, one tile lifted higher than the rest
4. breakdown.png — a hierarchy: one top block linked by graphite rods down to three smaller blocks
5. compliance.png — a shield with a check-shaped cut-out window and a graphite inner plate
6. classification.png — a sorting tray with three graphite slots, one orange token dropping into a slot
7. verification.png — a laboratory flask with a graphite stopper, glowing orange liquid
8. hardware.png — a microchip with graphite pins on all four sides
9. traceability.png — three spheres linked by one continuous looping chain path

SHEET 2
10. capabilities.png — a cluster of linked hexagon tiles like a capability map
11. agent-runs.png — three cubes on a short graphite conveyor passing through a gate
12. approvals.png — a rubber approval stamp hovering above a graphite pad (no words)
13. reports.png — a thick report folder with a raised bar-chart relief on the cover
14. integrations.png — a plug connecting into a graphite socket block
15. audit.png — a stopwatch with a graphite rim and a counter-clockwise arrow ring
16. settings.png — a chunky gear with a graphite hub
17. kpi-requirements.png — a neat stack of three document slabs, no writing
18. kpi-critical-safety.png — a safety shield with a raised pulse-line ridge across it

SHEET 3
19. kpi-test-coverage.png — a target disc with a dart in the centre ring
20. kpi-bom-saving.png — a short stack of coins beside a small graphite microchip
21. telemetry.png — an oscilloscope puck whose screen shows a raised wave ridge
22. agent.png — a glowing orange AI core sphere resting in a graphite cradle
23. human.png — a smooth abstract person bust, no facial features
24. insight.png — a faceted ember crystal with an inner glow
25. alert.png — a triangular alert prism on a graphite base
26. empty.png — an empty open graphite box with an orange rim
27. dhf.png — a thick bound binder with an orange spine and graphite covers

LOGIN BACKGROUND — login-bg.png, 1024×1024 or larger, photoreal 3D product cinema, opaque:
A vast graphite #101010 engineering atrium seen from a balcony: a monumental exploded-view assembly of a medical ventilator's parts (housings, valves, circuit boards, gears) floating in precise layers, all in Wayam orange #FF7B1C with #FFB365 rim light from upper left and #C1460F recesses, linked by thin glowing orange trace lines like a requirements-to-parts traceability web. Brushed graphite and satin polymer only, shallow depth of field, dark lower third (white text will sit there). No people, faces, text, numbers, logos, screens with readable text, medical crosses or watermarks.
```
