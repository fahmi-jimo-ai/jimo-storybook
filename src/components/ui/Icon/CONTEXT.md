# Icon

**Atomic level:** Atom
**CSS prefix:** `.icon`
**Source:** `Icon.js` / `Icon.css`

## What it does
Thin wrapper for `iconsax-react` icons. Also exports four custom Moji SVG icons that have no iconsax equivalent:
- `CloseIcon` — X close button (used in Toast, Chip remove)
- `SpinnerIcon` — animated loading spinner (used in Input loading state)
- `BannerIcon` — Jimo Banners product brand icon (Linear/Bold variants)
- `AgentIcon` — Jimo Agent product brand icon (Linear/Bold variants)

## Props (Icon wrapper)

| Prop | Type | Notes |
|------|------|-------|
| `icon` | ReactElement | The iconsax component to render |
| `size` | number | Pixel size |
| `color` | string | Use `"currentColor"` so CSS token drives color |
| `variant` | string | `'Linear'` or `'Bold'` |

## Custom icon exports

```js
import { CloseIcon, SpinnerIcon, BannerIcon, AgentIcon } from '../Icon/Icon';
// BannerIcon and AgentIcon accept: size, variant ('Linear'|'Bold'), color
```

## Iconsax icons — always use `currentColor`
```jsx
import { Add, Trash } from 'iconsax-react';
<Add size={20} variant="Linear" color="currentColor" />
```

## Jimo product brand icons (mandatory table)

| Product | Export | Source |
|---------|--------|--------|
| Tours | `Routing2` | `iconsax-react` |
| Surveys | `Notepad2` | `iconsax-react` |
| Banners | `BannerIcon` | `Icon.js` |
| Hints | `Notification1` | `iconsax-react` |
| Checklists | `TaskSquare` | `iconsax-react` |
| Resource Centers | `DirectboxNotif` | `iconsax-react` |
| Agent | `AgentIcon` | `Icon.js` |
| Spaces | `Element3` | `iconsax-react` |
| Success Tracker | `Chart2` | `iconsax-react` |
| Actions | `Flash1` | `iconsax-react` |
| Users & Segments | `Profile2User` | `iconsax-react` |
| Settings | `Setting2` | `iconsax-react` |

## Import
```js
import { Icon, CloseIcon, SpinnerIcon, BannerIcon, AgentIcon } from '../../../src/components/ui/Icon/Icon';
```
