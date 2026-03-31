# Moji Storybook — Claude Code Reference

> Every story must consume tokens from `tokens.css`. No hardcoded values.
> Component API → `src/components/ui/CONTEXT.md` and each `{Component}/CONTEXT.md`.

---

## Language: JavaScript Only

All files are plain JS. **Never** create `.ts`/`.tsx`. No TypeScript syntax whatsoever:
no `interface`, `type Foo =`, `: string`, `as SomeType`, `import type`, generic params on `forwardRef`/`useRef`.

| File type | Extension |
|-----------|-----------|
| Component source (JSX) | `.js` |
| Story files | `.stories.jsx` |
| All other (index, config, utils) | `.js` |

---

## Commands

```shell
npm run storybook        # dev server :6006
npm run build-storybook  # verify before marking done — zero errors required
gh auth setup-git && git push origin main
npx chromatic --project-token=chpt_b32490bc392df97
```

---

## Project Structure

```
src/
├── styles/        ← tokens.css, global.css (token source of truth)
└── components/ui/ ← all components; CONTEXT.md index here

stories/
├── 0-foundations/ ← Colors, Typography, Spacing, Radius, Shadows, Icons
├── 1-atoms/       ← Button, Checkbox, Toggle, Radio, Icon, Tooltip
├── 2-molecules/   ← Input, Chip, Dropdowns, Toast, Infobox, Nav/HMenu items
└── 3-organisms/   ← PageHeader, DropdownMenuGroup, Nav groups/sidebars, HMenu groups
```

Font: Inter + Montserrat via `.storybook/preview-head.html` only — do NOT `@import` in CSS.

---

## Agent Workflow

1. **Plan first** — 3+ steps or architectural decision: outline before touching files. Single-file fix: proceed directly.
2. **Verify** — `npm run build-storybook` (zero errors) before marking done.
3. **Self-improve** — after corrections, write `feedback_*.md` (rule + **Why** + **How to apply**).
4. **Demand elegance** — minimal correct solution; no one-off abstractions or unprompted cleanup.
5. **Bug fix autonomously** — read error → trace source → fix → build confirm.
6. **Multi-step tracking** — plan → confirm → mark steps done → summarize *what changed*.

---

## The ONE Rule — Tokens Only

Never hardcode hex, px, or rgba. Always use CSS custom properties from `src/styles/tokens.css`:

```jsx
style={{ color: 'var(--color-text-primary)' }}  // ✅
style={{ gap: 'var(--space-3)' }}               // ✅
style={{ color: '#071331' }}                     // ❌
style={{ gap: 12 }}                              // ❌ (numbers = px)
```

---

## Story Template (CSF3 — plain JavaScript)

```jsx
import React from 'react';
import { MyComponent } from '../../../src/components/ui/MyComponent/MyComponent';
import '../../../src/components/ui/MyComponent/MyComponent.css';
const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=XXXX-XXXX';
const meta = {
  title: 'Atoms/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA_URL } },
};
export default meta;
export const Default = { args: {} };
export const Playground = { args: {}, parameters: { chromatic: { disableSnapshot: true } } }; // MUST be last
```

No `Meta`, `StoryObj`, type annotations, or `: Story` — plain JavaScript only.

---

## Story Naming

| Level | `title` pattern | Example |
|-------|----------------|---------|
| Foundation | `Foundations/TokenGroup` | `Foundations/Colors` |
| Atom | `Atoms/ComponentName` | `Atoms/Button` |
| Molecule | `Molecules/ComponentName` | `Molecules/Input` |
| Molecule nav | `Molecules/Nav/ComponentName` | `Molecules/Nav/PrimaryNavItem` |
| Molecule menu | `Molecules/HorizontalMenu/ComponentName` | `Molecules/HorizontalMenu/PrimaryItem` |
| Organism | `Organisms/ComponentName` | `Organisms/PageHeader` |
| Organism nav | `Organisms/Nav/ComponentName` | `Organisms/Nav/PrimaryNavGroup` |
| Organism dropdown | `Organisms/Dropdown/ComponentName` | `Organisms/Dropdown/DropdownMenuGroup` |
| Organism menu | `Organisms/HorizontalMenu/ComponentName` | `Organisms/HorizontalMenu/PrimaryGroup` |

