# Voiced Caption Video Workflow Notes

This public reference keeps commands generic. Replace placeholders with local paths and installed tools.

## Production Modes

### HyperFrames Designed Video

Best for controlled short videos: workplace promo, education videos, explainers, title cards, photo montages, kinetic text, and safety training.

Common structure:

- Opening/title.
- Situation or background.
- Key action or process.
- Detail/consequence/result.
- Summary or callout.
- Closing line.

### Photo Or Image Montage

Best when the user provides real photos or wants a documentary/纪实 feeling.

- Copy originals into the project, then work on processed copies.
- Rename files to stable names like `photo-01.jpg`.
- Use a blurred enlarged background plus foreground photo card for portrait/phone photos.
- Never overwrite user originals unless they explicitly ask for replacement.

### AI Generated Animation/Video

Best when the user wants imagined scenes, accidents, symbolic visuals, or character animation.

- Make a storyboard first.
- Generate stills/clips per scene.
- Use HyperFrames or ffmpeg to add title cards, voiceover, captions, and transitions.
- Do not trust generated clips alone; inspect recognizability and continuity.

## Project Layout

Use a clean folder:

```text
<PROJECT_ROOT>/
  DESIGN.md
  narration.txt
  index.html
  ASSET_SELECTION.md
  assets/
    original/
    processed/
    iconfont/
  audio/
    narration.mp3
    narration.vtt
  renders/
    final.mp4
    qa_frames/
```

The bundled helper can create the starter structure:

```powershell
python "skills/voiced-caption-video/scripts/scaffold_project.py" "project-name" --root "<PROJECTS_ROOT>" --title "Video Title"
```

## Iconfont SVG Assets

For webpage/HyperFrames animation, Iconfont SVGs are often faster and cleaner than drawing everything manually. Use them as a broad visual asset library, not as a fixed list of preferred icons.

Process:

1. Read the storyboard and identify what the scene needs visually: object, role, action, warning, emotion, process, environment, tool, consequence, decoration, or transition cue.
2. Generate several search keywords for each need, including literal words and visual metaphors.
3. Download multiple candidates per keyword.
4. Preview candidates and choose the best-looking SVGs. Judge clarity, polish, recognizability, line weight, fill style, and whether they match the video's visual language.
5. Keep a consistent icon style inside one video. Avoid mixing cute flat icons, thin line icons, and heavy filled icons unless the design intentionally needs contrast.
6. If no result is good enough, do not force it. Use generated artwork, simple custom SVG, HTML/CSS shapes, or another open icon source.

Preferred helper:

```powershell
python "skills/voiced-caption-video/scripts/search_iconfont_svg.py" "keyword" --out "<PROJECT_ROOT>/assets/iconfont" --limit 12 --all
```

If the icon service requires a token, pass it locally:

```powershell
$env:ICONFONT_CTOKEN = "<LOCAL_TOKEN>"
python "skills/voiced-caption-video/scripts/search_iconfont_svg.py" "keyword" --out "<PROJECT_ROOT>/assets/iconfont" --all
```

Do not commit the token or generated private search artifacts.

## TTS And Captions

- Generate narration from `narration.txt`.
- Measure the audio duration and use the exact value in media tags or ffmpeg timing.
- Keep captions shorter than narration lines.
- If VTT/SRT exists, still burn visible captions into the video unless the user says otherwise.
- Use a credible voice for formal or safety content; avoid cartoonish voices unless requested.

Avoid "zombie" narration:

- Rewrite source text into short spoken sentences before TTS.
- Do not paste long official paragraphs directly into narration.
- Use punctuation and line breaks as breathing points.
- Keep rate close to natural speech.
- Listen or at least spot-check the generated audio before final rendering when possible.

## Render And QA

Use the video tooling available in your environment. A typical QA sequence:

```powershell
npx hyperframes inspect "<PROJECT_ROOT>" --json --samples 20
npx hyperframes render "<PROJECT_ROOT>" --output "<PROJECT_ROOT>/renders/final.mp4" --quality high --fps 30
ffprobe -v error -show_entries format=duration,size -show_streams -of json "<PROJECT_ROOT>/renders/final.mp4"
```

Extract and inspect frames near the beginning, middle, end, and any user-reported problem area:

```powershell
ffmpeg -y -ss 1  -i "<PROJECT_ROOT>/renders/final.mp4" -frames:v 1 -update 1 "<PROJECT_ROOT>/renders/qa_frames/frame-01.jpg"
ffmpeg -y -ss 10 -i "<PROJECT_ROOT>/renders/final.mp4" -frames:v 1 -update 1 "<PROJECT_ROOT>/renders/qa_frames/frame-10.jpg"
ffmpeg -y -ss 24 -i "<PROJECT_ROOT>/renders/final.mp4" -frames:v 1 -update 1 "<PROJECT_ROOT>/renders/qa_frames/frame-24.jpg"
```

Confirm:

- No black screen or empty early gap.
- Captions are visible and readable.
- The first scene has voiceover when expected.
- Video and audio streams both exist.
- Scene labels and icons belong to the current scene.
- The final MP4 is in the requested output folder.

## QA Failure Patterns To Catch

- Initial black screen.
- Empty early gap.
- Opening page has no voiceover.
- Text is white over bright/complex background.
- Captions are too long or too small.
- Characters/objects are too abstract to recognize.
- Safety/consequence scenes look too mild or only slogan-like.
- Render succeeds but audio is missing.
- Sideways phone photos.
- User-reported visual problems are not checked with extracted frames.
