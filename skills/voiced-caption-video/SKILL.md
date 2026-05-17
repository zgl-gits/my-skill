---
name: voiced-caption-video
description: Create complete short videos or animation videos with planned visuals, natural Mandarin voiceover, burned-in Chinese subtitles/captions, music/effects when appropriate, and final MP4 validation. Use when the user asks to make, improve, or automate a video, animation video, educational video, promo video, photo montage, HyperFrames video, or any video that needs voiceover and captions.
---

# Voiced Caption Video

## Core Goal

Produce a finished MP4, not just a concept. The minimum complete delivery is:

- Visual composition or generated video/animation.
- Natural Mandarin narration or another requested voice.
- Burned-in captions/subtitles that are readable on every scene.
- Timing that matches narration and avoids empty or black gaps.
- Verification with render checks, stream checks, and frame review.

Use the best available route for the task. Photos are only one mode, not a requirement.

## Route Selection

- Use HyperFrames HTML animation when the video needs designed pages, kinetic text, data cards, photo layouts, training explainers, or reliable caption placement.
- Use photo/story montage when the user provides real photos and wants a documentary,宣传,纪实, or剪影-like video.
- Use AI video generation tools when the user wants moving scenes that are hard to build from HTML alone. Still add voice/subtitles and QA after generation.
- Use hybrid production when quality matters: generated stills or photos as visual base, HyperFrames for layout/motion/captions, and ffmpeg for final assembly.

When in doubt, choose the most controllable route first: storyboard -> assets -> composition -> TTS -> subtitles -> render -> QA.

## Workflow

1. Restate the target in one line: topic, audience, style, length, output path, and must-have elements.
2. Create a clean project under a user-approved project folder, unless the user gives an exact destination. Prefer the bundled scaffold helper for standard folders and starter files.
3. Draft a simple storyboard before building: 5-8 scenes for 30-60 seconds, each with one visual purpose and one narration beat.
4. Prepare assets from user photos, generated images, SVG icons, simple SVG/HTML shapes, or video clips depending on the route.
5. Write or polish narration into short spoken Chinese. Avoid long paragraph dumps on screen.
6. Generate TTS audio when possible and record exact duration with `ffprobe`.
7. Build captions as visible HTML text or burned-in subtitles. Do not rely only on sidecar subtitle files.
8. Compose and render with HyperFrames/ffmpeg or the selected video tool.
9. Run validation: layout inspect, MP4 stream check, and extracted frame review.
10. Final response should include the absolute MP4 path and mention any limitations honestly.

## Visual Standards

- Start with content immediately. No initial black screen and no empty first seconds.
- Use strong readable caption containers. Avoid white text directly over bright or busy backgrounds.
- Keep motion purposeful: slow push-in, parallax, card entrance, spotlight, scene wipes. Avoid random bouncing, spinning, or gimmicks unless the user asks.
- For HTML/HyperFrames animation, first decide which scene elements would benefit from SVG assets, then search broadly for matching visual metaphors. Do not accept the first result blindly.
- Treat icon results as design candidates: download several options, preview them, choose the best-looking and most style-consistent SVG, and skip SVGs that look crude, generic, or mismatched.
- For safety/training videos, keep the tone serious enough: clear consequences, realistic visual cues, and readable instructional text.
- For promo/documentary videos, make the visuals warm and polished but not childish.
- For animation, characters and objects should be recognizable. If Q-style makes things too abstract, use semi-cartoon or clean illustrated realism.

## Audio And Subtitle Standards

- Prefer natural Mandarin neural voices when available.
- Choose voice by tone: serious safety/training content needs a steadier voice; promo/documentary content can be warmer; explainers can be lighter and more conversational.
- Avoid zombie-like narration by rewriting formal source text into short spoken lines before TTS.
- Add pauses through punctuation and line breaks, and keep the speech rate modest unless the user wants faster pacing.
- Include voiceover on the opening page if there is an opening page.
- Match subtitle timing to narration beats; keep each caption short.
- Burn subtitles/captions into the rendered picture unless the user explicitly wants external subtitles.
- If background music is added, keep it low enough that narration remains clear.

## HyperFrames Notes

Use the HyperFrames workflow when available. A safe pattern:

- Keep HTML as source of truth.
- Set `data-composition-id`, `data-duration`, `data-width="1920"`, and `data-height="1080"`.
- Use a deterministic Chinese-capable font stack such as `"Noto Sans SC", sans-serif`.
- Mark intentionally oversized blurred/decorative elements with `data-layout-allow-overflow`.
- Keep `#root` as the main clipping boundary. If scene clipping creates false layout errors, use `.scene { overflow: visible; }`.
- Avoid dynamic selector template literals in timeline code. Prefer simple ID/class lookups.

For detailed commands and pitfalls, read `references/workflow.md` when present.

## Bundled Helpers

Use the scaffold helper to start repeatable projects:

```powershell
python "skills/voiced-caption-video/scripts/scaffold_project.py" "project-name" --root "<PROJECTS_ROOT>" --title "Video Title"
```

It creates `assets/original`, `assets/processed`, `audio`, `renders`, starter `DESIGN.md`, starter `narration.txt`, and a HyperFrames `index.html` template.

Use the SVG search helper only for public icon search. If a site requires a session token or cookie, pass it through a local environment variable or command-line argument and never commit it:

```powershell
python "skills/voiced-caption-video/scripts/search_iconfont_svg.py" "keyword" --out "<PROJECT_FOLDER>/assets/iconfont" --all
```

Review downloaded SVGs before use. Never use an ugly result just because it downloaded successfully.

## Validation Checklist

- `hyperframes inspect` passes when using HyperFrames.
- `ffprobe` confirms a video stream and an audio stream.
- Frames near the beginning, middle, and end were extracted and inspected.
- There is no black screen, blank early gap, sideways media, unreadable captions, or missing opening narration.
- Captions are burned into the video unless external subtitles were explicitly requested.
- Source files, narration text, audio, subtitles, renders, and preview frames are saved in the project folder.
