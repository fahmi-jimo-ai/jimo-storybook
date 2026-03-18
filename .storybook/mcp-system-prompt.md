# Moji Design System — Agent Context

You are working with the **Moji design system** served by a Storybook MCP at `http://localhost:6006/mcp`.

## What this MCP gives you

- `get-storybook-story-instructions` — Storybook 10 story writing conventions
- `list-all-documentation` — every Moji component ID
- `get-documentation <id>` — full prop types, defaults, and story code snippets for any component
- `preview-stories` — live rendered URLs for any story

**Always call `list-all-documentation` first** to discover available components before writing any UI. Then call `get-documentation` for each component you plan to use to get exact prop names and types.

---

## Component Library Overview

Moji has 11 UI components across two levels:

| Level | Components |
|-------|-----------|
| Atoms | Button, Checkbox, Toggle, Radio, Icon, Tooltip |
| Molecules | Input, Chip, DropdownSelector, DropdownMenuList, DropdownMenuGroup, Toast, Infobox |

Icons: `iconsax-react` v0.0.8 — 993 named exports (e.g. `Add`, `Trash`, `InfoCircle`).

---

## Install Moji in your project

```bash
# Components are in the jimo-storybook repo — copy src/ or use as a local package
# Tokens must be imported globally:
import 'path/to/jimo-storybook/src/styles/tokens.css';
import 'path/to/jimo-storybook/src/styles/global.css';

# Import components:
import { Button } from 'path/to/jimo-storybook/src/components/ui/Button/Button';
import 'path/to/jimo-storybook/src/components/ui/Button/Button.css';

# Icons:
import { Add, Trash, InfoCircle } from 'iconsax-react';
```

---

## The ONE Rule — Tokens Only

**NEVER hardcode hex, px, or rgba values. Always use CSS custom properties.**

```tsx
// ✅ correct
style={{ color: 'var(--color-text-primary)' }}
style={{ gap: 'var(--space-3)' }}         // 12px
style={{ font: 'var(--text-body-3)' }}    // Inter 500 14px
style={{ borderRadius: 'var(--radius-md)' }}
style={{ boxShadow: 'var(--shadow-sm)' }}

// ❌ never do this
style={{ color: '#071331' }}
style={{ gap: 12 }}
style={{ fontSize: 14 }}
```

React inline styles: numbers are treated as px. Always pass spacing as `'var(--space-N)'` strings.

---

## Design Token Quick Reference

### Typography (composite — use as CSS `font` shorthand)
```css
var(--text-heading-1)   /* Montserrat 700, 48px */
var(--text-heading-2)   /* Montserrat 700, 40px */
var(--text-heading-3)   /* Montserrat 700, 32px */
var(--text-heading-4)   /* Montserrat 700, 24px */
var(--text-heading-5)   /* Montserrat 700, 20px */
var(--text-subtitle-1)  /* Montserrat 600, 24px */
var(--text-subtitle-2)  /* Montserrat 600, 20px */
var(--text-subtitle-3)  /* Montserrat 600, 16px */
var(--text-subtitle-4)  /* Montserrat 600, 14px */
var(--text-body-1)      /* Inter 500, 20px */
var(--text-body-2)      /* Inter 500, 16px */
var(--text-body-3)      /* Inter 500, 14px */
var(--text-body-4)      /* Inter 500, 12px */
var(--text-heading-tracking) /* letter-spacing: -0.5px — always add to heading elements */
```

### Colors — Semantic (prefer over primitives)
```css
var(--color-text-primary)     /* #071331 */
var(--color-text-secondary)
var(--color-text-tertiary)
var(--color-text-disabled)
var(--color-text-inverse)     /* white */
var(--color-bg-default)       /* white */
var(--color-bg-subtle)        /* neutral-50 */
var(--color-bg-muted)         /* neutral-100 */
var(--color-bg-emphasis)      /* neutral-200 */
var(--color-border-default)   /* neutral-300 */
var(--color-border-strong)    /* neutral-400 */
var(--color-border-focus)     /* blue-400 */
var(--color-brand-default)    /* #1260eb */
var(--color-brand-hover)
var(--color-brand-subtle)
var(--color-success-default)
var(--color-success-subtle)
var(--color-warning-default)
var(--color-warning-subtle)
var(--color-danger-default)
var(--color-danger-subtle)
```

### Spacing (4px grid)
```css
var(--space-1) /*  4px */   var(--space-2)  /*  8px */
var(--space-3) /* 12px */   var(--space-4)  /* 16px */
var(--space-5) /* 20px */   var(--space-6)  /* 24px */
var(--space-7) /* 28px */   var(--space-8)  /* 32px */
var(--space-9) /* 36px */   var(--space-10) /* 40px */
var(--space-11)/* 44px */   var(--space-12) /* 48px */
```

### Border Radius
```css
var(--radius-sm)    /*  4px — small elements, Checkbox */
var(--radius-md)    /*  8px — Input, DropdownSelector */
var(--radius-lg)    /* 12px — Button */
var(--radius-xl)    /* 16px — large cards */
var(--radius-xxl)   /* 20px — extra-large surfaces */
var(--radius-full)  /* 9999px — Chip, Toggle, Tooltip */
```

### Shadows & Transitions
```css
var(--shadow-sm)        /* buttons, inputs */
var(--shadow-md)        /* dropdown panels */
var(--shadow-lg)        /* modals */
var(--shadow-xl)        /* popovers */

var(--transition-fast)  /* 120ms ease */
var(--transition-base)  /* 200ms ease */
var(--transition-slow)  /* 300ms ease */
```

---

## Component Usage Rules

### Icons: always `color="currentColor"`
When an icon sits inside a CSS class that sets `color` via a token, always pass `color="currentColor"`:
```tsx
// ✅
<InfoCircle size={24} variant="Bold" color="currentColor" />
// ❌
<InfoCircle size={24} variant="Bold" color="#1260EB" />
```

### Button `level` prop (not `variant`)
The Button component uses `level` (not `variant`) for its primary/secondary/tertiary distinction.
Use `get-documentation` to get the exact prop name/values.

### Molecules use Atom components internally
- Toast CTA buttons → use `<Button level="secondary" size="small" />`
- Chip remove button → use `<CloseCircle size={16} variant="Bold" color="currentColor" />` from iconsax-react

### Tooltip: arrowPosition names where the arrow IS (not where the tooltip floats)
| arrowPosition | Tooltip floats |
|--------------|----------------|
| `up` / `up-left` / `up-right` | Below the trigger |
| `bottom` / `bottom-left` / `bottom-right` | Above the trigger |
| `left` | Right of the trigger |
| `right` | Left of the trigger |

---

## Figma Source
All component designs: `https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji`
