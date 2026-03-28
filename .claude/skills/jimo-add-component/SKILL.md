---
name: jimo-add-component
description: >
  Adds a new component to the Moji jimo-storybook design system library with full
  convention compliance. Use this skill whenever Fahmi wants to add, create, or
  implement a component in the storybook. Trigger on phrases like "add component",
  "new component", "create component story", "implement component", "add X to storybook",
  or when a component directory path or Figma URL is provided alongside intent to build
  a component. Always use this skill — it enforces CLAUDE.md rules that are easy to
  violate without it (wrong token usage, missing Playground chromatic flag, wrong
  import paths, etc).
---

# Adding a Component to Moji Storybook

The jimo-storybook repo is the current working directory.
All rules in this skill are derived from `CLAUDE.md` in the repo root — the single source of truth.

---

## CRITICAL: This repo is plain JavaScript — NO TypeScript

All files use JavaScript. **Never create `.ts` or `.tsx` files.**

| File type | Extension |
|-----------|-----------|
| Component source (with JSX) | `.jsx` |
| Story files | `.stories.jsx` |
| Index/barrel files | `.js` |
| Utility files | `.js` |

**Never write any TypeScript syntax:**
- No `interface`, no `type Foo =`, no `: string` annotations
- No `<T>` generic parameters
- No `as SomeType` casts
- No `import type { ... }`
- No `export type { ... }`
- No `React.forwardRef<El, Props>(...)` — just `React.forwardRef(...)`
- No `React.useRef<HTMLInputElement>(null)` — just `React.useRef(null)`

---

## Step 0 — Understand the input

Before doing anything, identify:

1. **Component name** (e.g. `Badge`, `Avatar`, `ProgressBar`)
2. **Atomic design level** — classify using the decision tree below, then map to the correct folder and title prefix
3. **Source mode** — which combination did the user provide?
   - **Directory path**: source JSX + CSS already exists in `src/components/ui/{Name}/`
   - **Figma URL**: design needs to be implemented from scratch; use Figma MCP to get specs
   - **Both**: use the directory for source, Figma URL for the design link on stories

Clarify anything ambiguous before writing code.

---

### Atomic Design Level Decision Tree

Work through these questions in order — stop at the first match:

**→ Is it a single-purpose building block with no dependencies on other Moji UI components?**
→ **ATOM** — basic element that stands alone (button, checkbox, icon, tooltip)

**→ Does it combine a small set of atoms or raw HTML elements into one focused unit? It is still a single item (not a collection).**
→ **MOLECULE** — individual items: a single nav item, a single tab item, a single form field, a single notification card
- Examples: `PrimaryNavItem`, `PrimaryHorizontalMenuItem`, `Input`, `Chip`, `Toast`, `Infobox`, `DropdownSelector`, `DropdownMenuList`

**→ Does it group/contain multiple molecule-level components, OR does it represent a complete section of the UI (sidebar, header, composed dropdown)?**
→ **ORGANISM** — groups, containers, sidebars, composed sections
- Examples: `PrimaryNavGroup` (groups nav items), `PrimaryNavSidebar` (full sidebar), `PrimaryHorizontalMenuGroup` (tab bar), `DropdownMenuGroup` (menu container), `PageHeader` (full header section)

**Quick rule:** If the component renders a list/collection of another component, or assembles multiple different molecule-level parts into a named section, it's an organism.

---

### Level → folder and title mapping

| Level | Story folder | `title` prefix | Example title |
|-------|-------------|----------------|---------------|
| Atom | `stories/1-atoms/{Name}/` | `Atoms/` | `Atoms/Button` |
| Molecule | `stories/2-molecules/{Name}/` | `Molecules/` | `Molecules/Input` |
| Molecule — Nav item | `stories/2-molecules/Nav/` | `Molecules/Nav/` | `Molecules/Nav/PrimaryNavItem` |
| Molecule — Horizontal menu item | `stories/2-molecules/HorizontalMenu/` | `Molecules/HorizontalMenu/` | `Molecules/HorizontalMenu/PrimaryItem` |
| Organism | `stories/3-organisms/{Name}/` | `Organisms/` | `Organisms/PageHeader` |
| Organism — Nav group/sidebar | `stories/3-organisms/Nav/` | `Organisms/Nav/` | `Organisms/Nav/PrimaryNavGroup` |
| Organism — Dropdown group | `stories/3-organisms/Dropdown/` | `Organisms/Dropdown/` | `Organisms/Dropdown/DropdownMenuGroup` |
| Organism — Horizontal menu group | `stories/3-organisms/HorizontalMenu/` | `Organisms/HorizontalMenu/` | `Organisms/HorizontalMenu/PrimaryGroup` |

---

## Step 1 — Gather component spec

### If a Figma URL was provided
Call the Figma MCP tool to fetch the design:

