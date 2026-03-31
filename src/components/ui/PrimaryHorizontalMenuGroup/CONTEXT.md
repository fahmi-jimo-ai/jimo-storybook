# PrimaryHorizontalMenuGroup

**Atomic level:** Organism — `Organisms/HorizontalMenu/PrimaryHorizontalMenuGroup`
**CSS prefix:** `.h-menu-group-primary`
**Source:** `PrimaryHorizontalMenuGroup.js` / `PrimaryHorizontalMenuGroup.css`

## What it does
Horizontal tab bar with an animated underline indicator that slides to follow the active tab. Supports icon, counter badge, and chip label on each tab. Used in `PageHeader` and as a standalone section tab bar.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `tabs` | array | `[{ label, icon?, counter?, chip? }]` | `[]` | Tab definitions |
| `activeItem` | string | — | — | Label of the active tab |
| `onTabClick` | function | — | — | `(label) => void` |
| `size` | string | `'big'` `'small'` | `'big'` | |
| `showIcon` | boolean | — | `false` | Show icon slot on all tabs |
| `showCounter` | boolean | — | `false` | Show counter badge on all tabs |
| `showChip` | boolean | — | `false` | Show chip on all tabs |

## Dependencies
- `PrimaryHorizontalMenuItem`

## Import
```js
import { PrimaryHorizontalMenuGroup } from '../../../src/components/ui/PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup';
import '../../../src/components/ui/PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup.css';
```

## Quick example
```jsx
<PrimaryHorizontalMenuGroup
  tabs={[
    { label: 'All', counter: 142 },
    { label: 'Live', counter: 12 },
    { label: 'Draft', counter: 8 },
  ]}
  activeItem={activeTab}
  onTabClick={setActiveTab}
  showCounter
/>
```
