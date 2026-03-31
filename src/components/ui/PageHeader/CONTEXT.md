# PageHeader

**Atomic level:** Organism
**CSS prefix:** `.page-header`
**Source:** `PageHeader.js` / `PageHeader.css`

## What it does
Top section of a page. Two layouts: `main` (list/index page) and `sub` (detail/sub-page). Main shows a title + optional button group + optional tab bar. Sub shows a back button + title + optional actions.

**Critical rule:** `main` and `sub` PageHeaders must NEVER be rendered simultaneously. The sub header must replace (not stack below) the main header when navigating to a detail page.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `type` | string | `'main'` `'sub'` | `'main'` | Layout variant |
| `title` | string | — | — | Page title |
| `showButtonGroup` | boolean | — | `false` | Show action buttons |
| `buttonSize` | string | `'big'` `'small'` | `'big'` | |
| `buttons` | array | `[{label, level, icon?, onClick}]` | `[]` | Button configs |
| `showTabs` | boolean | — | `false` | Show horizontal tab bar |
| `tabs` | array | `[{label, icon?, counter?, chip?}]` | `[]` | Tab configs |
| `activeTab` | string | — | — | Active tab label |
| `onTabClick` | function | — | — | `(tabLabel) => void` |
| `onBackClick` | function | — | — | Back button handler (sub only) |
| `backIcon` | ReactElement | — | — | Custom back icon |

## Dependencies
- `Button` (action buttons)
- `PrimaryHorizontalMenuGroup` (tab bar)

## Import
```js
import { PageHeader } from '../../../src/components/ui/PageHeader/PageHeader';
import '../../../src/components/ui/PageHeader/PageHeader.css';
```

## Quick example
```jsx
// Main page
<PageHeader
  type="main"
  title="Tours"
  showButtonGroup
  buttons={[{ label: 'Create tour', level: 'primary', onClick: openModal }]}
  showTabs
  tabs={[{ label: 'All' }, { label: 'Live' }, { label: 'Draft' }]}
  activeTab={activeTab}
  onTabClick={setActiveTab}
/>

// Sub-page (replaces main — conditional swap)
{selectedTour
  ? <PageHeader type="sub" title={selectedTour.name} onBackClick={() => setSelectedTour(null)} />
  : <PageHeader type="main" title="Tours" ... />
}
```
