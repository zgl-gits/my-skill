# Voiced Caption Video Workflow

This public reference keeps commands generic. Replace placeholders with local paths and installed tools.

## Suggested Folder

```text
<PROJECT_ROOT>/
  assets/
    original/
    processed/
  audio/
  renders/
  DESIGN.md
  narration.txt
  index.html
```

## Scaffold

```powershell
python "skills/voiced-caption-video/scripts/scaffold_project.py" "project-name" --root "<PROJECTS_ROOT>" --title "Video Title"
```

## Icon Search

```powershell
python "skills/voiced-caption-video/scripts/search_iconfont_svg.py" "keyword" --out "<PROJECT_ROOT>/assets/iconfont" --limit 12 --all
```

If the icon service requires a token, pass it locally:

```powershell
$env:ICONFONT_CTOKEN = "<LOCAL_TOKEN>"
python "skills/voiced-caption-video/scripts/search_iconfont_svg.py" "keyword" --out "<PROJECT_ROOT>/assets/iconfont" --all
```

Do not commit the token or generated private search artifacts.

## Render And QA

Use the video tooling available in your environment. A typical QA sequence:

```powershell
npx hyperframes inspect "<PROJECT_ROOT>" --json --samples 20
npx hyperframes render "<PROJECT_ROOT>" --output "<PROJECT_ROOT>/renders/final.mp4" --quality high --fps 30
ffprobe -v error -show_entries format=duration,size -show_streams -of json "<PROJECT_ROOT>/renders/final.mp4"
```

Extract and inspect frames near the beginning, middle, and end. Confirm:

- No black screen or empty early gap.
- Captions are visible and readable.
- The first scene has voiceover when expected.
- Video and audio streams both exist.
- The final MP4 is in the requested output folder.
