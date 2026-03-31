---
name: jimo-use-component
description: >
  Guides correct usage of Moji design system components when building features in the Jimo app.
  Use this skill whenever a teammate wants to implement a UI feature using components from this
  storybook — to ensure they pick the right component, import it correctly, use tokens, and
  follow all Moji best practices. Trigger on phrases like "use component", "how to use X",
  "implement X in the app", "add X to the page", "which component should I use", or when
  building any UI feature that should consume Moji components.
---

# Using Moji Components in the Jimo App

This skill ensures you pick the right component, import it correctly, and follow all conventions.

---

## Step 1 — Find the right component

Read the component index first:

```
src/components/ui/CONTEXT.md
```

This file is a categorized table of all 37 Moji components with one-line descriptions and a "Choosing the right component" quick-lookup table at the bottom.

Once you identify a candidate, read its individual `CONTEXT.md`:

```
src/components/ui/{ComponentName}/CONTEXT.md
```

This gives you the full prop table, states/variants, dependencies, and a usage example.

---

## Step 2 — Read the actual source before using it

Never assume props from the CONTEXT.md alone — read the component file to confirm:

```
src/components/ui/{ComponentName}/{ComponentName}.js
```

This is the single source of truth for prop names, defaults, and behavior.

---

## Step 3 — Set up tokens (one-time, per project)

Moji components rely on CSS custom properties from `tokens.css`. Copy or import it once:

```
src/styles/tokens.css   ← all color, spacing, typography, radius, shadow, transition tokens
src/styles/global.css   ← base resets and font declarations
```

Also load Google Fonts (Inter + Montserrat) — see `.storybook/preview-head.html` for the exact `<link>` tags.

**Never hardcode any value that has a token.** Always reference `var(--token-name)`:

```css
/* ✅ correct */
color: var(--color-text-primary);
padding: var(--space-3) var(--space-4);
border-radius: var(--radius-md);
font: var(--text-body-3);

/* ❌ wrong */
color: #071331;
padding: 12px 16px;
border-radius: 8px;
font-size: 14px;
```

React inline styles: numbers are treated as pixels — always pass spacing as strings:

```jsx
style={{ gap: 'var(--space-3)' }}    // ✅
style={{ gap: 12 }}                  // ❌
```

---

## Step 4 — Copy and import the component

Components are self-contained folders. Copy the entire folder:

```
src/components/ui/{ComponentName}/
  {ComponentName}.js      ← source
  {ComponentName}.css     ← styles
  index.js                ← barrel export
```

In your consuming file:

```js
import { ComponentName } from './path/to/ComponentName/ComponentName';
import './path/to/ComponentName/ComponentName.css';
```

**Always import the CSS alongside the component.** The CSS is not bundled into the JS.

If the component has dependencies on other Moji components (listed in its `CONTEXT.md`), copy those too and import their CSS files as well.

---

## Step 5 — Use icons correctly

Icons come from `iconsax-react` (v0.0.8, 993 exports). Install it:

```sh
npm install iconsax-react@0.0.8
```

Always pass `color="currentColor"` so CSS token drives the color:

```jsx
import { Add, Trash, Setting2 } from 'iconsax-react';

<Add size={20} variant="Linear" color="currentColor" />   // ✅
<Add size={20} variant="Linear" color="#1260EB" />         // ❌
```

For Jimo product brand icons (Tours, Surveys, Banners, etc.) — always use the fixed icon from this table (never substitutes):

| Product | Icon | Source |
|---------|------|--------|
| Tours | `Routing2` | `iconsax-react` |
| Surveys | `Notepad2` | `iconsax-react` |
| Banners | `BannerIcon` | `src/components/ui/Icon/Icon` |
| Hints | `Notification1` | `iconsax-react` |
| Checklists | `TaskSquare` | `iconsax-react` |
| Resource Centers | `DirectboxNotif` | `iconsax-react` |
| Agent | `AgentIcon` | `src/components/ui/Icon/Icon` |
| Spaces | `Element3` | `iconsax-react` |
| Success Tracker | `Chart2` | `iconsax-react` |
| Actions | `Flash1` | `iconsax-react` |
| Users & Segments | `Profile2User` | `iconsax-react` |
| Settings | `Setting2` | `iconsax-react` |

