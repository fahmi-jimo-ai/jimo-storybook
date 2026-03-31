# UserAvatar

**Atomic level:** Organism
**CSS prefix:** `.user-avatar`
**Source:** `UserAvatar.js` / `UserAvatar.css`

## What it does
Colored circular avatar with a user icon inside. 9 icon variants × 6 color variants. Exports a `getAvatarProps(userId)` utility that deterministically assigns icon + color based on user ID hash — useful for consistent avatars across the app.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `iconVariant` | number | `1`–`9` | `1` | Which user icon SVG |
| `colorVariant` | string | `'blue'` `'green'` `'orange'` `'yellow'` `'purple'` `'red'` | `'blue'` | Background color |
| `size` | number | — | `40` | Diameter in px |

## Exported utility

```js
import { getAvatarProps } from '../../../src/components/ui/UserAvatar/UserAvatar';
const { iconVariant, colorVariant } = getAvatarProps(user.id);
<UserAvatar iconVariant={iconVariant} colorVariant={colorVariant} />
```

## Dependencies
- `UserIcon` (SVG avatar shapes)

## Import
```js
import { UserAvatar, getAvatarProps } from '../../../src/components/ui/UserAvatar/UserAvatar';
import '../../../src/components/ui/UserAvatar/UserAvatar.css';
```
