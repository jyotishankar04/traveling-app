# UI design system

This document defines the Horizoné visual language. The source of truth is
`frontend/src/index.css`, which sets the Tailwind theme tokens. The
design aims for a premium, warm, editorial feel with a black and neutral
palette.

## Colors

Colors use the OKLCH space for smooth perceptual gradients. The theme has
light and dark variants.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | near-white warm | near-black | Page background |
| `--foreground` | near-black | near-white | Body text |
| `--card` | pure warm white | dark charcoal | Cards |
| `--primary` | near-black | near-white | Primary buttons, emphasis |
| `--primary-foreground` | near-white | near-black | Text on primary |
| `--secondary` | warm sand | dark slate | Secondary surfaces |
| `--muted` | warm light gray | dark slate | Muted backgrounds |
| `--muted-foreground` | mid gray | light gray | Helper text |
| `--accent` | warm neutral | darker slate | Hover and highlights |
| `--destructive` | warm red | warm red | Errors and delete |
| `--border` | light warm gray | white 12% | Borders |
| `--input` | light warm gray | white 16% | Inputs |
| `--ring` | near-black | light warm | Focus ring |

Chart tokens (`--chart-1` through `--chart-5`) span a near-black to
light-gray scale so dashboards stay on-brand.

## Typography

- **Font:** Inter Variable (loaded via `@fontsource-variable/inter`).
- **Default body:** `font-sans`, antialiased.
- **Headings:** use the same sans stack. The design favors large,
  tight, editorial headings.
- **Weights:** rely on the variable font for a full weight range.

## Spacing and layout

The app uses Tailwind's default spacing scale. Key patterns:

- Dashboard content max width: 1200px, centered, with generous side
  padding.
- Public pages share a `pt-20` top offset to clear the fixed navbar.
- Card padding: typically `p-6` (`1.5rem`).
- Section gaps: `py-16` to `py-24` on marketing pages.

## Radius

The base radius is `--radius: 1rem`, scaled across sizes:

| Token | Multiplier | Use |
|---|---|---|
| `--radius-sm` | 0.6 | Small controls |
| `--radius-md` | 0.8 | Inputs, buttons |
| `--radius-lg` | 1.0 | Cards |
| `--radius-xl` | 1.4 | Large cards |
| `--radius-2xl` | 1.8 | Hero sections |
| `--radius-3xl` | 2.2 | Modals |
| `--radius-4xl` | 2.6 | Full-bleed panels |

## Shadows and borders

- Borders are subtle (`--border`) and rely on contrast rather than heavy
  shadows.
- Cards use a clean border plus a soft neutral shadow from shadcn defaults.
- Focus uses the `--ring` color, not a blue tint, to stay on-brand.
- The design disables the default cursor pointer on disabled buttons.

## Card style

- Background: `--card`.
- Foreground: `--card-foreground`.
- Radius: `--radius-lg` or `--radius-xl`.
- Border: 1px `--border`.
- Padding: `p-6` by default; `p-4` on compact cards.

## Button style

Uses shadcn's `Button` with the `base-vega` style. Variants:

- **Primary:** `--primary` background, `--primary-foreground` text. Used
  for the main action on a page.
- **Secondary:** `--secondary` background.
- **Outline:** transparent with a border.
- **Ghost:** transparent, for low-emphasis actions.
- **Destructive:** `--destructive` background, for delete and cancel.

## Form style

- Inputs use `--input` background and `--border` border.
- Focus ring uses `--ring`.
- Labels and helper text use `--muted-foreground`.
- Errors use `--destructive`.
- Forms use `Field`, `Input`, `Textarea`, `Select`, and `Label` from
  shadcn.

## Table style

- Header row: `--muted` background, `--muted-foreground` text, small caps.
- Body rows: `--card` background, `--border` dividers.
- Status cells use the status badges described below.
- The owner and admin tables both use `OwnerDataTable` or
  `AdminDataTable`, which wrap the shadcn `Table`.

## Badge and status colors

Status badges map a status to a shadcn `Badge` variant. Suggested
mapping:

| Status | Variant |
|---|---|
| `active`, `approved`, `paid`, `published` | default (primary) |
| `pending`, `processing`, `upcoming` | secondary |
| `cancelled`, `failed`, `rejected`, `hidden` | destructive or outline |
| `verified` | default |
| `unverified`, `suspended` | secondary |

Keep these mappings in the shared `StatusBadge` component so colors stay
consistent across owner and admin.

## Sidebar style

The sidebar tokens (`--sidebar-*`) define the dashboard sidebars.

- Public: none (uses the navbar).
- Auth: split-screen image panel, no sidebar.
- Customer: light sidebar with the account nav.
- Owner: light sidebar (`--sidebar`) with dark primary accents.
- Admin: dark sidebar (`--sidebar` in dark variant) for clear separation
  from customer areas.

## Page style by area

### Public page style

Warm, editorial, image-led. Large hero, generous spacing, near-black
primary accents. The navbar is a floating pill.

### Auth page style

Split-screen. Left is a branded photo with an overlay headline. Right is
a centered, narrow form. Trust badges sit below the form.

### Customer dashboard style

Light, clean account area. A left sidebar lists profile sections. Content
uses cards and a stat row.

### Owner dashboard style

Functional and data-first. Stat cards at the top, charts, then tables.
Light sidebar with dark accents. Status badges on every table.

### Admin panel style

Mostly dark chrome (sidebar and topbar) to distinguish it from the
customer and owner areas. Content area stays light for readability. Dense
tables, approval panels, and moderation actions.

## Decoration

- Use `antialiased` text rendering (set in base styles).
- Keep borders subtle and shadows minimal to preserve the editorial tone.
- Avoid colored fills; the palette is neutral, with `--destructive` the
  only strong color.

## Next steps

See `18-versioning-and-modules.md` for how this system ships across
versions.