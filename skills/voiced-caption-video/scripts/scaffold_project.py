#!/usr/bin/env python3
"""Create a standard project folder for voiced caption video work."""

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9\u4e00-\u9fff]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or "voiced-caption-video"


def write_if_missing(path: Path, content: str) -> None:
    if not path.exists():
        path.write_text(content, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Scaffold a voiced-caption-video project.")
    parser.add_argument("name", help="Project name or slug.")
    parser.add_argument("--root", default="projects", help="Projects root directory.")
    parser.add_argument("--title", default="", help="Human-readable video title.")
    parser.add_argument("--force", action="store_true", help="Overwrite index.html if it already exists.")
    args = parser.parse_args()

    skill_root = Path(__file__).resolve().parents[1]
    template = skill_root / "assets" / "hyperframes-caption-template" / "index.html"
    if not template.exists():
        raise FileNotFoundError(f"Missing template: {template}")

    project = Path(args.root) / slugify(args.name)
    for relative in [
        "assets/original",
        "assets/processed",
        "audio",
        "renders",
    ]:
        (project / relative).mkdir(parents=True, exist_ok=True)

    index = project / "index.html"
    if args.force or not index.exists():
        shutil.copy2(template, index)

    title = args.title or args.name
    write_if_missing(
        project / "DESIGN.md",
        f"""# {title}

## Goal

- Audience:
- Duration:
- Style:
- Must include:
- Must avoid:

## Storyboard

1. Opening/title:
2. Scene 1:
3. Scene 2:
4. Scene 3:
5. Ending:

## QA Notes

- No black screen.
- No empty early gap.
- Captions readable.
- Voiceover starts on the opening page.
""",
    )
    write_if_missing(
        project / "narration.txt",
        f"{title}\n\nWrite the voiceover script here. Keep each line short and tied to one visual beat.\n",
    )

    print(project)


if __name__ == "__main__":
    main()