```
mcp__claude_ai_Figma__get_design_context(fileKey, nodeId)
```

Extract from the URL:
- `fileKey` = the segment after `/design/` (e.g. `66ejN3hqSMkUXIPgmkebFH`)
- `nodeId` = `?node-id=XXXX-XXXX` (convert `-` to `:`, e.g. `2906:5218`)

From the design context, identify:
- All visual variants / states (these become story exports)
- Props the component needs
- Color tokens, spacing tokens, radius tokens to apply (always map to tokens — never use raw values)
- Whether the component is interactive (hover, focus, disabled states)

### If a directory path was provided
Read the existing source:
```
src/components/ui/{Name}/{Name}.jsx
src/components/ui/{Name}/{Name}.css
```

Study the props (from the function signature and destructuring) and CSS class naming to understand what stories to write.

---

## Step 2 — Create the component source (only if needed)

Skip this step if source files already exist in `src/components/ui/{Name}/`.

### JSX pattern — `{Name}.jsx`

```jsx
import React from 'react';
import './{Name}.css';

export const {Name} = React.forwardRef(
  ({ variant = 'primary', className, children, ...rest }, ref) => {
    const classes = [
      '{prefix}',
      `{prefix}--${variant}`,
      className ?? '',
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

{Name}.displayName = '{Name}';
```

No interfaces, no type exports, no annotations. Adapt the base HTML element to what makes semantic sense (button, div, span, etc.).

### Index barrel — `index.js`

```js
export * from './{Name}';
```

### CSS pattern — `{Name}.css`

Every CSS value MUST come from a token. The only exception is `1px` for borders (no token for that).

```css
/* ============================================================
   {Name} — Moji Design System
   Figma: node {node-id}
   ============================================================ */

.{prefix} {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-md);         /* ✅ token */
  padding: var(--space-2) var(--space-4);  /* ✅ token */
  font: var(--text-body-3);                /* ✅ composite token */
  color: var(--color-text-primary);        /* ✅ semantic color */
  background-color: var(--color-bg-subtle); /* ✅ semantic color */
  transition: background-color var(--transition-fast);
}

/* ❌ NEVER:
  border-radius: 8px;
  color: #071331;
  padding: 12px 16px;
  font-size: 14px;
*/
```

BEM naming: block is a short kebab prefix for the component (e.g. `badge`, `avatar`, `progress`).

---

## Step 3 — Create the story file

Create at `stories/{level}/{Name}/{Name}.stories.jsx`.

### Critical import rules

```jsx
import React from 'react';
import { {Name} } from '../../../src/components/ui/{Name}/{Name}';
import '../../../src/components/ui/{Name}/{Name}.css';
// ✅ Do NOT re-import tokens.css — it's already globally loaded via .storybook/preview.js
// ✅ Import from '@storybook/react-vite', NOT '@storybook/react' — but no type imports needed in JS
```

### Full story template — plain JavaScript

```jsx
import React from 'react';
import { {Name} } from '../../../src/components/ui/{Name}/{Name}';
import '../../../src/components/ui/{Name}/{Name}.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=XXXX-XXXX';

const meta = {
  title: 'Atoms/{Name}',    // or Molecules/{Name} or Organisms/{Name} — see Step 0 level table
  component: {Name},
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    // ... all controllable props
    onSomeHandler: { control: false },   // hide function props
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

// Default — minimal required props
export const Default = {
  args: { /* minimal props */ },
};

// State stories — PascalCase, named after what they demonstrate
export const SomeMeaningfulState = {
  args: { /* ... */ },
};

// Multi-variant showcase: use render() to show all variants in one frame
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <{Name} variant="primary">Primary</{Name}>
      <{Name} variant="secondary">Secondary</{Name}>
    </div>
  ),
};

// Playground — MUST be last, MUST disable Chromatic
export const Playground = {
  args: { /* all props with sensible defaults */ },
  parameters: { chromatic: { disableSnapshot: true } },
};
```

Key JS differences from TypeScript:
- No `import type { Meta, StoryObj }` — not needed
- `const meta = {` — not `const meta: Meta<typeof {Name}> = {`
- No `type Story = StoryObj<...>` line
- `export const Default = {` — not `export const Default: Story = {`

### When the component has icon props

```jsx
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];  // ← full 993-icon set, never a subset

function resolveIcon(name) {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={20} /> : undefined;
}

// In argTypes:
leftIconName: {
  name: 'leftIcon',
  control: 'select',
  options: ICON_OPTIONS,
  description: 'Icon on the left',
  table: { defaultValue: { summary: 'none' }, category: 'Icons' },
},

// Hide the real prop from controls (the *Name proxy drives it):
leftIcon: { control: false },

// Meta render resolves names → elements for all stories automatically:
render: ({ leftIconName, ...args }) => (
  <{Name} {...args} leftIcon={resolveIcon(leftIconName)} />
),
```