Story export names: **PascalCase** state names only. No `Story1`.

---

## Import Paths

Stories are 3 levels deep — prefix is always `../../../src/`:

```jsx
import { Button } from '../../../src/components/ui/Button/Button';
import '../../../src/components/ui/Button/Button.css';
import { Add } from 'iconsax-react';                                    // 993 icons, v0.0.8
import { CloseIcon, SpinnerIcon, Icon } from '../../../src/components/ui/Icon/Icon';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';
```

Do NOT use `@lib/` alias, reference `jimo-component-library`, or re-import `tokens.css`.

---

## Key argType Rules

- Button `level` → control label `"variant"`
- Input `inputType` → `"type"`, `status` → `"state"`, `type` (HTML) → `"htmlType"`
- Icon props: use full `ALL_ICON_NAMES` set — never a hand-picked subset. Place `render` at meta level:

```jsx
const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];
// meta: render: ({ leftIconName, ...args }) => <Button {...args} leftIcon={getIcon(leftIconName)} />
```

---

## Component Composition Rules

- Reuse atoms inside molecules/organisms — no raw `<button>` where `<Button>` exists.
- `iconsax-react` icons inside CSS color classes: always `color="currentColor"`.
- Tooltip: always `<Tooltip>` component — never CSS border-triangle tricks.
  - `PrimaryNavItem` collapsed → `arrowPosition="left"` | `TertiaryNavItem` → `arrowPosition="bottom"`
  - Keep tooltip in DOM always; toggle `opacity` + `scale` (never `{visible && <Tooltip>}`).
- Sidebar scroll: `overflow-y: auto` only on expanded variant — collapsed must use `overflow: visible` or it clips tooltips.
- Nav `href` prop: render `<a href={href}>` when present, else `<div role="button" tabIndex={0}>`.
- `PageHeader type="main"` and `type="sub"` must never render simultaneously — swap conditionally.

---

## Interactive Story Patterns

**Toast** — stateful `ToastDemo` wrapper, trigger with `<Button>`. `onDismiss` unmounts it.

**Tooltip** — always in DOM, toggle via style (never `{visible && <Tooltip>}`):
```jsx
<div style={{ opacity: visible ? 1 : 0, transform: `scale(${visible ? 1 : 0.85})`, transition: 'var(--transition-base)' }}>
  <Tooltip arrowPosition={arrowPosition}>{children}</Tooltip>
</div>
```

---

## Jimo Product Brand Icons — MANDATORY

Every Jimo product has a fixed icon — never substitute. Both variants required: `"Linear"` (idle) / `"Bold"` (active), always `color="currentColor"`.

| Product | Icon | Source |
|---------|------|--------|
| Tours | `Routing2` | iconsax-react |
| Surveys | `Notepad2` | iconsax-react (`Note2` does not exist) |
| Banners | `BannerIcon` | `ui/Icon/Icon` (custom SVG) |
| Hints | `Notification1` | iconsax-react |
| Checklists | `TaskSquare` | iconsax-react |
| Resource Centers | `DirectboxNotif` | iconsax-react |
| Agent | `AgentIcon` | `ui/Icon/Icon` (custom SVG) |
| Spaces | `Element3` | iconsax-react |
| Success Tracker | `Chart2` | iconsax-react |
| Actions | `Flash1` | iconsax-react |
| Users & Segments | `Profile2User` | iconsax-react |
| Settings | `Setting2` | iconsax-react |

Does NOT apply to generic UI status icons (e.g. `InfoCircle` in Toast) or Agent sub-features.

---

## Chromatic & Definition of Done

**Chromatic:** `Playground` always `{ chromatic: { disableSnapshot: true } }`. Never disable on `Default` or state stories.

**A story is done when:**
1. `Default` + all meaningful state stories + `Playground` exist
2. Every story has `parameters.design.url` (Figma link)
3. `npm run build-storybook` passes — zero errors
4. Chromatic baseline approved

---

## Component Reference

- **Component index:** `src/components/ui/CONTEXT.md`
- **Component API (props, variants, examples):** `src/components/ui/{Name}/CONTEXT.md`
- **Figma:** `https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji`

When a Figma node from `get_design_context` is NOT a "component" node (frame/group/instance): check `src/components/ui/` for an existing match first — only create a new component if none exists and the user explicitly asks.
