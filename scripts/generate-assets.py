#!/usr/bin/env python3
"""Genera los iconos PWA (PNG) a partir de public/icons/logo.svg.

Uso: python3 scripts/generate-assets.py
Requiere ImageMagick (`convert`) y librsvg (`rsvg-convert`).
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ICONS = ROOT / 'public' / 'icons'
LOGO = ICONS / 'logo.svg'

OUTPUTS = {
    'icon-192.png': 192,
    'icon-512.png': 512,
    'apple-touch-icon.png': 180,
}


def main() -> None:
    if not LOGO.exists():
        sys.exit(f'falta {LOGO}')

    for name, size in OUTPUTS.items():
        subprocess.run(
            ['convert', '-background', 'none', '-resize', f'{size}x{size}',
             str(LOGO), str(ICONS / name)],
            check=True,
        )
    print('iconos generados')


if __name__ == '__main__':
    main()
