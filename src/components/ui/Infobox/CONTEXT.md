# Infobox

**Atomic level:** Molecule
**CSS prefix:** `.infobox`
**Source:** `Infobox.js` / `Infobox.css`

## What it does
Inline alert/information box. Shows a colored icon, title, optional body text, and an optional CTA link. The icon auto-selects from iconsax-react based on `type`, but can be overridden.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `type` | string | `'positive'` `'warning'` `'danger'` `'brand'` `'neutral'` | `'neutral'` | Color + default icon |
| `title` | string | — | — | Bold heading |
| `body` | string | — | — | Body text below title |
| `showIcon` | boolean | — | `true` | Show/hide icon |
| `icon` | ReactElement | — | — | Custom icon (overrides type default) |
| `ctaLabel` | string | — | — | CTA link text |
| `onCta` | function | — | — | CTA click handler |

## Type → default icon mapping
- `positive` → `TickCircle`
- `warning` → `Warning2`
- `danger` → `CloseCircle`
- `brand` → `InfoCircle`
- `neutral` → `InfoCircle`

## Dependencies
None — uses iconsax-react icons inline.

## Import
```js
import { Infobox } from '../../../src/components/ui/Infobox/Infobox';
import '../../../src/components/ui/Infobox/Infobox.css';
```

## Quick example
```jsx
<Infobox type="warning" title="Plan limit reached" body="Upgrade to publish more experiences." ctaLabel="Upgrade" onCta={handleUpgrade} />
<Infobox type="positive" title="Changes saved" />
<Infobox type="danger" title="Action failed" body="Please try again." />
```
