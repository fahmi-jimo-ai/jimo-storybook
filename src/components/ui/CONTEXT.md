# Moji UI Components — Context Index

> Quick routing guide for agents. Each entry links to the component's own `CONTEXT.md` for full prop/usage details.
> **Source of truth:** `src/components/ui/{Name}/{Name}.js` and `{Name}.css`.

---

## Atoms
_Single-purpose building blocks with no Moji UI dependencies._

| Component | What it does | CONTEXT |
|-----------|-------------|---------|
| [Button](Button/CONTEXT.md) | Primary action trigger — primary/secondary levels, big/small sizes, icon support | [→](Button/CONTEXT.md) |
| [Checkbox](Checkbox/CONTEXT.md) | Selectable checkbox with indeterminate state | [→](Checkbox/CONTEXT.md) |
| [Radio](Radio/CONTEXT.md) | Mutually exclusive option selector | [→](Radio/CONTEXT.md) |
| [Toggle](Toggle/CONTEXT.md) | Boolean switch (on/off) | [→](Toggle/CONTEXT.md) |
| [Icon](Icon/CONTEXT.md) | Wrapper for iconsax-react icons; also exports CloseIcon, SpinnerIcon, BannerIcon, AgentIcon | [→](Icon/CONTEXT.md) |
| [Tooltip](Tooltip/CONTEXT.md) | Hover tooltip bubble with configurable arrow position | [→](Tooltip/CONTEXT.md) |

---

## Molecules
_Focused units that combine a small set of atoms or raw HTML into one thing._

### General

| Component | What it does | CONTEXT |
|-----------|-------------|---------|
| [Input](Input/CONTEXT.md) | Text field — text / textarea / dropdown / dropdown-search variants, status states | [→](Input/CONTEXT.md) |
| [Chip](Chip/CONTEXT.md) | Compact tag/badge — 5 semantic types, 2 variants, 4 sizes, optional remove | [→](Chip/CONTEXT.md) |
| [DropdownSelector](DropdownSelector/CONTEXT.md) | Trigger button (chevron) that opens a dropdown panel | [→](DropdownSelector/CONTEXT.md) |
| [DropdownMenuList](DropdownMenuList/CONTEXT.md) | Individual item inside a dropdown menu; supports multi-select, icons, descriptions | [→](DropdownMenuList/CONTEXT.md) |
| [Toast](Toast/CONTEXT.md) | Temporary slide-in notification — positive / warning / negative / neutral | [→](Toast/CONTEXT.md) |
| [Infobox](Infobox/CONTEXT.md) | Inline alert/info box — positive / warning / danger / brand / neutral | [→](Infobox/CONTEXT.md) |

### Nav items (`Molecules/Nav/`)

| Component | What it does | CONTEXT |
|-----------|-------------|---------|
| [PrimaryNavItem](PrimaryNavItem/CONTEXT.md) | Single item in the primary left sidebar; collapsed shows tooltip | [→](PrimaryNavItem/CONTEXT.md) |
| [SecondaryNavItem](SecondaryNavItem/CONTEXT.md) | Single item in the secondary sidebar; supports disabled state | [→](SecondaryNavItem/CONTEXT.md) |
| [TertiaryNavItem](TertiaryNavItem/CONTEXT.md) | Icon-only footer nav item; always shows a tooltip | [→](TertiaryNavItem/CONTEXT.md) |

### Horizontal menu items (`Molecules/HorizontalMenu/`)

| Component | What it does | CONTEXT |
|-----------|-------------|---------|
| [PrimaryHorizontalMenuItem](PrimaryHorizontalMenuItem/CONTEXT.md) | Individual tab in the primary horizontal tab bar | [→](PrimaryHorizontalMenuItem/CONTEXT.md) |
| [SecondaryHorizontalMenuItem](SecondaryHorizontalMenuItem/CONTEXT.md) | Individual tab in the secondary pill-style tab bar | [→](SecondaryHorizontalMenuItem/CONTEXT.md) |

---

## Organisms
_Groups / containers / complete UI sections._

### General

