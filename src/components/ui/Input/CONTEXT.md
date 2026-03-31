# Input

**Atomic level:** Molecule
**CSS prefix:** `.input`
**Source:** `Input.js` / `Input.css`

## What it does
Multi-variant text field. Supports plain text, textarea, dropdown trigger, and dropdown-search trigger variants. Shows status icons (positive/negative/warning/loading), labels, supportive text, and left/right icon slots.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `inputType` | string | `'text'` `'textarea'` `'dropdown'` `'dropdown-search'` | `'text'` | Determines layout and behavior |
| `size` | string | `'regular'` `'small'` | `'regular'` | |
| `status` | string | `'none'` `'positive'` `'negative'` `'warning'` `'loading'` | `'none'` | Shows status icon in right slot |
| `label` | string | — | — | Field label above input |
| `supportiveText` | string | — | — | Helper/error text below input |
| `placeholder` | string | — | — | |
| `leftIcon` | ReactElement | — | — | Icon in left slot |
| `rightIcon` | ReactElement | — | — | Icon in right slot (hidden when status is set) |
| `cta` | string | — | — | Short CTA label in right slot |
| `disabled` | boolean | — | `false` | |
| `type` | string | HTML input types | `'text'` | HTML `type` attribute (use `'number'` for numeric inputs) |

## argType remapping (stories)
- `inputType` → control label `"type"`
- `status` → control label `"state"`
- `type` (HTML) → control label `"htmlType"`

## States
default → hover → focus → positive / negative / warning / loading / disabled

## Dependencies
- `SpinnerIcon` from `Icon.js` (loading state)

## Import
```js
import { Input } from '../../../src/components/ui/Input/Input';
import '../../../src/components/ui/Input/Input.css';
```

## Quick example
```jsx
<Input label="Email" placeholder="you@example.com" type="email" />
<Input inputType="textarea" label="Notes" placeholder="Add notes…" />
<Input status="negative" label="Password" supportiveText="Must be at least 8 characters" />
<Input inputType="dropdown" placeholder="Select option…" rightIcon={<ChevronDown size={16} />} />
```
