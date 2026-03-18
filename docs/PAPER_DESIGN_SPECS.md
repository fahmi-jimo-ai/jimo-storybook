# Moji — Paper Design Specs

> **CRITICAL**: When generating any design in Paper or an HTML example, every value here is LAW.
> Use exact pixels, exact colors, exact typography tokens — no approximations.
> These specs are extracted directly from the component CSS source files in `src/components/ui/`.

---

## Mandatory Pre-Flight: Storybook MCP Lookup

**Before writing a single line of HTML or making any Paper `write_html` call, you MUST do both of the following. No exceptions.**

### Step 1 — Identify components via `list-all-documentation`

Call the Storybook MCP `list-all-documentation` tool. Use the returned IDs to know exactly which components exist and what their canonical names are.

- Do NOT assume a component exists. Do NOT guess its name.
- If a component is not in the list, it does not exist in Moji.

### Step 2 — Fetch specs via `get-documentation`

For every component you intend to render, call `get-documentation` with its ID. This returns:
- All props, their types, and their default values
- All variant/state options (exact string values)
- Story code examples showing correct usage

**Never invent a prop, variant, or state that is not returned by `get-documentation`.** If it's not in the docs, it doesn't exist.

### Why this is non-negotiable

Hallucinated component APIs break designs silently. A button rendered with the wrong `level` prop, a chip with a non-existent `variant`, or a toast missing required props produces a broken output that looks plausible but is wrong. The Storybook MCP is the single source of truth — it reflects the live component source, not a memory of it.

---

## Global Rules for Paper Designs and HTML Examples

1. **Never use all-uppercase text.** Always use Capital Case (first character of each word uppercased). No `TEXT-TRANSFORM: UPPERCASE` or `letter-spacing` all-caps labels.
2. **Every component must be pixel-perfect to these specs.** Corner radius, font, padding, color — all must match exactly.
3. **All colors must use the exact hex values from `tokens.css`.** No approximations.
4. **No hardcoded values in story files.** All values must reference CSS custom properties from `src/styles/tokens.css`.
5. **No hallucinated components or props.** Every component name, prop name, and prop value must be confirmed via `get-documentation` before use.
6. **HTML examples must embed the token values inline.** Since HTML examples run outside Storybook, replace each CSS variable with its resolved hex/px value from the token table below — but the value you use must still match the token exactly.

---

## Icon Library — iconsax-react

The project uses **`iconsax-react`** v0.0.8 (993 icons, also aliased as `iconsax-reactjs`). This is the Iconsax icon set for React — not inline SVGs, not any other library.

### Rules
- **Never use raw inline SVGs for icons in Paper designs.** Represent them as SVG shapes that match the iconsax visual style (1.5px stroke, round linecap/linejoin, 24×24 viewBox).
- **Only `Linear` and `Bold` variants exist in this project.** Never reference `Outline`, `TwoTone`, or `Broken`.
- **Default variant is `Linear`** unless the component explicitly uses `Bold`.
- **Browse available icons at:** https://iconsax-icon-list.netlify.app/

### Icon sizes used per context

| Context | Size | Variant |
|---------|------|---------|
| Button big icon | 20px | Linear |
| Button small icon | 16px | Linear |
| Dropdown chevron (ArrowDown2) | 20px | Linear |
| DropdownMenuList row icon | 20px | Linear |
| Input left/right icon | 24px | Linear |
| Toast/Infobox type icon | 24px | **Bold** |
| Chip icon | 16px | Linear |
| Tooltip (no icon) | — | — |

### Component-specific icons (hardcoded in source)

