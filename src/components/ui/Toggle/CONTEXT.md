# Toggle

**Atomic level:** Atom
**CSS prefix:** `.toggle`
**Source:** `Toggle.js` / `Toggle.css`

## What it does
Switch/toggle control for boolean settings. Uses `role="switch"` for accessibility. Renders an optional label beside the pill-shaped track.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `label` | string | — | — | Label beside the toggle |
| `checked` | boolean | — | `false` | Controlled on/off |
| `disabled` | boolean | — | `false` | |
| `onChange` | function | — | — | `(e) => void` |

## States
off → on (each can be disabled)

## Dependencies
None.

## Import
```js
import { Toggle } from '../../../src/components/ui/Toggle/Toggle';
import '../../../src/components/ui/Toggle/Toggle.css';
```

## Quick example
```jsx
<Toggle label="Enable notifications" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
```
