#!/usr/bin/env python3
"""Genera las ilustraciones de producto (SVG) y los iconos PWA (PNG) de la app.

Uso: python3 scripts/generate-assets.py
Requiere ImageMagick (`convert`) para los iconos PNG.
"""
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS = ROOT / 'public' / 'products'
ICONS = ROOT / 'public' / 'icons'

CREAM = '#F6F0E4'
BROWN = '#4A3728'
GREEN = '#5C6B4A'

DRINKS = [
    ('moka-frappe', '#8B5E3C', '#3E2A1E', True),
    ('cafe-frappe', '#B98A5E', '#6B4630', True),
    ('cookies-cream', '#D8CBB8', '#2E2A26', True),
    ('capuchino', '#C08B57', '#7A4E2D', False),
    ('latte-vainilla', '#D3A874', '#8A5B33', False),
    ('chocolate-caliente', '#6F4326', '#3B2314', False),
]

CAKES = [
    ('cheesecake', '#F2E2C2', '#C64B4B'),
    ('brownie', '#5A3620', '#2F1B10'),
    ('pay-limon', '#F6EFA8', '#E4D46A'),
]


def drink_svg(base: str, dark: str, cold: bool) -> str:
    """Vaso de bebida: transparente con tapa cúpula si es fría, taza si es caliente."""
    if cold:
        body = f'''
  <path d="M118 150 L138 330 Q140 348 158 348 L242 348 Q260 348 262 330 L282 150 Z" fill="{base}" opacity="0.95"/>
  <path d="M118 150 L138 330 Q140 348 158 348 L242 348 Q260 348 262 330 L282 150 Z" fill="none" stroke="{dark}" stroke-width="4" opacity="0.35"/>
  <rect x="112" y="138" width="176" height="18" rx="9" fill="{dark}" opacity="0.25"/>
  <path d="M200 40 Q272 40 282 138 L118 138 Q128 40 200 40 Z" fill="#FFFFFF" opacity="0.55"/>
  <ellipse cx="200" cy="118" rx="62" ry="34" fill="#FFF6E9"/>
  <ellipse cx="200" cy="96" rx="46" ry="26" fill="#FFFDF7"/>
  <path d="M164 96 Q200 62 236 100" stroke="{dark}" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.8"/>
  <circle cx="200" cy="250" r="34" fill="{dark}" opacity="0.18"/>
'''
    else:
        body = f'''
  <path d="M120 170 L120 300 Q120 344 168 344 L232 344 Q280 344 280 300 L280 170 Z" fill="#FFFDF7"/>
  <path d="M120 170 L120 300 Q120 344 168 344 L232 344 Q280 344 280 300 L280 170 Z" fill="none" stroke="{dark}" stroke-width="5" opacity="0.4"/>
  <path d="M280 200 Q334 200 334 240 Q334 280 280 280" fill="none" stroke="{dark}" stroke-width="12" stroke-linecap="round" opacity="0.4"/>
  <ellipse cx="200" cy="172" rx="80" ry="22" fill="{base}"/>
  <ellipse cx="200" cy="168" rx="54" ry="14" fill="#FFF6E9" opacity="0.9"/>
  <path d="M176 96 q16 -22 0 -44 M200 100 q16 -26 0 -50 M224 96 q16 -22 0 -44"
        stroke="{dark}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.3"/>
'''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img">
  <rect width="400" height="400" fill="{CREAM}"/>
  <circle cx="200" cy="215" r="150" fill="{base}" opacity="0.14"/>
{body}
  <ellipse cx="200" cy="360" rx="96" ry="14" fill="{BROWN}" opacity="0.12"/>
</svg>
'''


def cake_svg(base: str, accent: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img">
  <rect width="400" height="400" fill="{CREAM}"/>
  <circle cx="200" cy="210" r="150" fill="{base}" opacity="0.18"/>
  <path d="M110 300 L200 120 L290 300 Z" fill="{base}"/>
  <path d="M110 300 L200 120 L290 300 Z" fill="none" stroke="{accent}" stroke-width="5" opacity="0.5"/>
  <path d="M146 228 L254 228" stroke="{accent}" stroke-width="14" stroke-linecap="round" opacity="0.7"/>
  <rect x="96" y="298" width="208" height="20" rx="10" fill="{accent}" opacity="0.55"/>
  <circle cx="200" cy="150" r="14" fill="{accent}"/>
  <ellipse cx="200" cy="348" rx="104" ry="14" fill="{BROWN}" opacity="0.12"/>
</svg>
'''


def logo_svg(size: int) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="{size}" height="{size}">
  <rect width="512" height="512" rx="96" fill="{CREAM}"/>
  <circle cx="256" cy="256" r="196" fill="#E6D8BE"/>
  <circle cx="256" cy="256" r="176" fill="none" stroke="{BROWN}" stroke-width="8"/>
  <path d="M198 196 L214 350 Q216 366 232 366 L280 366 Q296 366 298 350 L314 196 Z" fill="{BROWN}"/>
  <rect x="190" y="180" width="132" height="20" rx="10" fill="{GREEN}"/>
  <ellipse cx="256" cy="170" rx="44" ry="26" fill="#FFFDF7"/>
  <path d="M150 402 h212" stroke="{GREEN}" stroke-width="12" stroke-linecap="round"/>
</svg>
'''


def main() -> None:
    PRODUCTS.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)

    for name, base, dark, cold in DRINKS:
        (PRODUCTS / f'{name}.svg').write_text(drink_svg(base, dark, cold))
    for name, base, accent in CAKES:
        (PRODUCTS / f'{name}.svg').write_text(cake_svg(base, accent))

    master = ICONS / 'logo.svg'
    master.write_text(logo_svg(512))
    for size in (192, 512):
        subprocess.run(
            ['convert', '-background', 'none', '-resize', f'{size}x{size}',
             str(master), str(ICONS / f'icon-{size}.png')],
            check=True,
        )
    subprocess.run(
        ['convert', '-background', 'none', '-resize', '180x180',
         str(master), str(ICONS / 'apple-touch-icon.png')],
        check=True,
    )
    print('assets generados')


if __name__ == '__main__':
    main()