| Component | Icon | Size | Variant | Color |
|-----------|------|------|---------|-------|
| Toast — positive | `TickCircle` | 24 | **Bold** | `#159201` |
| Toast — warning | `Warning2` | 24 | **Bold** | `#E07900` |
| Toast — negative | `CloseCircle` | 24 | **Bold** | `#FF4646` |
| Toast — neutral | `InfoCircle` | 24 | **Bold** | `#071331` |
| Infobox — positive | `TickCircle` | 24 | **Bold** | `#159201` |
| Infobox — warning | `Warning2` | 24 | **Bold** | `#E07900` |
| Infobox — danger | `CloseCircle` | 24 | **Bold** | `#FF4646` |
| Infobox — neutral/brand | `InfoCircle` | 24 | **Bold** | `#1260EB` |
| DropdownSelector chevron | `ArrowDown2` | 20 | Linear | `--color-neutral-500` = #9ca1ad |
| DropdownSelector left icon | `HambergerMenu` | 24 | Linear | `--color-neutral-700` = #4d637b |
| Input dropdown chevron | `ArrowDown2` | 20 | Linear | `--color-neutral-500` |
| Input status — positive | `TickCircle` | 20 | Linear | `--color-green-400` |
| Input status — negative | `CloseCircle` | 20 | Linear | `--color-red-400` |
| Input status — warning | `Warning2` | 20 | Linear | `--color-orange-500` |

### Custom built-in icons (not from iconsax)

These live in `src/components/ui/Icon/Icon.tsx` and fill gaps where iconsax doesn't have the right shape:

| Icon | Used in | SVG path |
|------|---------|----------|
| `CloseIcon` | Chip remove button, Toast dismiss | `M18 6L6 18M6 6l12 12` — 1.5px stroke, round linecap |
| `SpinnerIcon` | Input loading state | Circle with strokeDasharray="14 38", animated |

When representing these in Paper designs, use the same path/shape described above.

---

## Typography (from `src/styles/tokens.css`)

| Token | Value | Use |
|-------|-------|-----|
| `--text-heading-1` | Montserrat Bold 700, 48px, line-height 1.2 | Page titles |
| `--text-heading-2` | Montserrat Bold 700, 40px, line-height 1.2 | Section titles |
| `--text-heading-3` | Montserrat Bold 700, 32px, line-height 1.2 | Sub-section |
| `--text-heading-4` | Montserrat Bold 700, 24px, line-height 1.2 | Card headings |
| `--text-heading-5` | Montserrat Bold 700, 20px, line-height 1.2 | Small headings |
| `--text-subtitle-1` | Montserrat SemiBold 600, 24px, line-height 1.25 | |
| `--text-subtitle-2` | Montserrat SemiBold 600, 20px, line-height 1.25 | |
| `--text-subtitle-3` | Montserrat SemiBold 600, 16px, line-height 1.25 | Button big label, Toast title |
| `--text-subtitle-4` | Montserrat SemiBold 600, 14px, line-height 1.25 | Button small label, Infobox title |
| `--text-body-1` | Inter Medium 500, 20px, line-height 1.5 | |
| `--text-body-2` | Inter Medium 500, 16px, line-height 1.5 | Input regular |
| `--text-body-3` | Inter Medium 500, 14px, line-height 1.5 | Input small, Chip regular, labels |
| `--text-body-4` | Inter Medium 500, 12px, line-height 1.5 | Chip small, Tooltip, Infobox body |

**Heading tracking:** always add `letter-spacing: -0.5px` alongside any `--text-heading-*` token.

---

## Border Radius (from `src/styles/tokens.css`)

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-xxl` | 20px |
| `--radius-full` | 9999px |

---

## Spacing (from `src/styles/tokens.css`)

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-7` | 28px |
| `--space-8` | 32px |
| `--space-9` | 36px |
| `--space-10` | 40px |
| `--space-11` | 44px |
| `--space-12` | 48px |

---

## Component Specs

### Button

Source: `src/components/ui/Button/Button.css`

| Property | Big | Small |
|----------|-----|-------|
| Border-radius | `--radius-lg` = **12px** | **12px** |
| Font | `--text-subtitle-3` = Montserrat SemiBold 600 16px | `--text-subtitle-4` = Montserrat SemiBold 600 14px |
| Padding | `10px 16px` | `8px 12px` |
| Min-height | **44px** | **36px** |
| Icon size | **20×20px** | **16×16px** |
| Gap (icon + label) | **6px** | **6px** |
| Icon-only size | **40×40px** (padding 10px) | **34×34px** (padding 9px) |

