# Moji Storybook — Claude Code Reference

> **READ THIS BEFORE WRITING ANY STORY FILE.**
> Every story must consume tokens from `tokens.css`. No hardcoded values. No exceptions.

---

## Agent Workflow — How to Work in This Repo

These rules apply to every task, regardless of size. Read them first.

### 1. Plan Before You Build

For any task involving 3+ steps or an architectural decision (new story, refactor, config change):
- Enter plan mode and outline the approach before touching any file
- Identify which files change and why
- Stop and re-plan immediately if you hit a blocker — never brute-force through it
- Create your own to-dos, and run thoroughly each ones
- For simple single-file edits (one-line fix, typo): proceed directly without planning

### 2. Verify Before Marking Done

A task is not complete until you can prove it works:
- Run `npx tsc --noEmit` after any story or source change — zero errors required
- Ask: *"Would a senior engineer approve this?"* before wrapping up
- Never call a component story done unless all **Definition of Done** criteria are met (see § Definition of Done)
- Differentiate behavior between before and after your change when reporting results

### 3. Self-Improvement After Corrections

When the user corrects your work:
- Identify the root cause, not just the symptom
- Write a `feedback_*.md` memory file with the rule, **Why**, and **How to apply** it
- Apply the correction consistently to all similar patterns in the same session
- Do not repeat the same mistake in subsequent stories in the same file or across files

### 4. Demand Elegance

For non-trivial changes, pause and ask: is there a simpler way?
- If a fix feels like a workaround, trace it to the root cause
- Prefer the minimal correct solution over the expedient one
- Do not add abstractions or helpers for one-time use
- Do not make style, structure, or "cleanup" improvements that were not asked for

### 5. Autonomous Bug Fixing

When given a build error, type error, or broken story:
- Read the error, trace it to the source, fix it without asking for hand-holding
- Run `npx tsc --noEmit` to confirm the fix
- If Storybook fails to start, check `.storybook/main.ts` and `vite.config.ts` first
- Reference the exact file and line number in your response

### 6. Task Tracking for Multi-Step Work

For tasks spanning more than one file or component:
1. Write a brief plan: what changes, which files, in what order
2. Confirm the plan before implementing
3. Mark steps complete as you go
4. End with a summary of *what is now different*, not a list of what you did
5. After any correction: update the memory system with the lesson (`feedback_*.md`)

---

## Font Loading

Google Fonts (Inter + Montserrat) are loaded via `.storybook/preview-head.html`.
- Inter weight 500 → all `--text-body-*` tokens
- Montserrat weights 600, 700 → all `--text-heading-*` and `--text-subtitle-*` tokens

Do NOT add `@import` for Google Fonts inside any CSS file — `preview-head.html` is the single source of truth.

---

## Project Overview

This is the Storybook instance for the Moji design system. It is **fully self-contained** — all component source, CSS, and design tokens live inside this repo under `src/`. Do NOT reference any external sibling repo (e.g. `jimo-component-library`).

```
src/
├── styles/          ← tokens.css, global.css (source of truth for all tokens)
└── components/ui/   ← all 13 components

stories/
├── 0-foundations/   ← token documentation (Colors, Typography, Spacing, Radius, Shadows, Icons)
├── 1-atoms/         ← Button, Checkbox, Toggle, Radio, Icon, Tooltip
├── 2-molecules/     ← Input, Chip, DropdownSelector, DropdownMenuList, Toast, Infobox, NavItems, HorizontalMenuItems
└── 3-organisms/     ← DropdownMenuGroup, Composed, NavGroups, NavSidebars, HorizontalMenuGroups, PageHeader
```

**Commands:**
```bash
npm run storybook        # start dev server at :6006
npm run build-storybook  # static build into storybook-static/
npx tsc --noEmit         # type-check all story files — run before committing
```

**Deploying changes — always run in this order:**
```bash
gh auth setup-git && git push origin main
npx chromatic --project-token=chpt_b32490bc392df97
```

`gh auth setup-git` is required before pushing — bare `git push` fails on this private repo.
Run Chromatic after every push so visual snapshots are captured and baselines are updated.

---

## The ONE Rule — Tokens Only

**NEVER hardcode a hex value, pixel value, or rgba value in a story file.**
Always reference a CSS custom property from `src/styles/tokens.css`.

