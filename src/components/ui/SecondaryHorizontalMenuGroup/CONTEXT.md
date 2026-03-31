# SecondaryHorizontalMenuGroup

**Atomic level:** Organism — `Organisms/HorizontalMenu/SecondaryHorizontalMenuGroup`
**CSS prefix:** `.h-menu-group-secondary`
**Source:** `SecondaryHorizontalMenuGroup.js` / `SecondaryHorizontalMenuGroup.css`

## What it does
Pill-style horizontal tab bar. An animated background pill slides to follow the active tab (similar to a segmented control). Each tab can show an icon, text, or both. Used for view-mode toggles (e.g. Grid / List / Compact).

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `tabs` | array | `[{ tabName, icon? }]` | `[]` | Tab definitions |
| `activeItem` | string | — | — | `tabName` of the active tab |
| `onTabClick` | function | — | — | `(tabName) => void` |
| `size` | string | `'big'` `'small'` | `'big'` | |
| `withText` | boolean | — | `true` | Show tab label text |

## Dependencies
- `SecondaryHorizontalMenuItem`

## Import
```js
import { SecondaryHorizontalMenuGroup } from '../../../src/components/ui/SecondaryHorizontalMenuGroup/SecondaryHorizontalMenuGroup';
import '../../../src/components/ui/SecondaryHorizontalMenuGroup/SecondaryHorizontalMenuGroup.css';
```

## Quick example
```jsx
import { Grid9, RowVertical, Maximize2 } from 'iconsax-react';

<SecondaryHorizontalMenuGroup
  tabs={[
    { tabName: 'Grid', icon: <Grid9 size={16} variant="Linear" color="currentColor" /> },
    { tabName: 'List', icon: <RowVertical size={16} variant="Linear" color="currentColor" /> },
    { tabName: 'Compact', icon: <Maximize2 size={16} variant="Linear" color="currentColor" /> },
  ]}
  activeItem={viewMode}
  onTabClick={setViewMode}
/>
```
