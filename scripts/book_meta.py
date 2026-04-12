from __future__ import annotations

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
BASE = REPO_ROOT / "src" / "data" / "baiboly-json"
OUT = REPO_ROOT / "src" / "data" / "manifest.json"

TESTAMENTS = ("Testameta taloha", "Testameta vaovao")


def load_order_and_slug(json_path: Path) -> tuple[int, str]:
    slug = json_path.stem
    with json_path.open(encoding="utf-8") as f:
        data = json.load(f)
    meta = data.get("meta")
    if not isinstance(meta, dict) or "order" not in meta:
        raise ValueError(f"{json_path}: 'meta.order' not found")
    order = meta["order"]
    if not isinstance(order, (int, float)):
        raise ValueError(f"{json_path}: meta.order should be a number {order!r}")
    return int(order), slug


def list_books_ordered(testament_dir: Path) -> list[str]:
    if not testament_dir.is_dir():
        raise FileNotFoundError(f"File {testament_dir} not found")

    json_files = sorted(p for p in testament_dir.glob("*.json") if p.is_file())
    pairs: list[tuple[int, str]] = []
    for p in json_files:
        order, slug = load_order_and_slug(p)
        pairs.append((order, slug))

    pairs.sort(key=lambda x: x[0])
    return [slug for _, slug in pairs]


def main() -> int:
    manifest: dict[str, list[str]] = {}
    for name in TESTAMENTS:
        manifest[name] = list_books_ordered(BASE / name)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8", newline="\n") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Écrit : {OUT.relative_to(REPO_ROOT)}")
    for k, v in manifest.items():
        print(f"  {k}: {len(v)} boky")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as e:
        print(e, file=sys.stderr)
        raise SystemExit(1)