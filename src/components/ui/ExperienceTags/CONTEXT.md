# ExperienceTags

**Atomic level:** Organism (sub-component of ExperienceCard)
**CSS prefix:** `.experience-tags`
**Source:** `ExperienceTags.js` / `ExperienceTags.css`

## What it does
Inline tag list with automatic overflow handling. Shows up to `maxVisible` tags and displays a "+N" indicator for the rest. Tag colors auto-cycle through a palette. Used inside `ExperienceCard`.

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `tags` | array of strings | `[]` | Tag labels |
| `maxVisible` | number | `3` | Max tags before "+N" indicator |

## Dependencies
None.

## Import
```js
import { ExperienceTags } from '../../../src/components/ui/ExperienceTags/ExperienceTags';
import '../../../src/components/ui/ExperienceTags/ExperienceTags.css';
```

## Quick example
```jsx
<ExperienceTags tags={['Onboarding', 'Desktop', 'Power users', 'A/B test']} maxVisible={3} />
// Shows: Onboarding  Desktop  Power users  +1
```