---

## Step 6 — Follow component-specific rules

### Toast
Must be mounted/unmounted from state — never pre-rendered. Wrap with `ToastContainer`:

```jsx
import { Toast, ToastContainer } from './Toast/Toast';
import './Toast/Toast.css';

const [visible, setVisible] = React.useState(false);

<ToastContainer>
  {visible && <Toast type="positive" title="Saved!" onDismiss={() => setVisible(false)} />}
</ToastContainer>
```

### Tooltip
Always keep in DOM, never conditionally render. Toggle `opacity` + `scale`:

```jsx
import { Tooltip } from './Tooltip/Tooltip';
import './Tooltip/Tooltip.css';

<span style={{ position: 'relative' }}>
  <TriggerElement onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
  <span style={{
    position: 'absolute',
    opacity: hovered ? 1 : 0,
    transform: `scale(${hovered ? 1 : 0.9})`,
    transition: 'opacity var(--transition-base), transform var(--transition-base)',
    pointerEvents: 'none',
  }}>
    <Tooltip arrowPosition="bottom">Tooltip text</Tooltip>
  </span>
</span>
```

### PageHeader — never stack main + sub
```jsx
// ✅ correct — conditional swap
{selectedItem
  ? <PageHeader type="sub" title={selectedItem.name} onBackClick={() => setSelectedItem(null)} />
  : <PageHeader type="main" title="Tours" showButtonGroup buttons={[...]} />
}
```

### ModalOverlay — use the hook for animated close
```jsx
import { ModalOverlay, useModalClose } from './ModalOverlay/ModalOverlay';

function MyModal({ onClose }) {
  const closeModal = useModalClose();
  return (
    <ModalOverlay onClose={onClose}>
      <Button onClick={closeModal}>Cancel</Button>
    </ModalOverlay>
  );
}
```

### Nav items — always Linear/Bold icon pairs
```jsx
icon={<Routing2 size={20} variant="Linear" color="currentColor" />}
iconActive={<Routing2 size={20} variant="Bold" color="currentColor" />}
```

### PrimaryNavSidebar — overflow scroll rule
Apply `overflow-y: auto` only to the expanded state — never to collapsed:
```css
.nav-sidebar-primary__body { overflow: visible; }
.nav-sidebar-primary--expanded .nav-sidebar-primary__body { overflow-y: auto; }
```

---

## Step 7 — Verify

After implementing, check:

- [ ] No hardcoded hex/px/rgba values — all from `var(--token-name)`
- [ ] All CSS files imported alongside their component JS
- [ ] All component dependencies (listed in CONTEXT.md) are also imported
- [ ] Icons use `color="currentColor"` — no hardcoded hex in `color` prop
- [ ] Jimo product items use the mandatory brand icon from the table above
- [ ] Toast uses the mount/unmount pattern
- [ ] Tooltip is always in DOM (opacity/scale toggle, not conditional render)
- [ ] PageHeader main/sub are never rendered simultaneously

---

## Quick reference: component → what it does

| I need… | Component |
|---------|-----------|
| Action button | `Button` |
| Checkbox / Radio / Toggle | `Checkbox` / `Radio` / `Toggle` |
| Text field / textarea | `Input` |
| Dropdown (single/multi select) | `DropdownFilter` |
| Nested dropdown | `DropdownFilterNested` |
| Date or date-range picker | `DatePicker` |
| Compact tag/badge | `Chip` |
| Transient notification | `Toast` + `ToastContainer` |
| Inline alert | `Infobox` |
| Hover hint | `Tooltip` |
| Modal backdrop | `ModalOverlay` |
| Search + filter bar | `ViewToolbar` |
| Page header | `PageHeader` |
| Main left sidebar | `PrimaryNavSidebar` |
| Secondary sidebar | `SecondaryNavSidebar` |
| Horizontal tabs (underline) | `PrimaryHorizontalMenuGroup` |
| Horizontal tabs (pill) | `SecondaryHorizontalMenuGroup` |
| User portrait | `UserAvatar` |
| Icon | `iconsax-react` or custom: `BannerIcon`, `AgentIcon` |
