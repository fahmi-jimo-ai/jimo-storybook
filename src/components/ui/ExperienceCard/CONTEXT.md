# ExperienceCard

**Atomic level:** Organism
**CSS prefix:** `.experience-card`
**Source:** `ExperienceCard.js` / `ExperienceCard.css`

## What it does
Card displaying a campaign/experience summary. Supports three layout modes: grid (thumbnail + metadata), line (horizontal compact row), and compact (minimal single-line). Shows status badge, tags, targeting info, environment, and creation date.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `title` | string | — | — | Experience name |
| `createdAt` | string | — | — | Formatted date string |
| `status` | string | `'live'` `'draft'` `'paused'` `'expired'` | — | Drives `ExperienceStatus` |
| `tags` | array | `[string]` | `[]` | Tag labels |
| `targeting` | string | — | — | Targeting description |
| `environment` | string | — | — | Environment label |
| `layout` | string | `'grid'` `'line'` `'compact'` | `'grid'` | |
| `thumbnailContent` | node | — | — | Custom thumbnail content (grid mode) |
| `hover` | boolean | — | `false` | Show hover state |

## Dependencies
- `ExperienceStatus` (status badge)
- `ExperienceTags` (tag list)

## Import
```js
import { ExperienceCard } from '../../../src/components/ui/ExperienceCard/ExperienceCard';
import '../../../src/components/ui/ExperienceCard/ExperienceCard.css';
```

## Quick example
```jsx
<ExperienceCard
  title="Onboarding Tour"
  status="live"
  createdAt="Mar 15, 2026"
  tags={['Onboarding', 'Desktop']}
  targeting="All users"
  environment="Production"
  layout="grid"
/>
```
