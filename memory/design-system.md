# Design System — Institutional Precision

Used for the Team 20 banking alert dashboard prototype.

## Colors

| Token | Hex | Usage |
|---|---|---|
| surface | #f7f9fb | Page background |
| surface-dim | #d8dadc | Dividers, inactive |
| surface-bright | #f7f9fb | Same as surface |
| surface-container-lowest | #ffffff | Card background |
| surface-container-low | #f2f4f6 | Subtle sections |
| surface-container | #edf0f3 | Input backgrounds |
| surface-container-high | #e2e6ea | Hover states |
| surface-container-highest | #d8dadc | Active states |
| on-surface | #0f172a | Primary text |
| on-surface-variant | #475569 | Secondary text |
| outline | #94a3b8 | Borders |
| outline-variant | #cbd5e1 | Card borders |
| primary | #0f172a | Buttons, active |
| on-primary | #ffffff | Text on primary |
| primary-container | #1e293b | Dark accent |
| on-primary-container | #f1f5f9 | Text on container |
| secondary | #334155 | Mid-tone buttons |
| on-secondary | #ffffff | Text on secondary |
| secondary-container | #e2e8f0 | Secondary surfaces |
| on-secondary-container | #0f172a | Text on secondary |
| tertiary | #475569 | Muted accent |
| on-tertiary | #ffffff | Text on tertiary |
| error | #dc2626 | High risk |
| on-error | #ffffff | Text on error |
| success | #16a34a | Approved / low risk |
| on-success | #ffffff | Text on success |
| warning | #ea580c | Medium risk |
| on-warning | #ffffff | Text on warning |

## Typography

Font: **Inter** (Google Fonts)

| Style | Size | Weight | Line-height |
|---|---|---|---|
| headline-lg | 32px | 700 | 1.2 |
| headline-md | 24px | 600 | 1.3 |
| body-md | 16px | 400 | 1.5 |
| label-md | 14px | 500 | 1.4 |

## Spacing

- gutter: 24px
- card-padding: 20px
- section-gap: 32px

## Components

**Card**
- background: surface-container-lowest (#ffffff)
- border: 1px solid outline-variant (#cbd5e1)
- radius: 4px
- shadow: shadow-sm

**Button Primary**
- background: primary (#0f172a)
- text: on-primary (#ffffff)
- radius: 4px
- padding: 10px 20px

**Risk Indicator**
- high: error (#dc2626)
- medium: warning (#ea580c)
- low: outline (#94a3b8)

## Files using this system

- `app/globals.css` — CSS variables + Tailwind integration
- `app/page.tsx` — Dashboard
- `app/clients/[id]/page.tsx` — Client detail