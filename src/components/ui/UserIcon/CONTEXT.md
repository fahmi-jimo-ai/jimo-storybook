# UserIcon

**Atomic level:** Organism (sub-component of UserAvatar)
**CSS prefix:** `.user-icon`
**Source:** `UserIcon.js` / `UserIcon.css`

## What it does
Renders one of 8 user avatar SVG illustrations based on `variant`. Used internally by `UserAvatar`. Rarely used standalone.

## Props

| Prop | Type | Options | Notes |
|------|------|---------|-------|
| `variant` | number | `1`–`8` | Which avatar SVG to render |
| `size` | number | — | Pixel dimensions |

## Dependencies
None — inline SVG assets.

## Import
```js
import { UserIcon } from '../../../src/components/ui/UserIcon/UserIcon';
import '../../../src/components/ui/UserIcon/UserIcon.css';
```

## Note
Prefer `UserAvatar` over `UserIcon` directly — `UserAvatar` wraps `UserIcon` with the background color and `getAvatarProps()` utility.