**Colors by level:**

| Level | Background | Text | Border |
|-------|-----------|------|--------|
| Primary | `--color-neutral-800` = #071331 | White | None |
| Secondary | White | `--color-neutral-800` = #071331 | 1px `--color-border-default` = #e5e5e5 |
| Tertiary | Transparent | `--color-neutral-800` | None |
| Primary + Danger | `--color-red-400` = #ff4646 | White | None |
| Secondary + Danger | White | `--color-red-400` = #ff4646 | 1px `--color-red-300` = #fa7575 |
| Disabled | `--color-neutral-400` = #cccccc | White | None |

---

### Chip

Source: `src/components/ui/Chip/Chip.css`

| Property | Regular | Small | X-Small | Xx-Small |
|----------|---------|-------|---------|----------|
| Border-radius | `--radius-full` = **9999px** | 9999px | 9999px | 9999px |
| Font | `--text-body-3` = Inter 500 14px | `--text-body-4` = Inter 500 12px | 12px | 12px |
| Padding | `8px 12px` | `4px 12px` | `4px 8px` | `2px 8px` |
| Border | 1px transparent (primary) | same | same | same |

**Colors by type:**

| Type | Primary bg | Primary text | Secondary bg | Secondary border | Secondary text |
|------|-----------|-------------|-------------|-----------------|---------------|
| Neutral | `--color-neutral-200` = #ececec | `--color-neutral-800` | White | `--color-neutral-300` = #e5e5e5 | `--color-neutral-800` |
| Positive | `--color-green-400` = #159201 | White | `--color-green-100` = #e6fde8 | `--color-green-300` = #98d28f | `--color-green-500` = #167322 |
| Negative | `--color-red-400` = #ff4646 | White | `--color-red-100` = #fcf5f7 | `--color-red-300` = #fa7575 | `--color-red-500` = #b90808 |
| Alert | `--color-orange-500` = #e07900 | White | `--color-orange-100` = #fff9f3 | `--color-orange-300` = #fce4c8 | `--color-orange-500` = #e07900 |
| Brand | `--color-blue-400` = #1260eb | White | `--color-blue-100` = #f3f7fe | `--color-blue-300` = #85b1ff | `--color-blue-500` = #012abb |

---

### Checkbox

Source: `src/components/ui/Checkbox/Checkbox.css`

- Wrapper gap: **8px**
- Box size: **16×16px**
- Border-radius: `--radius-sm` = **4px**
- Border: **1.5px** solid `--color-neutral-400` = #cccccc
- Font (label): `--text-body-3` = Inter 500 14px

| State | Background | Border |
|-------|-----------|--------|
| Unchecked | White | `--color-neutral-400` = #cccccc |
| Checked | `--color-blue-400` = #1260eb | `--color-blue-400` |
| Indeterminate | `--color-blue-400` | `--color-blue-400` |
| Disabled | `--color-neutral-50` = #fbfbfb | `--color-neutral-200` = #ececec |

---

### Toggle

Source: `src/components/ui/Toggle/Toggle.css`

- Wrapper gap: **8px**
- Track: **48×28px**, border-radius `--radius-full`
- Track padding: **2px**
- Thumb: **24×24px**, border-radius 50%
- Thumb travel: **translateX(20px)** when checked
- Font (label): `--text-body-3` = Inter 500 14px

| State | Track color |
|-------|------------|
| Off | `--color-neutral-400` = #cccccc |
| On | `--color-blue-400` = #1260eb |
| Disabled off | `--color-neutral-500` = #9ca1ad, opacity 0.6 |
| Disabled on | `--color-blue-200` = #bcddff |

---

### Radio

Source: `src/components/ui/Radio/Radio.css`

