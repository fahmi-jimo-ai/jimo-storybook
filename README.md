# Moji Design System — Storybook

The living documentation and development environment for the **Moji design system** by Jimo. Browse components, design tokens, and interactive stories in one place.

[![Storybook](https://img.shields.io/badge/Storybook-10.x-FF4785?logo=storybook\&logoColor=white)](https://storybook.js.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react\&logoColor=white)](https://react.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript\&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite\&logoColor=white)](https://vitejs.dev)

***

## What's Inside

| Layer           | Components                                                                                                                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Foundations** | Colors, Typography, Spacing, Border Radius, Shadows, Icons                                                                                                                                                                                    |
| **Atoms**       | Button, Checkbox, Toggle, Radio, Icon, Tooltip, UserIcon, UserAvatar, ModalOverlay, ExperienceStatus                                                                                                                                          |
| **Molecules**   | Input, Chip, DropdownSelector, DropdownMenuList, DropdownFilter, Toast, Infobox, PrimaryNavItem, SecondaryNavItem, TertiaryNavItem, PrimaryHorizontalMenuItem, SecondaryHorizontalMenuItem, ExperienceTags, DatePicker                          |
| **Organisms**   | DropdownMenuGroup, DropdownFilter (composed), DropdownFilterNested, PrimaryNavGroup, SecondaryNavGroup, TertiaryNavGroup, PrimaryNavSidebar, SecondaryNavSidebar, PrimaryHorizontalMenuGroup, SecondaryHorizontalMenuGroup, PageHeader, ViewToolbar, ExperienceCard |

All components are fully documented with:

* Interactive controls via Storybook's args panel
* Live Figma design links on every story
* Accessibility (a11y) audit built in
* Chromatic visual regression coverage

***

## Getting Started

### Prerequisites

* Node.js 22+ (see `.node-version`)
* npm 10+

### Install

```Shell
git clone https://github.com/fahmi-jimo-ai/jimo-storybook.git
cd jimo-storybook
npm install
```

### Run locally

```Shell
npm run storybook
# Opens at http://localhost:6006
```

### Build static site

```Shell
npm run build-storybook
# Output: storybook-static/
```

### Verify correctness

```Shell
npm run build-storybook
# Must pass with zero errors before committing
```

***

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

```JSX
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

```Shell
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

```JSON
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "iconsax-react": "^0.0.8"
}
```

***

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

***

## Design Tokens

All tokens are CSS custom properties defined in `src/styles/tokens.css` and scoped to `:root`. Every component uses tokens exclusively — no hardcoded hex values, pixel values, or rgba strings anywhere in the codebase.

### Token categories

| Category         | Example                       | Value                    |
| ---------------- | ----------------------------- | ------------------------ |
| Typography       | `var(--text-heading-1)`       | Montserrat 700, 48px/1.2 |
| Typography       | `var(--text-body-3)`          | Inter 500, 14px/1.5      |
| Color — Semantic | `var(--color-text-primary)`   | `#071331`                |
| Color — Semantic | `var(--color-brand-default)`  | `#1260EB`                |
| Color — Semantic | `var(--color-danger-default)` | `#FF4646`                |
| Spacing          | `var(--space-4)`              | `16px` (4px grid)        |
| Radius           | `var(--radius-lg)`            | `12px`                   |
| Shadow           | `var(--shadow-md)`            | Card/dropdown elevation  |
| Transition       | `var(--transition-base)`      | `200ms ease`             |

> Always use semantic color tokens (e.g. `--color-text-primary`) over primitive tokens (e.g. `--color-neutral-800`) wherever a semantic alias exists.

***

## Hooks

Reusable positioning hooks live in `src/hooks/`. Do **not** install Radix, Floating UI, or Popper — these hooks cover all cases.

### `useSmartPopupOffset(ref, visible, padding?)`

Clamps a **centered popup** (`translateX(-50%)`) to the viewport. Fires after mount via `requestAnimationFrame` to avoid layout shift. Attach `ref` to the popup element and pass the visibility boolean.

```JavaScript
import { useSmartPopupOffset } from '../../../hooks/useSmartPopupOffset';

const popupRef = useRef(null);
useSmartPopupOffset(popupRef, isOpen);
```

### `useSmartMenuAlign(ref, isOpen, padding?)`

Auto-flips a **left-anchored dropdown menu** to right-aligned when it would overflow the viewport. Used by `DropdownFilter`.

```JavaScript
import { useSmartMenuAlign } from '../../../hooks/useSmartPopupOffset';

const menuRef = useRef(null);
useSmartMenuAlign(menuRef, isOpen);
```

> For portal elements rendered to `document.body` (position: fixed), use `usePortalDropdown` in the consuming app instead.

***

## Tech Stack

| Tool                     | Version | Role                      |
| ------------------------ | ------- | ------------------------- |
| React                    | 18.3    | Component framework       |
| JavaScript (ES2022)      | —       | Plain JS, no TypeScript   |
| Vite                     | 6.0     | Build tooling             |
| Storybook                | 10.2    | Component explorer        |
| iconsax-react            | 0.0.8   | 993-icon library          |
| @storybook/addon-designs | 11.x    | Figma design links        |
| @chromatic-com/storybook | 5.x     | Visual regression testing |
| @storybook/addon-a11y    | 10.x    | Accessibility audits      |
| @storybook/addon-mcp     | latest  | MCP server for AI agents  |

***

## Writing Stories

All stories follow the [CSF3](https://storybook.js.org/docs/api/csf) format in plain JavaScript. Key rules:

* **Token-only styling** — never hardcode hex values, pixel values, or rgba strings
* **Playground story last** — always with `chromatic: { disableSnapshot: true }`
* **PascalCase exports** — `export const Default`, `export const Disabled`, never `story1`
* **Interactive wrappers** — Toast and Tooltip use wrapper components with visible triggers
* **Full icon set** — any icon control uses all 993 icons via `ALL_ICON_NAMES` from `stories/utils/icons.js`

See `CLAUDE.md` for the complete story-writing reference.

***

## AI Agent Guide (Codex, Cursor, Copilot, Windsurf, etc.)

This repo is structured so any AI coding agent can navigate it effectively — not just Claude Code. Follow this guide to get full context before asking your agent to write stories or components.

### Step 1 — Load these files as context first

Always give your agent these files before any task. They are the primary sources of truth:

| File | What it contains |
|------|-----------------|
| `CLAUDE.md` | All rules: tokens-only, JS-not-TS, story template, naming, argTypes, Chromatic, Definition of Done |
| `src/styles/tokens.css` | Every design token — color, spacing, typography, radius, shadow, transition |
| `src/components/ui/CONTEXT.md` | Index of all 37 components: what each does, its atomic level, link to its own CONTEXT.md |

For a specific component, also load its own context file:

```
src/components/ui/{ComponentName}/CONTEXT.md
```

Each component CONTEXT.md contains: props table, states, dependencies, import path, and a quick JSX example.

### Step 2 — Understand the file layout

```
src/components/ui/{Name}/
├── {Name}.js       ← component source (plain JS + JSX)
├── {Name}.css      ← scoped styles using var(--token-name) only
├── index.js        ← barrel: export * from './{Name}'
└── CONTEXT.md      ← props, states, usage examples (agent reference)

stories/{level}/{Name}/
└── {Name}.stories.jsx   ← CSF3 story file
```

### Step 3 — Know the critical rules

Your agent must follow these — they are non-negotiable:

1. **Plain JavaScript only.** No `.ts`, no `.tsx`, no TypeScript syntax of any kind.
2. **Tokens only.** Never write a hex color, raw pixel value, or rgba string — always `var(--token-name)`.
3. **`Playground` story last**, always with `parameters: { chromatic: { disableSnapshot: true } }`.
4. **Icon color always `color="currentColor"`** on `iconsax-react` icons inside CSS-colored containers.
5. **Verify with `npm run build-storybook`** — zero errors required before a task is considered done.

### Example prompts

**Add a new story for an existing component:**
> "Read `CLAUDE.md`, `src/styles/tokens.css`, and `src/components/ui/Button/CONTEXT.md`. Then write a Storybook story file at `stories/1-atoms/Button/Button.stories.jsx` following the CSF3 template in CLAUDE.md. Cover: Default, Disabled, Danger, IconOnly, and Playground states."

**Understand a component's API before using it:**
> "Read `src/components/ui/Input/CONTEXT.md` and `src/components/ui/Input/Input.js`. Summarize the available props, their types, and which argType remappings apply in stories."

**Build a composed story using multiple components:**
> "Read `CLAUDE.md`, `src/components/ui/CONTEXT.md`, `src/components/ui/DropdownSelector/CONTEXT.md`, and `src/components/ui/DropdownMenuList/CONTEXT.md`. Write a story that shows a DropdownSelector wired to a list of DropdownMenuList items, all styled with tokens from `src/styles/tokens.css`."

**Check what tokens are available for a design:**
> "Read `src/styles/tokens.css`. List all spacing tokens (`--space-*`), all color tokens for backgrounds (`--color-bg-*`), and all shadow tokens (`--shadow-*`)."

**Fix a broken story build:**
> "Run `npm run build-storybook`. Read the error output, locate the file and line number, and fix the root cause. Re-run to confirm zero errors."

**Add a nav item to the primary sidebar:**
> "Read `CLAUDE.md`, `src/components/ui/PrimaryNavSidebar/CONTEXT.md`, and `src/components/ui/PrimaryNavSidebar/PrimaryNavSidebar.js`. Add a new nav item for [product name] using the correct brand icon from the Jimo Product Brand Icons table in CLAUDE.md. Both Linear (idle) and Bold (active) variants are required."

**Create a new component from scratch:**
> "Read `CLAUDE.md` (Component Source File Template section) and `src/styles/tokens.css`. Create a new component at `src/components/ui/MyComponent/` with `MyComponent.js`, `MyComponent.css`, and `index.js`. Follow the forwardRef template, use only CSS tokens, no TypeScript."

### What to avoid telling your agent

- Do **not** tell it to import from `jimo-component-library` — that repo is legacy and must not be used.
- Do **not** tell it to use `@lib/` import alias — use relative paths (`../../../src/...`).
- Do **not** ask it to re-import `tokens.css` in story files — it's already loaded globally.
- Do **not** ask it to add Google Fonts via `@import` in CSS — fonts are in `.storybook/preview-head.html`.

***

## Recent Changes

### March 2026

**New components:**

* **`UserIcon`** — User avatar placeholder with 8 preset SVG avatar assets and initials fallback
* **`UserAvatar`** — User avatar with image support and graceful fallback
* **`ModalOverlay`** — Backdrop overlay for modal dialogs
* **`ViewToolbar`** — Toolbar organism for view-level search, filter, and sort actions

**New hook:**

* **`useSmartPopupOffset`** **/** **`useSmartMenuAlign`** — Viewport-aware alignment hooks for popups and menus; auto-clamp or auto-flip on viewport overflow without any third-party positioning library

**Component updates:**

* **`Tooltip`** — Replaced arrow-based layout with a binary-search width algorithm for clean 1–2 line wrapping; removed `arrowPosition` prop and SVG arrow element
* **`PageHeader`** — Refactored padding model so the tab bar spans full-width while heading rows retain horizontal padding; added `page-header__tabs` wrapper
* **`DropdownFilter`** — Integrated `useSmartMenuAlign` so the menu auto-flips to right-aligned on viewport overflow
* **`PrimaryNavSidebar`** — Added **Actions** nav item (Flash icon) to the analytics section; added a dedicated **Settings** section at the bottom

***

## Figma

Design source: [Moji in Figma](https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji)

Every story links back to its corresponding Figma node via `@storybook/addon-designs`.

***

## Visual Regression (Chromatic)

After every push, run Chromatic to capture snapshots and update baselines:

```Shell
# 1. Push changes
git push origin main

# 2. Run Chromatic to catch visual changes
npx chromatic --project-token=chpt_b32490bc392df97
```

Or use the npm shortcut:

```Shell
npm run chromatic
```

* Every story is snapshotted at 1280px viewport
* Playground stories are excluded (`chromatic: { disableSnapshot: true }`)
* Hover/interaction stories that can't be reliably captured are also excluded
* Review and accept changes at <https://www.chromatic.com/builds?appId=69b720a3c8212007bac651ed>

***

## License

Private — Jimo internal use only.
