# PrimaryNavSidebar

**Atomic level:** Organism — `Organisms/Nav/PrimaryNavSidebar`
**CSS prefix:** `.nav-sidebar-primary`
**Source:** `PrimaryNavSidebar.js` / `PrimaryNavSidebar.css`

## What it does
Main collapsible left sidebar with fixed Jimo product navigation. Navigation items and sections are hardcoded (not configurable via props). Displays a project logo/name at the top. Supports expanded and collapsed states — collapsed hides labels and shows tooltips on hover.

**Fixed navigation structure:**
1. Get Started (Home, Checklist)
2. Engagement (Tours, Surveys, Banners, Hints, Checklists, Resource Centers, Agent)
3. Content (Spaces)
4. Analytics (Success Tracker)
5. Settings (Actions, Users & Segments, Settings)
6. Footer: Help, Notifications, User profile

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `collapsed` | boolean | `false` | Collapsed/expanded state |
| `activeItem` | string | — | Label of the active nav item |
| `onItemClick` | function | — | `(label) => void` |
| `projectName` | string | `'My Project'` | Displayed in project slot |
| `projectImage` | string | — | Image URL for project logo |

## Important: overflow scroll rule
`overflow-y: auto` clips positioned tooltips. The sidebar body must use `overflow: visible` when collapsed; only apply `overflow-y: auto` in the expanded state:
```css
.nav-sidebar-primary__body { overflow: visible; }
.nav-sidebar-primary--expanded .nav-sidebar-primary__body { overflow-y: auto; }
```

## Dependencies
- `PrimaryNavItem`
- `PrimaryNavGroup`
- `TertiaryNavGroup` / `TertiaryNavItem`
- All Jimo product brand icons from iconsax-react + `BannerIcon`, `AgentIcon` from `Icon.js`

## Import
```js
import { PrimaryNavSidebar } from '../../../src/components/ui/PrimaryNavSidebar/PrimaryNavSidebar';
import '../../../src/components/ui/PrimaryNavSidebar/PrimaryNavSidebar.css';
```