- Wrapper gap: **8px**
- Circle: **16×16px**, border-radius 50%
- Border: **1.5px** solid `--color-neutral-300` = #e5e5e5
- Default bg: `--color-neutral-100` = #f0f2f4
- Dot (when selected): **8×8px**, color `--color-blue-400` = #1260eb
- Font (label): `--text-body-3` = Inter 500 14px

| State | Circle border | Circle bg | Dot |
|-------|--------------|----------|-----|
| Unselected | `--color-neutral-300` | `--color-neutral-100` | None |
| Selected | `--color-blue-400` = #1260eb | White | `--color-blue-400` |
| Disabled | `--color-neutral-300`, opacity 0.5 | `--color-neutral-100` | None |

---

### Input

Source: `src/components/ui/Input/Input.css`

- Border-radius: `--radius-md` = **8px**
- Border: **1px** solid `--color-border-default` = #e5e5e5
- Focus shadow: `0 0 0 3px rgba(18, 96, 235, 0.15)`
- Label font: `--text-body-3` = Inter 500 14px
- Supportive text font: `--text-body-4` = Inter 500 12px

| Size | Inner padding | Font |
|------|--------------|------|
| Regular | `12px 16px` | `--text-body-2` = Inter 500 16px |
| Small | `8px 12px` | `--text-body-3` = Inter 500 14px |

| Status | Border color |
|--------|-------------|
| Default | `--color-border-default` = #e5e5e5 |
| Focus | `--color-blue-400` = #1260eb |
| Positive | `--color-green-400` = #159201 |
| Negative | `--color-red-400` = #ff4646 |
| Warning | `--color-orange-500` = #e07900 |
| Disabled | `--color-neutral-200`, bg `--color-neutral-100` |

---

### DropdownSelector

Source: `src/components/ui/DropdownSelector/DropdownSelector.css`

- Border-radius: `--radius-md` = **8px**
- Border: **1px** solid `--color-border-default` = #e5e5e5

| Size | Padding | Font | Min-height |
|------|---------|------|-----------|
| Big | `10px 12px` | `--text-body-3` = Inter 500 14px | **44px** |
| Small | `6px 10px` | `--text-body-4` = Inter 500 12px | **36px** |

| State | Background | Border | Shadow |
|-------|-----------|--------|--------|
| Default | White | `--color-border-default` | None |
| Open | `--color-blue-100` = #f3f7fe | `--color-blue-400` | `0 0 0 3px rgba(18,96,235,0.15)` |
| Selected text | White | `--color-border-default` | None — but text becomes `--color-blue-400` |
| Disabled | `--color-neutral-100` | `--color-neutral-200` | None |

---

### DropdownMenuGroup

Source: `src/components/ui/DropdownMenuGroup/DropdownMenuGroup.css`

- Border-radius: `--radius-lg` = **12px**
- Border: **1px** solid `--color-neutral-200` = #ececec
- Shadow: `0 5px 15px rgba(0, 0, 0, 0.07)`
- Background: White
- Min-width: **225px**

---

### DropdownMenuList

Source: `src/components/ui/DropdownMenuList/DropdownMenuList.css`

- Padding: **12px** (all sides)
- Min-width: **225px**
- Font: `--text-body-3` = Inter 500 14px
- Default text: `--color-neutral-800` = #071331
- Gap: **8px**
- Icon: **20×20px**, color `--color-neutral-700` = #4d637b
- List header padding: `8px 12px`, font `--text-body-4`

| State | Background | Text |
|-------|-----------|------|
| Default | White | `--color-neutral-800` |
| Hover | `--color-blue-100` = #f3f7fe | `--color-blue-400` = #1260eb |
| Danger | White | `--color-red-400` = #ff4646 |
| Danger hover | `--color-red-100` = #fcf5f7 | `--color-red-400` |
| List header | `--color-neutral-100` | `--color-neutral-700` |

---

### Toast

Source: `src/components/ui/Toast/Toast.css`

