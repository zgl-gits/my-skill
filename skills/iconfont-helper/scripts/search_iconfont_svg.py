#!/usr/bin/env python3
"""Search iconfont.cn and save SVG candidates from public search results."""

from __future__ import annotations

import argparse
import json
import os
import re
import time
from pathlib import Path
from urllib.parse import quote_plus
from urllib.request import Request, urlopen


ICONFONT_API = "https://www.iconfont.cn/api/icon/search.json"


def safe_name(value: str, fallback: str) -> str:
    value = re.sub(r'[\\/:*?"<>|]+', "_", value).strip()
    return value or fallback


def search_iconfont(query: str, limit: int, icon_type: str, ctoken: str) -> list[dict]:
    type_part = f"&{icon_type}=1" if icon_type else ""
    body = (
        f"q={quote_plus(query)}{type_part}"
        f"&sortType=updated_at&page=1&pageSize={limit}"
        f"&sType=&fromCollection=-1&fills=&t={int(time.time() * 1000)}"
        f"&ctoken={quote_plus(ctoken)}"
    )
    headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
        "Referer": f"https://www.iconfont.cn/search/index?searchType=icon&q={quote_plus(query)}",
        "Origin": "https://www.iconfont.cn",
    }
    if ctoken:
        headers["Cookie"] = f"ctoken={ctoken}; xlly_s=1"

    request = Request(ICONFONT_API, data=body.encode("utf-8"), headers=headers, method="POST")
    with urlopen(request, timeout=20) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return payload.get("data", {}).get("icons", []) or []


def main() -> None:
    parser = argparse.ArgumentParser(description="Download SVG icons from iconfont.cn search results.")
    parser.add_argument("query", help="Search keyword. Chinese is OK.")
    parser.add_argument("--out", default="assets/iconfont", help="Output directory.")
    parser.add_argument("--limit", type=int, default=12, help="Number of search results to inspect or save.")
    parser.add_argument(
        "--type",
        default="",
        choices=["", "line", "fill", "flat", "hand", "simple", "complex"],
        help="Optional Iconfont style filter.",
    )
    parser.add_argument("--ctoken", default=os.environ.get("ICONFONT_CTOKEN", ""), help="Optional local Iconfont ctoken.")
    parser.add_argument("--all", action="store_true", help="Save all returned SVG candidates for visual selection.")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    icons = search_iconfont(args.query, args.limit, args.type, args.ctoken)
    if not icons:
        raise SystemExit(f"No icons found for query: {args.query}")

    (out_dir / "search-response.json").write_text(
        json.dumps(icons, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    selected = icons if args.all else icons[: min(3, len(icons))]
    saved: list[str] = []
    for index, icon in enumerate(selected, start=1):
        svg = icon.get("show_svg")
        if not svg:
            continue
        name = safe_name(icon.get("name", ""), f"{args.query}-{index}")
        file_path = out_dir / f"{index:02d}-{name}.svg"
        file_path.write_text(svg, encoding="utf-8")
        saved.append(str(file_path))

    print(json.dumps({"query": args.query, "saved": saved}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
