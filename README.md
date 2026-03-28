# Moji Design System — Storybook

The living documentation and development environment for the **Moji design system** by Jimo. Browse components, design tokens, and interactive stories in one place.

[![Storybook](https://img.shields.io/badge/Storybook-10.x-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

---

## What's Inside

| Layer | Components |
|-------|-----------|
| **Foundations** | Colors, Typography, Spacing, Border Radius, Shadows, Icons |
| **Atoms** | Button, Checkbox, Toggle, Radio, Icon, Tooltip, UserIcon, UserAvatar, ModalOverlay, ExperienceStatus |
| **Molecules** | Input, Chip, DropdownSelector, DropdownMenuList, DropdownFilter, Toast, Infobox, PrimaryNavItem, SecondaryNavItem, TertiaryNavItem, PrimaryHorizontalMenuItem, SecondaryHorizontalMenuItem, ExperienceTags |
| **Organisms** | DropdownMenuGroup, DropdownFilter (composed), PrimaryNavGroup, SecondaryNavGroup, TertiaryNavGroup, PrimaryNavSidebar, SecondaryNavSidebar, PrimaryHorizontalMenuGroup, SecondaryHorizontalMenuGroup, PageHeader, ViewToolbar, ExperienceCard |

All components are fully documented with:
- Interactive controls via Storybook's args panel
- Live Figma design links on every story
- Accessibility (a11y) audit built in
- Chromatic visual regression coverage

---

## Getting Started

### Prerequisites

- Node.js 22+ (see `.node-version`)
- npm 10+

### Install

```bash
git clone https://github.com/fahmi-jimo-ai/jimo-storybook.git
cd jimo-storybook
npm install
```

### Run locally

```bash
npm run storybook
# Opens at http://localhost:6006
```

### Build static site

```bash
npm run build-storybook
# Output: storybook-static/
```

### Verify correctness

```bash
npm run build-storybook
# Must pass with zero errors before committing
```

---

## Using Moji Components in Your Project

The components live in `src/components/ui/`. To use them in another project:

### Option 1 — Copy components directly

Copy the component directory you need:

```
src/components/ui/Button/        → Button.js + Button.css
src/components/ui/Input/         → Input.js + Input.css
src/styles/tokens.css            → required by all components
```

Then in your project:

```jsx
// Import the token sheet once at your app root
import './tokens.css';

// Import the component
import { Button } from './components/ui/Button/Button';
import './components/ui/Button/Button.css';

// Use it
<Button level="primary" size="medium" label="Click me" />
```

### Option 2 — Use the Storybook MCP server (AI-assisted development)

Run Storybook and point your AI assistant at the MCP endpoint:

```bash
# In jimo-storybook
npm run storybook

# In your project's .mcp.json
{
  "mcpServers": {
    "moji-storybook": {
      "type": "http",
      "url": "http://localhost:6006/mcp"
    }
  }
}
```

Copy `.storybook/mcp-system-prompt.md` into your project's `CLAUDE.md` to give your AI agent full Moji token rules and component usage guidelines.

### Required peer dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "iconsax-react": "^0.0.8"
}
```

---

## Project Structure

```
jimo-storybook/
├── src/
│   ├── components/ui/          # Component source (34 components)
│   │   ├── Button/
│   │   ├── Checkbox/
│   │   ├── Chip/
│   │   ├── DropdownFilter/
│   │   ├── DropdownMenuGroup/
│   │   ├── DropdownMenuList/
│   │   ├── DropdownSelector/
│   │   ├── ExperienceCard/
│   │   ├── ExperienceStatus/
│   │   ├── ExperienceTags/
│   │   ├── Icon/
│   │   ├── Infobox/
│   │   ├── Input/
│   │   ├── ModalOverlay/
│   │   ├── PageHeader/
│   │   ├── PrimaryHorizontalMenuGroup/
│   │   ├── PrimaryHorizontalMenuItem/
│   │   ├── PrimaryNavGroup/
│   │   ├── PrimaryNavItem/
│   │   ├── PrimaryNavSidebar/
│   │   ├── Radio/
│   │   ├── SecondaryHorizontalMenuGroup/
│   │   ├── SecondaryHorizontalMenuItem/
│   │   ├── SecondaryNavGroup/
│   │   ├── SecondaryNavItem/
│   │   ├── SecondaryNavSidebar/
│   │   ├── TertiaryNavGroup/
│   │   ├── TertiaryNavItem/
│   │   ├── Toast/
│   │   ├── Toggle/
│   │   ├── Tooltip/
│   │   ├── UserAvatar/
│   │   ├── UserIcon/
│   │   └── ViewToolbar/
│   ├── hooks/
│   │   └── useSmartPopupOffset.js  # Viewport-aware popup/menu alignment hooks
│   └── styles/
│       ├── tokens.css              # Design tokens (single source of truth)
│       └── global.css              # CSS reset + base styles
│
├── stories/
│   ├── 0-foundations/          # Token documentation stories
│   ├── 1-atoms/                # Atom component stories
│   ├── 2-molecules/            # Molecule stories (inputs, nav items, tab items)
│   ├── 3-organisms/            # Organism stories (groups, sidebars, composed UI sections)
│   └── utils/
│       └── icons.js            # 993 iconsax icon names + resolver
│
├── .storybook/
│   ├── main.js                 # Storybook config, addons, Vite aliases
│   ├── preview.js              # Global token imports, viewports
│   ├── manager.js              # Storybook UI theme (Jimo branding)
│   ├── preview-head.html       # Google Fonts (Inter + Montserrat)
│   └── mcp-system-prompt.md   # MCP system prompt for AI agents
│
└── docs/
    └── PAPER_DESIGN_SPECS.md   # Design specification reference
```

---

## Design Tokens

All tokens are CSS custom properties defined in `src/styles/tokens.css` and scoped to `:root`. Every component uses tokens exclusively — no hardcoded hex values, pixel values, or rgba strings anywhere in the codebase.

### Token categories

| Category | Example | Value |
|----------|---------|-------|
| Typography | `var(--text-heading-1)` | Montserrat 700, 48px/1.2 |
| Typography | `var(--text-body-3)` | Inter 500, 14px/1.5 |
| Color — Semantic | `var(--color-text-primary)` | `#071331` |
| Color — Semantic | `var(--color-brand-default)` | `#1260EB` |
| Color — Semantic | `var(--color-danger-default)` | `#FF4646` |
| Spacing | `var(--space-4)` | `16px` (4px grid) |
| Radius | `var(--radius-lg)` | `12px` |
| Shadow | `var(--shadow-md)` | Card/dropdown elevation |
| Transition | `var(--transition-base)` | `200ms ease` |

> Always use semantic color tokens (e.g. `--color-text-primary`) over primitive tokens (e.g. `--color-neutral-800`) wherever a semantic alias exists.

---

## Hooks

Reusable positioning hooks live in `src/hooks/`. Do **not** install Radix, Floating UI, or Popper — these hooks cover all cases.

### `useSmartPopupOffset(ref, visible, padding?)`

Clamps a **centered popup** (`translateX(-50%)`) to the viewport. Fires after mount via `requestAnimationFrame` to avoid layout shift. Attach `ref` to the popup element and pass the visibility boolean.

```js
import { useSmartPopupOffset } from '../../../hooks/useSmartPopupOffset';

const popupRef = useRef(null);
useSmartPopupOffset(popupRef, isOpen);
```

### `useSmartMenuAlign(ref, isOpen, padding?)`

Auto-flips a **left-anchored dropdown menu** to right-aligned when it would overflow the viewport. Used by `DropdownFilter`.

```js
import { useSmartMenuAlign } from '../../../hooks/useSmartPopupOffset';

const menuRef = useRef(null);
useSmartMenuAlign(menuRef, isOpen);
```

> For portal elements rendered to `document.body` (position: fixed), use `usePortalDropdown` in the consuming app instead.

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| React | 18.3 | Component framework |
| JavaScript (ES2022) | — | Plain JS, no TypeScript |
| Vite | 6.0 | Build tooling |
| Storybook | 10.2 | Component explorer |
| iconsax-react | 0.0.8 | 993-icon library |
| @storybook/addon-designs | 11.x | Figma design links |
| @chromatic-com/storybook | 5.x | Visual regression testing |
| @storybook/addon-a11y | 10.x | Accessibility audits |
| @storybook/addon-mcp | latest | MCP server for AI agents |

---

## Writing Stories

All stories follow the [CSF3](https://storybook.js.org/docs/api/csf) format in plain JavaScript. Key rules:

- **Token-only styling** — never hardcode hex values, pixel values, or rgba strings
- **Playground story last** — always with `chromatic: { disableSnapshot: true }`
- **PascalCase exports** — `export const Default`, `export const Disabled`, never `story1`
- **Interactive wrappers** — Toast and Tooltip use wrapper components with visible triggers
- **Full icon set** — any icon control uses all 993 icons via `ALL_ICON_NAMES` from `stories/utils/icons.js`

See `CLAUDE.md` for the complete story-writing reference.

---

## Recent Changes

### March 2026

**New components:**
- **`UserIcon`** — User avatar placeholder with 8 preset SVG avatar assets and initials fallback
- **`UserAvatar`** — User avatar with image support and graceful fallback
- **`ModalOverlay`** — Backdrop overlay for modal dialogs
- **`ViewToolbar`** — Toolbar organism for view-level search, filter, and sort actions

**New hook:**
- **`useSmartPopupOffset` / `useSmartMenuAlign`** — Viewport-aware alignment hooks for popups and menus; auto-clamp or auto-flip on viewport overflow without any third-party positioning library

**Component updates:**
- **`Tooltip`** — Replaced arrow-based layout with a binary-search width algorithm for clean 1–2 line wrapping; removed `arrowPosition` prop and SVG arrow element
- **`PageHeader`** — Refactored padding model so the tab bar spans full-width while heading rows retain horizontal padding; added `page-header__tabs` wrapper
- **`DropdownFilter`** — Integrated `useSmartMenuAlign` so the menu auto-flips to right-aligned on viewport overflow
- **`PrimaryNavSidebar`** — Added **Actions** nav item (Flash icon) to the analytics section; added a dedicated **Settings** section at the bottom

---

## Figma

Design source: [Moji in Figma](https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji)

Every story links back to its corresponding Figma node via `@storybook/addon-designs`.

---

## Visual Regression (Chromatic)

After every push, run Chromatic to capture snapshots and update baselines:

```bash
# 1. Push changes
git push origin main

# 2. Run Chromatic to catch visual changes
npx chromatic --project-token=chpt_b32490bc392df97
```

Or use the npm shortcut:

```bash
npm run chromatic
```

- Every story is snapshotted at 1280px viewport
- Playground stories are excluded (`chromatic: { disableSnapshot: true }`)
- Hover/interaction stories that can't be reliably captured are also excluded
- Review and accept changes at https://www.chromatic.com/builds?appId=69b720a3c8212007bac651ed

---

## License

Private — Jimo internal use only.