- Width: **400px** (min 360px)
- Padding: **16px**
- Border-radius: `--radius-lg` = **12px**
- Border: **2px** solid (type-specific color)
- Shadow: `0px 12px 38px 0px rgba(0, 0, 0, 0.15)`
- Title font: `--text-subtitle-3` = Montserrat SemiBold 600 16px
- Body font: `--text-body-3` = Inter 500 14px
- Main row gap: **16px**
- Content gap: **16px**

| Type | Background | Border |
|------|-----------|--------|
| Neutral | White | `--color-neutral-300` = #e5e5e5 |
| Positive | `--color-green-100` = #e6fde8 | `--color-green-300` = #98d28f |
| Warning | `--color-orange-100` = #fff9f3 | `--color-orange-300` = #fce4c8 |
| Negative | `--color-red-100` = #fcf5f7 | `--color-red-200` = #ffd7d7 |

---

### Infobox

Source: `src/components/ui/Infobox/Infobox.css`

- Padding: **`12px 16px`**
- Border-radius: `--radius-lg` = **12px**
- Border: **1px** solid
- Gap: **16px**
- Icon: **24×24px**
- Title font: `--text-subtitle-4` = Montserrat SemiBold 600 14px
- Body font: `--text-body-4` = Inter 500 12px

| Type | Background | Border | Title color | Icon color |
|------|-----------|--------|-------------|-----------|
| Neutral | `--color-neutral-100` = #f0f2f4 | `--color-neutral-400` = #cccccc | `--color-neutral-800` | `--color-neutral-700` |
| Positive | `--color-green-100` = #e6fde8 | `--color-green-500` = #167322 | `--color-green-500` | `--color-green-400` |
| Warning | `--color-orange-100` = #fff9f3 | `--color-orange-500` = #e07900 | `--color-orange-500` | `--color-orange-500` |
| Danger | `--color-red-100` = #fcf5f7 | `--color-red-500` = #b90808 | `--color-red-500` | `--color-red-400` |
| Brand | `--color-blue-100` = #f3f7fe | `--color-blue-300` = #85b1ff | `--color-blue-400` | `--color-blue-400` |

---

### Tooltip

Source: `src/components/ui/Tooltip/Tooltip.css`

