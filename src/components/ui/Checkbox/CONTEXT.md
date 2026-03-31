# Checkbox

**Atomic level:** Atom
**CSS prefix:** `.checkbox`
**Source:** `Checkbox.js` / `Checkbox.css`

## What it does
Standard checkbox input with label. Supports an indeterminate (dash) state for "select all" patterns where some items are checked.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `label` | string | — | — | Label text displayed beside box |
| `checked` | boolean | — | `false` | Controlled checked state |
| `indeterminate` | boolean | — | `false` | Dash state — some-but-not-all selected |
| `disabled` | boolean | — | `false` | |
| `onChange` | function | — | — | `(e) => void` |

## States
unchecked → checked → indeterminate (each can be disabled)

## Dependencies
None — uses native `<input type="checkbox">` under a styled wrapper.

## Import
```js
import { Checkbox } from '../../../src/components/ui/Checkbox/Checkbox';
import '../../../src/components/ui/Checkbox/Checkbox.css';
```

## Quick example
```jsx
<Checkbox label="Remember me" checked={isChecked} onChange={e => setChecked(e.target.checked)} />
<Checkbox label="Select all" indeterminate={someSelected && !allSelected} checked={allSelected} onChange={handleSelectAll} />
```
