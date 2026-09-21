# Generated image provenance

These production assets were generated for the PI Tutors redesign with Higgsfield GPT Image 2.5, then converted to WebP for delivery. The exact prompt is recorded beside each WebP as a JSON sidecar. Lossless PNG masters with embedded prompts are kept outside the public bundle in `.context/generated-sources/`.

- `pi-optical-instrument.*`: derived from the approved, people-free “Laboratory Light Table” concept.
- `tutor-taimur-editorial.*`: identity-preserving refinement of `public/images/tutor-taimur.png`.
- `tutor-mukarram-editorial.*`: identity-preserving refinement of `public/images/tutor-mukarram.png`.

The original tutor source portraits remain in `public/images/`.

The editorial tutor refinements must be approved by the tutors before production deployment because generative reconstruction can alter small facial details.

## Cinematic overhaul (v2)

Generated with Higgsfield (GPT Image 2.5 for stills, MiniMax H3 for video). Masters live in `.context/cinema/`.

- `/cinema/hero/d/*.webp` (192 frames, 1600w) and `/cinema/hero/m/*.webp` (96 frames, 960w): frames of an 8s MiniMax H3 start/end-frame interpolation. Start frame = text-free plate of the approved hero concept (`.context/cinema/start-a.png`); end frame = the same scene pushed into the lens (`.context/cinema/end-b.png`).
- `pi-focus.webp`: the end frame of that camera move.
- `subject-math.webp`, `subject-physics.webp`, `subject-chem.webp`, `subject-bio.webp`: still lifes in the same laboratory world, referenced from the start frame.
- `contact-desk.webp`: study desk scene for the contact page.

Prompts for these assets are recorded in `.context/prompts/v2-cinematic.md`.

## Services specimens in motion (v3)

Generated with Higgsfield Seedance 2.0 Mini, image-to-video from the four bell-jar stills
above, 5s at 720p, locked-off camera so only the contents move. Masters are in
`.context/cinema/jars/`; the delivered clips in `/video/jars/` are ping-pong loops
(forward then reversed) so they never cut, encoded to H.264 at 624x832.

- `math.mp4` from `jar-math.webp`: the solids drift, the golden spiral redraws itself.
- `physics.mp4` from `jar-physics.webp`: the pendulum swings, the spectrum breathes.
- `chem.mp4` from `jar-chem.webp`: the molecule turns, the amber flask pulses.
- `bio.mp4` from `jar-bio.webp`: the helix rotates, light climbs the strands.

The matching still is always the poster, so reduced-motion and data-saver visitors keep
the photograph and never fetch the clip.

`services-bench.webp` is no longer referenced: the services hero now renders the
liquid-metal pi (`components/site/liquid-pi.tsx`) instead.