- Background: `--color-neutral-800` = #071331
- Text: White
- Font: `--text-body-4` = Inter 500 12px
- Padding: **`8px 12px`**
- Border-radius: `--radius-full` = **9999px**
- Max-width: **200px**
- Arrow: SVG triangle 11×10px, same color as bubble (#071331)

**Arrow position semantics** — `arrowPosition` names where the arrow sits ON the bubble (not where it floats):

| arrowPosition | Arrow location | Tooltip floats |
|--------------|----------------|----------------|
| `up` / `up-left` / `up-right` | Top of bubble, points up | **Below** the trigger |
| `bottom` / `bottom-left` / `bottom-right` | Bottom of bubble, points down | **Above** the trigger |
| `left` | Left of bubble, points left | **Right** of the trigger |
| `right` | Right of bubble, points right | **Left** of the trigger |

---

### PrimaryNavItem

Source: `src/components/ui/PrimaryNavItem/PrimaryNavItem.css`

- Font: `--text-body-3` = Inter 500 14px
- Border-radius: `--radius-md` = **8px**
- Padding: **`8px`** (all sides)
- Icon: **20×20px**
- Gap (icon → label): `--space-3` = **12px**

| Type | Width |
|------|-------|
| default | **232px** |
| collapsed (icon-only) | **36×36px**, centered |

| State | Background | Text color |
|-------|-----------|------------|
| idle | `--color-bg-default` = #ffffff | `--color-text-secondary` = #4d637b |
| idle (hover) | `--color-bg-muted` = #f0f2f4 | `--color-text-primary` = #071331 |
| hover | `--color-bg-muted` = #f0f2f4 | `--color-text-primary` = #071331 |
| active | `--color-brand-subtle` = #f3f7fe | `--color-brand-default` = #1260eb |

Collapsed type shows a **right-floating tooltip** (Tooltip component, `arrowPosition="left"`) on hover. Active state swaps `icon` → `iconActive`.

---

### SecondaryNavItem

Source: `src/components/ui/SecondaryNavItem/SecondaryNavItem.css`

- Font: `--text-body-3` = Inter 500 14px
- Border-radius: `--radius-lg` = **12px**
- Padding: `--space-2` `--space-3` = **8px 12px**
- Width: **100%** (fills container)
- Icon: **20×20px**, gap: `--space-3` = **12px**

| State | Background | Text |
|-------|-----------|------|
| idle | White | `--color-text-primary` = #071331 |
| idle (hover) | `--color-bg-muted` = #f0f2f4 | #071331 |
| hover | `--color-bg-muted` | #071331 |
| active | `--color-bg-muted` | #071331 |
| disabled | White | `--color-text-tertiary` = #9ca1ad, `pointer-events: none` |

---

### TertiaryNavItem

Source: `src/components/ui/TertiaryNavItem/TertiaryNavItem.css`

- Size: **32×32px**
- Padding: `--space-2` = **8px**
- Border-radius: `--radius-lg` = **12px**
- Icon: **16×16px**, color `--color-text-secondary` = #4d637b

| State | Background |
|-------|-----------|
| idle | `--color-bg-subtle` = #fbfbfb |
| hover | `--color-bg-muted` = #f0f2f4 |

Shows an **above-floating tooltip** (Tooltip component, `arrowPosition="bottom"`) on hover.

---

### PrimaryNavGroup

Source: `src/components/ui/PrimaryNavGroup/PrimaryNavGroup.css`

Groups PrimaryNavItems. Handles `padding: 0 4px` and `gap: --space-1` (4px) between items.

| Type | Width | Align |
|------|-------|-------|
| expanded | **240px** | left |
| collapsed | **48px** | center |

---

### SecondaryNavGroup

Source: `src/components/ui/SecondaryNavGroup/SecondaryNavGroup.css`

- Optional title: `--text-body-3`, color `--color-text-secondary`, `padding: 0 12px`
- Items wrapper: `border-radius: --radius-xl` = **16px**, `overflow: hidden`, `gap: 2px`
- Width: 100% of container

---

### TertiaryNavGroup

Source: `src/components/ui/TertiaryNavGroup/TertiaryNavGroup.css`

Footer bar for PrimaryNavSidebar (expanded only).

- Width: **240px**
- Padding: `--space-2` `--space-3` = **8px 12px**
- Border-top: **1px** solid `--color-border-default` = #e5e5e5
- Layout: `justify-content: space-between` — `start` slot (left, gap 8px) + `end` slot (right)

---

### PrimaryNavSidebar

Source: `src/components/ui/PrimaryNavSidebar/PrimaryNavSidebar.css`
Figma: node 3015-2969 (expanded), 2950-1133 (collapsed)

- Background: `--color-bg-default` = White
- Border-right: **1px** solid `--color-border-default` = #e5e5e5
- `overflow: visible` (required so collapsed-mode tooltips aren't clipped)
- Layout: `flex-direction: column; justify-content: space-between`

| Mode | Width |
|------|-------|
| expanded | **240px** |
| collapsed | **48px** |

Separator: **1px** `--color-bg-emphasis` = #ececec, **full width** (no horizontal padding). Groups: `PrimaryNavGroup`. Footer: `TertiaryNavGroup` (expanded only).

Expanded body uses `overflow-y: auto` for scroll. Collapsed body uses `overflow: visible` (tooltip must escape the sidebar).

---

### SecondaryNavSidebar

Source: `src/components/ui/SecondaryNavSidebar/SecondaryNavSidebar.css`
Figma: node 2950-1489

- Width: **280px**
- Padding: `--space-3` `--space-2` = **12px 8px**
- Background: White, border-right 1px `--color-border-default`
- `overflow: visible`
- Divider between sections: **1px** `--color-border-default`, `margin: 8px 0` (contained within padding)
- Uses `SecondaryNavGroup` for each section (rounded item containers)
