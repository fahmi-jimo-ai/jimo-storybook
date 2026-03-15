# Moji Storybook — Claude Code Reference

> **READ THIS BEFORE WRITING ANY STORY FILE.**
> Every story must consume tokens from `tokens.css`. No hardcoded values. No exceptions.

---

## Font Loading

Google Fonts (Inter + Montserrat) are loaded via `.storybook/preview-head.html`.
- Inter weight 500 → all `--text-body-*` tokens
- Montserrat weights 600, 700 → all `--text-heading-*` and `--text-subtitle-*` tokens

Do NOT add `@import` for Google Fonts inside any CSS file — the `preview-head.html` is the single source of truth for font loading in Storybook.

---

## Project Overview

This is the Storybook instance for the Moji design system. It mirrors the component library at `../jimo-component-library/` and documents every component at Foundations, Atoms, and Molecules levels.

```
stories/
├── 0-foundations/   ← token documentation (Colors, Typography, Spacing, Radius, Shadows, Icons)
├── 1-atoms/         ← Button, Checkbox, Toggle, Radio, Icon, Tooltip
└── 2-molecules/     ← Input, Chip, Dropdown(3), Toast, Infobox
```

**Commands:**
```bash
npm run storybook        # start dev server at :6006
npm run build-storybook  # static build into storybook-static/
npx tsc --noEmit         # type-check all story files — run before committing
```

---

## The ONE Rule — Tokens Only

**NEVER hardcode a hex value, pixel value, or rgba value in a story file.**
Always reference a CSS custom property from `../jimo-component-library/src/styles/tokens.css`.

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

---

## Design Token Quick Reference

Source: `../jimo-component-library/src/styles/tokens.css` — imported globally via `.storybook/preview.ts`.

### Typography (composite — use font shorthand)
```css
var(--text-heading-1)   /* Montserrat 700, 48px, line-height 1.2 */
var(--text-heading-2)   /* Montserrat 700, 40px */
var(--text-heading-3)   /* Montserrat 700, 32px */
var(--text-heading-4)   /* Montserrat 700, 24px */
var(--text-heading-5)   /* Montserrat 700, 20px */
var(--text-subtitle-1)  /* Montserrat 600, 24px, line-height 1.25 */
var(--text-subtitle-2)  /* Montserrat 600, 20px */
var(--text-subtitle-3)  /* Montserrat 600, 16px */
var(--text-subtitle-4)  /* Montserrat 600, 14px */
var(--text-body-1)      /* Inter 500, 20px, line-height 1.5 */
var(--text-body-2)      /* Inter 500, 16px */
var(--text-body-3)      /* Inter 500, 14px */
var(--text-body-4)      /* Inter 500, 12px */
var(--text-heading-tracking) /* -0.5px — always add to heading elements */
```

### Colors — Semantic (always prefer semantic over primitive)
```css
var(--color-text-primary)     /* neutral-800 #071331 */
var(--color-text-secondary)   /* neutral-700 */
var(--color-text-tertiary)    /* neutral-500 */
var(--color-text-disabled)    /* neutral-400 */
var(--color-text-inverse)     /* white */
var(--color-bg-default)       /* white */
var(--color-bg-subtle)        /* neutral-50 */
var(--color-bg-muted)         /* neutral-100 */
var(--color-bg-emphasis)      /* neutral-200 */
var(--color-border-default)   /* neutral-300 */
var(--color-border-strong)    /* neutral-400 */
var(--color-border-focus)     /* blue-400 */
var(--color-brand-default)    /* blue-400 #1260eb */
var(--color-brand-hover)      /* blue-500 */
var(--color-brand-subtle)     /* blue-100 */
var(--color-success-default)  /* green-400 */
var(--color-success-subtle)   /* green-100 */
var(--color-warning-default)  /* orange-500 */
var(--color-warning-subtle)   /* orange-100 */
var(--color-danger-default)   /* red-400 */
var(--color-danger-subtle)    /* red-100 */
```

### Colors — Primitive (use when semantic alias doesn't exist)
```css
var(--color-neutral-white)   var(--color-neutral-50..800)
var(--color-blue-50..500)    var(--color-green-100..500)
var(--color-orange-100..500) var(--color-red-100..500)
var(--color-purple-100..500) var(--color-yellow-100..500)
```

### Spacing (4px grid)
```css
var(--space-1)   /*  4px */ var(--space-2)  /*  8px */
var(--space-3)   /* 12px */ var(--space-4)  /* 16px */
var(--space-5)   /* 20px */ var(--space-6)  /* 24px */
var(--space-7)   /* 28px */ var(--space-8)  /* 32px */
var(--space-9)   /* 36px */ var(--space-10) /* 40px */
var(--space-11)  /* 44px */ var(--space-12) /* 48px */
```

### Border Radius
```css
var(--radius-sm)    /*  4px — Checkbox, small elements */
var(--radius-md)    /*  8px — Input, DropdownSelector */
var(--radius-lg)    /* 12px — Button, modals */
var(--radius-xl)    /* 16px — large cards */
var(--radius-xxl)   /* 20px — extra-large surfaces */
var(--radius-full)  /* 9999px — Chip, Toggle, Tooltip */
```