```tsx
// ✅ correct
style={{ color: 'var(--color-text-primary)' }}
style={{ gap: 'var(--space-3)' }}
style={{ font: 'var(--text-body-3)' }}
style={{ borderRadius: 'var(--radius-md)' }}
style={{ boxShadow: 'var(--shadow-sm)' }}

// ❌ wrong — never do this
style={{ color: '#071331' }}
style={{ gap: 12 }}
style={{ fontSize: 14 }}
style={{ borderRadius: 8 }}
style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
```

React inline styles: numbers are treated as pixels. Always pass spacing as `'var(--space-N)'` strings.

**Token reference:** Read `src/styles/tokens.css` directly for the complete list of color, spacing, typography, radius, shadow, and transition tokens.

---

## Story File Template (CSF3 + TypeScript)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../../../src/components/ui/MyComponent/MyComponent';
import '../../../src/components/ui/MyComponent/MyComponent.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=XXXX-XXXX';

const meta: Meta<typeof MyComponent> = {
  title: 'Atoms/MyComponent',   // or Molecules/ or Foundations/
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    myProp: { control: 'select', options: ['a', 'b', 'c'] },
    onSomeHandler: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};
export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = { args: { /* minimal required props */ } };

// Playground MUST be last and MUST have chromatic disabled
export const Playground: Story = {
  args: { /* all props */ },
  parameters: { chromatic: { disableSnapshot: true } },
};
```

---

## Story Naming Rules (FR-5, FR-6)

| Level | `title` pattern | Example |
|-------|----------------|---------|
| Foundation | `Foundations/TokenGroup` | `Foundations/Colors` |
| Atom | `Atoms/ComponentName` | `Atoms/Button` |
| Molecule | `Molecules/ComponentName` | `Molecules/Input` |
| Molecule nav item | `Molecules/Nav/ComponentName` | `Molecules/Nav/PrimaryNavItem` |
| Molecule menu item | `Molecules/HorizontalMenu/ComponentName` | `Molecules/HorizontalMenu/PrimaryItem` |
| Organism | `Organisms/ComponentName` | `Organisms/PageHeader` |
| Organism nav | `Organisms/Nav/ComponentName` | `Organisms/Nav/PrimaryNavGroup` |
| Organism dropdown | `Organisms/Dropdown/ComponentName` | `Organisms/Dropdown/DropdownMenuGroup` |
| Organism menu group | `Organisms/HorizontalMenu/ComponentName` | `Organisms/HorizontalMenu/PrimaryGroup` |

Story export names: **PascalCase** state names only. No `Story1`, `Story2`.

---

## argType Remapping (FR-3)

| Component | Prop in code | Control label | Pattern |
|-----------|-------------|---------------|---------|
| Button | `level` | `variant` | `name: 'variant'` in argTypes |
| Input | `inputType` | `type` | `name: 'type'` in argTypes |
| Input | `status` | `state` | `name: 'state'` in argTypes |
| Input | `type` (HTML type) | `htmlType` | `name: 'htmlType'` in argTypes |

**Input has two type-related props** — both must be exposed:
- `inputType` → `'type'` control (variant: text / textarea / dropdown / dropdown-search)
- `type` → `'htmlType'` control (HTML input type: text / number / email / tel / url / password / search)

Always set `type="number"` for numeric fields (duration, count, days, etc.). All other props keep their original name.

---

## Import Paths

All story files sit 3 levels deep (`stories/{level}/{Component}/`), so the prefix is always `../../../src/`:

```tsx
import { Button } from '../../../src/components/ui/Button/Button';
import '../../../src/components/ui/Button/Button.css';

