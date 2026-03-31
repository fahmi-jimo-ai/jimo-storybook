# Chip

**Atomic level:** Molecule
**CSS prefix:** `.chip`
**Source:** `Chip.js` / `Chip.css`

## What it does
Compact tag/badge element. Used for status labels, filter tags, quick-select presets, and date ranges. When `onRemove` is provided, a remove (×) button appears.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `type` | string | `'neutral'` `'brand'` `'success'` `'warning'` `'danger'` | `'neutral'` | Semantic color |
| `variant` | string | `'primary'` `'secondary'` | `'primary'` | Filled vs outlined |
| `size` | string | `'regular'` `'small'` `'x-small'` `'xx-small'` | `'regular'` | |
| `leftIcon` | ReactElement | — | — | Icon before label |
| `rightIcon` | ReactElement | — | — | Icon after label |
| `onRemove` | function | — | — | If set, shows × button; called on click |
| `iconOnly` | boolean | — | `false` | Square icon-only chip |
| `children` | node | — | — | Chip label text |

## Dependencies
- `CloseCircle` from `iconsax-react` (remove button)

## Import
```js
import { Chip } from '../../../src/components/ui/Chip/Chip';
import '../../../src/components/ui/Chip/Chip.css';
```

## Quick example
```jsx
<Chip type="success">Live</Chip>
<Chip type="warning" variant="secondary" size="small">Draft</Chip>
<Chip type="brand" onRemove={() => removeFilter('status')}>Status: Active</Chip>
<Chip type="neutral" size="x-small" leftIcon={<Calendar size={12} />}>Last 7 days</Chip>
```