### Shadows
```css
var(--shadow-sm)  /* buttons, inputs */
var(--shadow-md)  /* dropdown panels, cards */
var(--shadow-lg)  /* modals, sheets */
var(--shadow-xl)  /* popovers, floating panels */
```

### Transitions
```css
var(--transition-fast)  /* 120ms ease */
var(--transition-base)  /* 200ms ease */
var(--transition-slow)  /* 300ms ease */
```

---

## Story File Template (CSF3 + TypeScript)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../../../jimo-component-library/src/components/ui/MyComponent/MyComponent';
import '../../../jimo-component-library/src/components/ui/MyComponent/MyComponent.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=XXXX-XXXX';

const meta: Meta<typeof MyComponent> = {
  title: 'Atoms/MyComponent',   // or Molecules/ or Foundations/
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    // remap non-standard prop names per FR-3:
    // level → 'variant', inputType → 'type', status → 'state'
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
| Dropdown sub | `Molecules/Dropdown/ComponentName` | `Molecules/Dropdown/DropdownSelector` |
| Dropdown composed | `Molecules/Dropdown/Composed` | `Molecules/Dropdown/Composed` |

Story export names: **PascalCase** state names only. No `Story1`, `Story2`.
```tsx
export const Default: Story = { ... }       // ✅
export const SemanticTypes: Story = { ... } // ✅
export const story1: Story = { ... }        // ❌
```

---

## argType Remapping (FR-3)

These three props are remapped so control labels follow Storybook conventions:

| Component | Prop in code | Control label | Pattern |
|-----------|-------------|---------------|---------|
| Button | `level` | `variant` | `name: 'variant'` in argTypes |
| Input | `inputType` | `type` | `name: 'type'` in argTypes |
| Input | `status` | `state` | `name: 'state'` in argTypes |

All other props keep their original name as the control label.

---

## Import Paths

Components come from the sibling `jimo-component-library`:
```tsx
// Components
import { Button } from '../../../jimo-component-library/src/components/ui/Button/Button';
import '../../../jimo-component-library/src/components/ui/Button/Button.css';

// Tokens are already globally available via .storybook/preview.ts
// Do NOT re-import tokens.css in individual story files

// Icons — always iconsax-react (993 named exports, v0.0.8)
// For story files that only need a few icons: named imports
import { Add, Trash } from 'iconsax-react';
// For gallery/documentation stories that need all icons: wildcard import
import * as IcnsaxReact from 'iconsax-react';
// Custom Moji icons
import { CloseIcon, SpinnerIcon, Icon } from '../../../jimo-component-library/src/components/ui/Icon/Icon';
// Shared icon utility (ALL_ICON_NAMES + getIcon) — use for any component with an icon control
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';
```

Do NOT use `@lib/` alias in story files — use relative paths as shown above.

---

## Icon Controls — Full Set Required

**Any component story that exposes an icon prop as a Storybook control MUST use the complete 993-icon set, not a curated subset.**

Use the shared utility at `stories/utils/icons.ts`:

```tsx
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

// Build the options list
const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

// In argTypes — name the control after the prop it maps to
leftIconName: {
  name: 'leftIcon',
  control: 'select',
  options: ICON_OPTIONS,
  ...
},

// In the meta render — resolve string → React element
render: ({ leftIconName, rightIconName, ...args }) => (
  <Button
    {...args}
    leftIcon={resolveIcon(leftIconName)}
    rightIcon={resolveIcon(rightIconName)}
  />
),
```

Rules:
- **Never** build a hand-picked `ICON_MAP` with a subset of icons for a control — always pull from `ALL_ICON_NAMES`.
- When a story has an `iconOnly` or similar mode, set the icon via the `*IconName` arg (e.g. `leftIconName: 'Add'`) so it is live in controls, not via a hardcoded `leftIcon: <Add />` in args.
- The meta-level `render` function is the right place for the name→element mapping so all stories in the file (Default, state variants, Playground) inherit working icon controls automatically.

---

## Chromatic Rules (FR-2, Appendix C)

- `Playground` stories **always** have `parameters: { chromatic: { disableSnapshot: true } }`
- Hover/focus interaction stories that can't be reliably captured also get `disableSnapshot: true`
- Every other story is snapshotted at 1280px viewport
- Never disable snapshots on Default or state variant stories

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

## Component Scope (Frozen)

This Storybook covers exactly these 13 components. No new components are added here:

| Level | Components |
|-------|-----------|
| Foundations | Colors, Typography, Spacing, Radius, Shadows, Icons |
| Atoms | Button, Checkbox, Toggle, Radio, Icon, Tooltip |
| Molecules | Input, Chip, DropdownSelector, DropdownMenuList, DropdownMenuGroup, Toast, Infobox |

For component API reference (props, when to use, variants), see:
`../jimo-component-library/COMPONENTS.md`

For Figma node IDs per component:
`../jimo-component-library/COMPONENTS.md` → Quick Reference table

Figma file: `https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji`