// Icons — always iconsax-react (993 named exports, v0.0.8)
import { Add, Trash } from 'iconsax-react';                                          // named imports
import * as IcnsaxReact from 'iconsax-react';                                        // gallery stories
import { CloseIcon, SpinnerIcon, Icon } from '../../../src/components/ui/Icon/Icon'; // Moji icons
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';                         // icon control utility
```

- Do NOT use `@lib/` alias — use relative paths as shown above
- Do NOT reference `jimo-component-library` — legacy, must not be used
- Do NOT re-import `tokens.css` — already loaded globally via `.storybook/preview.ts`

---

## Molecules Must Use Atoms Internally

| Molecule | Part | Atom to use |
|----------|------|-------------|
| Toast | CTA action buttons | `<Button level="secondary/primary" size="small" />` |
| Chip | Remove × button icon | `<CloseCircle size={16} variant="Bold" color="currentColor" />` from `iconsax-react` |
| PrimaryNavItem (collapsed) | Label tooltip | `<Tooltip arrowPosition="left">` |
| TertiaryNavItem | Label tooltip | `<Tooltip arrowPosition="bottom">` |

If you see a raw `<button>` or custom SVG inside a molecule where an atom exists, replace it with the atom.

**Tooltip rule for nav components:** Never implement tooltips with CSS `border` triangle tricks. Always use the `<Tooltip>` component from `src/components/ui/Tooltip/Tooltip`. Import its CSS too. Wrap it in a positioned `<span>` that handles the placement and `opacity` fade — the `<Tooltip>` component itself only renders the bubble + SVG arrow.

---

## iconsax Icon Color — Always `currentColor`

When an iconsax icon sits inside a CSS class that sets `color:` via a token, always pass `color="currentColor"` — never hardcode a hex value.

```tsx
// ✅ correct — CSS token controls the color
<InfoCircle size={24} variant="Bold" color="currentColor" />
// ❌ wrong — hardcodes hex, ignores CSS token
<InfoCircle size={24} variant="Bold" color="#1260EB" />
```

---

## Interactive Stories for Show/Hide Components

Components with show/hide lifecycle (Toast, Tooltip) must use **wrapper components with a visible trigger** — never pre-render them in a static state. Chromatic must be disabled on these stories.

- **Toast** → `ToastDemo` wrapper with a `<Button>` trigger. Clicking it mounts `<Toast>`. `onDismiss` unmounts it.
- **Tooltip** → `HoverWrapper` with `onMouseEnter`/`onMouseLeave`. Always keep the wrapper in DOM (never `{visible && <Tooltip>}`); toggle `opacity` + `scale` for animation.

```tsx
// Toast pattern
function ToastDemo(props) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button level="secondary" size="small" onClick={() => setVisible(true)}>Show Toast</Button>
      <ToastContainer>
        {visible && <Toast {...props} onDismiss={() => setVisible(false)} />}
      </ToastContainer>
    </>
  );
}

// Tooltip — always rendered, opacity/scale toggled on hover
<div style={{ opacity: visible ? 1 : 0, transform: `scale(${visible ? 1 : 0.85})`, transformOrigin: origin, transition: 'var(--transition-base)' }}>
  <Tooltip arrowPosition={arrowPosition}>{children}</Tooltip>
</div>
```

---

## Tooltip — arrowPosition Semantics

`arrowPosition` names **where the arrow sits on the bubble**, not where the tooltip floats:

| arrowPosition | Arrow location | Tooltip floats |
|--------------|----------------|----------------|
| `up` / `up-left` / `up-right` | Top of bubble, points up | **Below** the trigger |
| `bottom` / `bottom-left` / `bottom-right` | Bottom of bubble, points down | **Above** the trigger |
| `left` | Left of bubble, points left | **Right** of the trigger |
| `right` | Right of bubble, points right | **Left** of the trigger |

`getFloatStyle()` implements positioning; `getTransformOrigin()` returns `transform-origin` for scale animations — origin is always the arrow side (toward the trigger).

---

## Icon Controls — Full Set Required

**Any story exposing an icon prop as a control MUST use the complete 993-icon set.**

```tsx
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

// argTypes
leftIconName: { name: 'leftIcon', control: 'select', options: ICON_OPTIONS },

