# ExperienceStatus

**Atomic level:** Organism (sub-component of ExperienceCard)
**CSS prefix:** `.experience-status`
**Source:** `ExperienceStatus.js` / `ExperienceStatus.css`

## What it does
Status badge pill for experiences. Displays a colored dot + label based on the `status` value. Used inside `ExperienceCard` but can be used standalone.

## Props

| Prop | Type | Options | Notes |
|------|------|---------|-------|
| `status` | string | `'live'` `'draft'` `'paused'` `'expired'` | Drives color and label |

## Status → display mapping
| status | Color | Label |
|--------|-------|-------|
| live | Green | Live |
| draft | Grey | Draft |
| paused | Orange | Paused |
| expired | Red | Expired |

## Dependencies
None.

## Import
```js
import { ExperienceStatus } from '../../../src/components/ui/ExperienceStatus/ExperienceStatus';
import '../../../src/components/ui/ExperienceStatus/ExperienceStatus.css';
```

## Quick example
```jsx
<ExperienceStatus status="live" />
<ExperienceStatus status="draft" />
```