### FR-3 argType remapping

Only these specific prop names get remapped (don't rename other props):

| Component | Prop in code | Control label |
|-----------|-------------|---------------|
| Button | `level` | `variant` |
| Input | `inputType` | `type` |
| Input | `status` | `state` |
| Input | `type` (HTML) | `htmlType` |

For all other components, keep prop names as-is.

### Interactive components (show/hide lifecycle)

Components with animation or visibility toggling (like Toast, Tooltip) need wrapper components:

```jsx
// Toast pattern
function ToastDemo(props) {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button level="secondary" size="small" onClick={() => setVisible(true)}>Show Toast</Button>
      {visible && <Toast {...props} onDismiss={() => setVisible(false)} />}
    </>
  );
}

// Tooltip: always keep in DOM, toggle opacity + scale
<div style={{
  opacity: visible ? 1 : 0,
  transform: `scale(${visible ? 1 : 0.95})`,
  transition: 'opacity var(--transition-fast), transform var(--transition-fast)',
}}>
  <Tooltip>{content}</Tooltip>
</div>
```

Add `parameters: { chromatic: { disableSnapshot: true } }` to all interactive stories.

### Token rules for inline styles

React treats numbers as pixels — always pass spacing as strings:

```jsx
// ✅ correct
style={{ gap: 'var(--space-3)' }}
style={{ color: 'var(--color-text-primary)' }}
style={{ font: 'var(--text-body-3)' }}

// ❌ wrong
style={{ gap: 12 }}
style={{ color: '#071331' }}
style={{ fontSize: 14 }}
```

---

## Step 4 — Molecules and Organisms: compose from existing Moji components

If the new component is a Molecule or Organism that contains UI that maps to an existing Moji atom or molecule, use it — never roll a bespoke implementation:

| Molecule need | Use atom |
|---------------|----------|
| Action buttons | `<Button level="secondary/primary" size="small" />` |
| Close/remove button | `<CloseCircle size={16} variant="Bold" color="currentColor" />` from iconsax-react |
| Checkbox-like input | `<Checkbox />` |

Import atoms from `../../../src/components/ui/{AtomName}/{AtomName}` with the CSS file.

When using iconsax icons inside a component where CSS sets `color:` via a token class, always pass `color="currentColor"` so the CSS token drives the color. Never hardcode a hex in the `color` prop.

---

## Step 5 — Definition of Done checklist

Before declaring done, verify every item:

- [ ] `Default` story exists
- [ ] All meaningful state stories exist (one story per meaningful state/variant grouping)
- [ ] `Playground` story exists at the bottom with `parameters: { chromatic: { disableSnapshot: true } }`
- [ ] `parameters.design.url` Figma link is set on the meta (applies to all stories)
- [ ] No hardcoded hex/px/rgba values anywhere — all values use `var(--token-name)`
- [ ] Story import path uses `../../../src/components/ui/...` (relative, not aliased)
- [ ] Icon controls use `ALL_ICON_NAMES` (not a hand-picked subset)
- [ ] Build passes: run `npm run build-storybook` from the repo root — fix any errors before finishing
- [ ] No TypeScript syntax anywhere — no interfaces, no type annotations, no generics

---

## Common mistakes to avoid

| Mistake | Fix |
|---------|-----|
| Creating a `.tsx` or `.ts` file | Use `.jsx` for JSX files, `.js` for plain JS |
| `import type { Meta, StoryObj }` | Remove entirely — not needed in JS |
| `const meta: Meta<typeof Foo> = {` | `const meta = {` |
| `type Story = StoryObj<...>` | Remove this line entirely |
| `export const Default: Story = {` | `export const Default = {` |
| `React.forwardRef<El, Props>(...)` | `React.forwardRef(...)` |
| `React.useRef<HTMLInputElement>(null)` | `React.useRef(null)` |
| `import { Meta } from '@storybook/react'` | No import needed — or use `@storybook/react-vite` without `type` |
| `style={{ gap: 12 }}` | `style={{ gap: 'var(--space-3)' }}` |
| `import '../../src/styles/tokens.css'` in story | Remove — tokens are globally loaded |
| Icon `color="#1260EB"` | `color="currentColor"` |
| `export const story1 = ...` | PascalCase: `export const Default = ...` |
| Icon options: `['Add', 'Trash', 'Edit']` | Use full: `['none', ...ALL_ICON_NAMES]` |
| Playground missing chromatic flag | Add `parameters: { chromatic: { disableSnapshot: true } }` |
| CSS `border-radius: 8px` | `border-radius: var(--radius-md)` |
| `npx tsc --noEmit` to verify | Use `npm run build-storybook` instead |