| Component | What it does | CONTEXT |
|-----------|-------------|---------|
| [DatePicker](DatePicker/CONTEXT.md) | Calendar date/range picker with quick presets; uses Input + Chip internally | [→](DatePicker/CONTEXT.md) |
| [DropdownFilter](DropdownFilter/CONTEXT.md) | Single/multi-select dropdown filter panel | [→](DropdownFilter/CONTEXT.md) |
| [DropdownFilterNested](DropdownFilterNested/CONTEXT.md) | Hierarchical nested dropdown with slide-panel navigation | [→](DropdownFilterNested/CONTEXT.md) |
| [DropdownMenuGroup](DropdownMenuGroup/CONTEXT.md) | Scrollable wrapper container for DropdownMenuList items | [→](DropdownMenuGroup/CONTEXT.md) |
| [PageHeader](PageHeader/CONTEXT.md) | Page top section — main (list page) or sub (detail page) layout | [→](PageHeader/CONTEXT.md) |
| [ModalOverlay](ModalOverlay/CONTEXT.md) | Full-screen animated backdrop for modals; exports useModalClose() hook | [→](ModalOverlay/CONTEXT.md) |
| [ViewToolbar](ViewToolbar/CONTEXT.md) | Combined search + multi-filter bar for table/list views | [→](ViewToolbar/CONTEXT.md) |
| [ExperienceCard](ExperienceCard/CONTEXT.md) | Campaign/experience summary card — grid / line / compact layouts | [→](ExperienceCard/CONTEXT.md) |
| [ExperienceStatus](ExperienceStatus/CONTEXT.md) | Status badge for experiences: live / draft / paused / expired | [→](ExperienceStatus/CONTEXT.md) |
| [ExperienceTags](ExperienceTags/CONTEXT.md) | Inline tag list with +N overflow indicator | [→](ExperienceTags/CONTEXT.md) |
| [UserAvatar](UserAvatar/CONTEXT.md) | Colored avatar circle with user icon; 9 icon variants, 6 colors | [→](UserAvatar/CONTEXT.md) |
| [UserIcon](UserIcon/CONTEXT.md) | User avatar SVG selector (variants 1–8) | [→](UserIcon/CONTEXT.md) |
| [ToastContainer](Toast/CONTEXT.md) | Fixed bottom-center container for Toast stacks | [→](Toast/CONTEXT.md) |

### Nav groups / sidebars (`Organisms/Nav/`)

| Component | What it does | CONTEXT |
|-----------|-------------|---------|
| [PrimaryNavSidebar](PrimaryNavSidebar/CONTEXT.md) | Main collapsible left sidebar with fixed Jimo product navigation | [→](PrimaryNavSidebar/CONTEXT.md) |
| [PrimaryNavGroup](PrimaryNavGroup/CONTEXT.md) | Grouping container for primary nav items | [→](PrimaryNavGroup/CONTEXT.md) |
| [SecondaryNavSidebar](SecondaryNavSidebar/CONTEXT.md) | Secondary sidebar for sub-navigation sections | [→](SecondaryNavSidebar/CONTEXT.md) |
| [SecondaryNavGroup](SecondaryNavGroup/CONTEXT.md) | Titled section wrapper for secondary nav items | [→](SecondaryNavGroup/CONTEXT.md) |
| [TertiaryNavGroup](TertiaryNavGroup/CONTEXT.md) | Footer nav group with version label | [→](TertiaryNavGroup/CONTEXT.md) |

### Horizontal menu groups (`Organisms/HorizontalMenu/`)

| Component | What it does | CONTEXT |
|-----------|-------------|---------|
| [PrimaryHorizontalMenuGroup](PrimaryHorizontalMenuGroup/CONTEXT.md) | Tab bar with animated underline indicator | [→](PrimaryHorizontalMenuGroup/CONTEXT.md) |
| [SecondaryHorizontalMenuGroup](SecondaryHorizontalMenuGroup/CONTEXT.md) | Tab bar with animated pill indicator | [→](SecondaryHorizontalMenuGroup/CONTEXT.md) |

---

## Choosing the right component

| I need… | Use |
|---------|-----|
| A clickable action | `Button` |
| A yes/no form field | `Checkbox`, `Radio`, or `Toggle` |
| A text entry field | `Input` (inputType="text") |
| A long text entry | `Input` (inputType="textarea") |
| A single-select dropdown | `DropdownFilter` (multiSelect=false) |
| A multi-select dropdown | `DropdownFilter` (multiSelect=true) |
| A nested/hierarchical dropdown | `DropdownFilterNested` |
| A date or date-range picker | `DatePicker` |
| A compact label/tag | `Chip` |
| A transient notification | `Toast` + `ToastContainer` |
| An inline alert | `Infobox` |
| A hover hint | `Tooltip` |
| A modal backdrop | `ModalOverlay` |
| A search + filter bar | `ViewToolbar` |
| A page top section | `PageHeader` |
| A main left sidebar | `PrimaryNavSidebar` |
| A secondary sidebar | `SecondaryNavSidebar` |
| Horizontal tabs (main style) | `PrimaryHorizontalMenuGroup` |
| Horizontal tabs (pill style) | `SecondaryHorizontalMenuGroup` |
| A user portrait | `UserAvatar` |
| An icon | `Icon` or import directly from `iconsax-react` |
