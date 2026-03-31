# Radio

**Atomic level:** Atom
**CSS prefix:** `.radio`
**Source:** `Radio.js` / `Radio.css`

## What it does
Radio button for mutually exclusive selections. Renders a styled native radio input with an optional label.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `label` | string | — | — | Label text beside the button |
| `checked` | boolean | — | `false` | Controlled |
| `disabled` | boolean | — | `false` | |
| `onChange` | function | — | — | `(e) => void` |

## States
unchecked → checked (each can be disabled)

## Dependencies
None.

## Import
```js
import { Radio } from '../../../src/components/ui/Radio/Radio';
import '../../../src/components/ui/Radio/Radio.css';
```

## Quick example
```jsx
<Radio label="Option A" checked={value === 'a'} onChange={() => setValue('a')} />
<Radio label="Option B" checked={value === 'b'} onChange={() => setValue('b')} />
```