// meta-level render — resolve string → React element for all stories
render: ({ leftIconName, rightIconName, ...args }) => (
  <Button {...args} leftIcon={getIcon(leftIconName)} rightIcon={getIcon(rightIconName)} />
),
```

- Never build a hand-picked `ICON_MAP` subset — always pull from `ALL_ICON_NAMES`
- Set icon args via `*IconName` string (e.g. `leftIconName: 'Add'`), not hardcoded elements in args
- Put the `render` at meta level so all stories inherit icon controls automatically

---

## Chromatic Rules (FR-2)

- `Playground` stories **always** have `parameters: { chromatic: { disableSnapshot: true } }`
- Hover/focus interaction stories that can't be reliably captured also get `disableSnapshot: true`
- Every other story is snapshotted at 1280px viewport
- Never disable snapshots on `Default` or state variant stories

---

## Definition of Done (FR-9)

A component story is **complete** when:
1. `Default` story exists
2. All meaningful state stories exist (see PRD §5.4–5.5 for exact list per component)
3. `Playground` story exists with `chromatic: { disableSnapshot: true }`
4. `parameters.design.url` Figma link is set on every story
5. `npx tsc --noEmit` passes with zero errors
6. Chromatic baseline approved

---

## Component Scope

| Level | Components |
|-------|-----------|
| Foundations | Colors, Typography, Spacing, Radius, Shadows, Icons |
| Atoms | Button, Checkbox, Toggle, Radio, Icon, Tooltip |
| Molecules | Input, Chip, DropdownSelector, DropdownMenuList, Toast, Infobox |
| Molecules/Nav/ | PrimaryNavItem, SecondaryNavItem, TertiaryNavItem |
| Molecules/HorizontalMenu/ | PrimaryHorizontalMenuItem, SecondaryHorizontalMenuItem |
| Organisms | PageHeader |
| Organisms/Nav/ | PrimaryNavGroup, SecondaryNavGroup, TertiaryNavGroup, PrimaryNavSidebar, SecondaryNavSidebar |
| Organisms/Dropdown/ | DropdownMenuGroup, Composed |
| Organisms/HorizontalMenu/ | PrimaryHorizontalMenuGroup, SecondaryHorizontalMenuGroup |

For component API (props, variants): read `src/components/ui/{ComponentName}/{ComponentName}.tsx` directly.
For Figma node IDs: `https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji`

---

## Nav Component Patterns

### Tooltip implementation in nav items

**NEVER build custom CSS tooltips (border triangle hack).** Always use `<Tooltip>` from `src/components/ui/Tooltip/Tooltip`.

```tsx
// ✅ Correct — uses Tooltip component
import { Tooltip } from '../Tooltip/Tooltip';
import '../Tooltip/Tooltip.css';

// PrimaryNavItem collapsed tooltip (floats RIGHT, arrow on LEFT)
{type === 'collapsed' && label && (
  <span className="nav-item-primary__tooltip-wrap">
    <Tooltip arrowPosition="left">{label}</Tooltip>
  </span>
)}

// TertiaryNavItem tooltip (floats ABOVE, arrow at BOTTOM)
{label && (
  <span className="nav-item-tertiary__tooltip-wrap">
    <Tooltip arrowPosition="bottom">{label}</Tooltip>
  </span>
)}
```

The wrapper span handles `position: absolute`, placement, and `opacity` fade. The `<Tooltip>` handles the bubble + SVG arrow shape.

### Hover states

Add CSS `:hover` on the `--idle` state class so the playground reflects hover without needing the `state='hover'` prop:

```css
.nav-item-primary--idle:hover { background: var(--color-bg-muted); color: var(--color-text-primary); }
.nav-item-secondary--idle:hover { background: var(--color-bg-muted); }
```

### href prop — polymorphic rendering

All nav item components accept `href?: string`. When provided, render as `<a href={href}>` for real navigation in external projects. Without it, render as `<div role="button">`. Pattern:

```tsx
if (href) {
  return <a className={classes} href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{content}</a>;
}
return <div className={classes} role="button" tabIndex={0} {...rest}>{content}</div>;
```

### Overflow in collapsed sidebar

**CSS rule:** `overflow-y: auto` on a scroll container clips ALL positioned descendants (including tooltips) on the x-axis — even if `overflow-x: visible` is set. The spec silently converts it to `auto`.

**Fix:** Only apply `overflow-y: auto` when tooltips will never appear. For the collapsed primary sidebar, the body must have `overflow: visible`. Restrict scroll to the expanded variant only:

```css
.nav-sidebar-primary__body { overflow: visible; }
.nav-sidebar-primary--expanded .nav-sidebar-primary__body { overflow-y: auto; }
```

### Interactive sidebars

Sidebars expose `onItemClick?: (label: string) => void`. Use `useState` in Playground story render functions:

```tsx
export const Playground: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState('Tours');
    return <PrimaryNavSidebar {...args} activeItem={activeItem} onItemClick={setActiveItem} />;
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
```

### Separator rules

- **Primary sidebar:** separators are full-width (`width: 100%`, no horizontal padding). Groups handle their own `padding: 0 var(--space-1)` internally via `PrimaryNavGroup`.
- **Secondary sidebar:** sidebar has `padding: var(--space-3) var(--space-2)`, so dividers are naturally contained within the sidebar bounds.

---

## Figma Node Type Rule (for /jimo-add-component)

**When a Figma node returned by `get_design_context` is NOT a "component" node** (i.e. it's a frame, group, or instance), do NOT generate a brand-new component from scratch. Instead:

1. Check `src/components/ui/` for an existing component that matches the design
2. Use that existing component — adapt its props and CSS if needed
3. Only generate a new component if no match exists in `src/components/ui/` AND the user explicitly instructs it

This prevents duplicate implementations of the same UI pattern.
